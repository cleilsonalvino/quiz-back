// src/services/updatePass.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fetch = require('node-fetch');

const prisma = new PrismaClient();

const EXTERNAL_SEND_EMAIL_API_URL = 'https://sendemails-lqua.onrender.com/send-email';

/**
 * @function generateVerificationCode
 * @returns {string} An alphanumeric 6-character verification code.
 */
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

/**
 * @function sendVerificationEmail
 * @param {string} emailTo - The recipient's email address.
 * @param {string} code - The verification code to be sent.
 * @returns {Promise<object>} An object indicating success or failure of the email sending.
 */
const sendVerificationEmail = async (emailTo, code) => {
  const subject = 'Código de Verificação de Redefinição de Senha - Estudelab Quiz';
  const htmlBody = `
    <p>Olá,</p>
    <p>Você solicitou a redefinição de senha para sua conta no Estudelab Quiz.</p>
    <p>Seu código de verificação é:</p>
    <h2 style="color: #0d6efd;">${code}</h2>
    <p>Este código é válido por 5 minutos.</p>
    <p>Se você não solicitou esta redefinição, por favor, ignore este e-mail.</p>
    <p>Atenciosamente,<br>Equipe Estudelab Quiz</p>
  `;

  try {
    const response = await fetch(EXTERNAL_SEND_EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailTo,
        subject: subject,
        html: htmlBody,
      }),
    });

    if (response.ok) {
      console.log(`[Email] Code ${code} requested for sending to ${emailTo} via external API.`);
      return { success: true, message: "Verification email requested successfully." };
    } else {
      const errorData = await response.json();
      console.error(`[Email Error] Failed to request email sending for ${emailTo} (external API):`, errorData);
      return { success: false, message: errorData.error || "Error requesting email sending. Please try again." };
    }
  } catch (error) {
    console.error(`[Email Error] Failed to connect to email API for ${emailTo}:`, error);
    return { success: false, message: "Could not connect to email service. Check the external API." };
  }
};

/**
 * @function sendPasswordChangedConfirmationEmail
 * @param {string} emailTo - The recipient's email address.
 * @param {string} username - The username associated with the account.
 * @returns {Promise<void>}
 */
const sendPasswordChangedConfirmationEmail = async (emailTo, username) => {
  const subject = 'Sua senha do Estudelab Quiz foi alterada!';
  const htmlBody = `
    <p>Olá ${username},</p>
    <p>Confirmamos que a senha da sua conta Estudelab Quiz foi alterada com sucesso.</p>
    <p>Se você realizou essa alteração, pode desconsiderar este e-mail.</p>
    <p>Caso você <b>não tenha solicitado</b> essa alteração, por favor, entre em contato com nosso suporte imediatamente.</p>
    <p>Atenciosamente,<br>Equipe Estudelab Quiz</p>
  `;

  try {
    const response = await fetch(EXTERNAL_SEND_EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailTo,
        subject: subject,
        html: htmlBody,
      }),
    });

    if (response.ok) {
      console.log(`[Email] Password change confirmation sent to ${emailTo}.`);
    } else {
      const errorData = await response.json();
      console.error(`[Email Error] Failed to send password change confirmation email to ${emailTo}:`, errorData);
    }
  } catch (error) {
    console.error(`[Email Error] Failed to connect to email API for password change confirmation to ${emailTo}:`, error);
  }
};


/**
 * @function requestPasswordResetCode
 * @param {string} identifier - The user's email or username.
 * @returns {Promise<object>} Object with success status and message.
 */
const requestPasswordResetCode = async (identifier) => {
  if (!identifier) {
    return { success: false, message: "Email or username is required." };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      console.warn(`[Password Reset] Attempted to request code for non-existent identifier: ${identifier}`);
      return { success: true, message: "If the email/username is registered, a code has been sent." };
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordCode: verificationCode,
        resetPasswordExpires: expiresAt,
      },
    });
    console.log(`[Password Reset] Code ${verificationCode} saved in DB for ${identifier}.`);

    const emailResult = await sendVerificationEmail(user.email, verificationCode);

    if (emailResult.success) {
      return { success: true, message: "Verification code sent! Check your email." };
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordCode: null,
          resetPasswordExpires: null,
        },
      });
      return { success: false, message: emailResult.message || "Error sending verification code." };
    }

  } catch (error) {
    console.error(`[Password Reset Error] Error requesting code for ${identifier}:`, error);
    return { success: false, message: "Internal server error when requesting code." };
  }
};

/**
 * @function resetPassword
 * @param {string} identifier - The user's email or username.
 * @param {string} code - The verification code provided by the user.
 * @param {string} newPassword - The new password to be set.
 * @returns {Promise<object>} Object with success status and message.
 */
const resetPassword = async (identifier, code, newPassword) => {
  if (!identifier || !code || !newPassword) {
    return { success: false, message: "All fields are required." };
  }

  if (newPassword.length < 6) {
    return { success: false, message: "The new password must be at least 6 characters long." };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    if (!user.resetPasswordCode || user.resetPasswordCode !== code || user.resetPasswordExpires < new Date()) {
      return { success: false, message: "Invalid or expired verification code." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordCode: null,
        resetPasswordExpires: null,
      },
    });

    console.log(`[Password Reset] Password for ${identifier} successfully reset.`);

    // <<< NEW: Send password changed confirmation email
    // We don't await this to avoid blocking the main response,
    // as email sending can sometimes take a bit longer.
    sendPasswordChangedConfirmationEmail(user.email, user.username)
      .catch(err => console.error("Failed to send password change confirmation email:", err));
    // END NEW

    return { success: true, message: "Password reset successfully!" };

  } catch (error) {
    console.error(`[Password Reset Error] Error resetting password for ${identifier}:`, error);
    return { success: false, message: "Internal server error when resetting password." };
  }
};

module.exports = {
  requestPasswordResetCode,
  resetPassword,
};