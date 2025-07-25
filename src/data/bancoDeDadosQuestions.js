const bancoDeDadosQuestions = [
  {
    "id": 1,
    "descricao": "O que é um 'Banco de Dados'?",
    "alternativas": [
      "Uma aplicação para editar texto, como o Bloco de Notas.",
      "Uma coleção organizada de dados, armazenada e acessada eletronicamente.",
      "A memória RAM de um computador.",
      "Uma única folha de cálculo do Excel."
    ],
    "correctAnswer": "Uma coleção organizada de dados, armazenada e acessada eletronicamente.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 2,
    "descricao": "Em um banco de dados relacional, como é chamada a estrutura principal que armazena dados em formato de linhas e colunas?",
    "alternativas": [
      "Documento",
      "Ficheiro",
      "Tabela",
      "Gráfico"
    ],
    "correctAnswer": "Tabela",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 3,
    "descricao": "O que representa uma 'linha' (ou registo) em uma tabela?",
    "alternativas": [
      "O nome da tabela.",
      "Um único item de dados com todas as suas características.",
      "Uma característica específica de todos os itens (ex: a idade de todos os utilizadores).",
      "O tipo de dado da tabela."
    ],
    "correctAnswer": "Um único item de dados com todas as suas características.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 4,
    "descricao": "E o que representa uma 'coluna' (ou campo/atributo) em uma tabela?",
    "alternativas": [
      "Um conjunto completo de dados de um item.",
      "Uma característica específica ou um pedaço de informação para cada registo na tabela.",
      "A chave que identifica unicamente a tabela.",
      "O número total de registos."
    ],
    "correctAnswer": "Uma característica específica ou um pedaço de informação para cada registo na tabela.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 5,
    "descricao": "Qual é a principal função de uma 'Chave Primária' (Primary Key)?",
    "alternativas": [
      "Ligar duas tabelas diferentes.",
      "Permitir que a coluna tenha valores nulos.",
      "Identificar unicamente cada registo em uma tabela.",
      "Ordenar os dados da tabela por padrão."
    ],
    "correctAnswer": "Identificar unicamente cada registo em uma tabela.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 6,
    "descricao": "Qual é a principal função de uma 'Chave Estrangeira' (Foreign Key)?",
    "alternativas": [
      "Identificar unicamente cada registo na tabela atual.",
      "Criar um elo entre duas tabelas, garantindo a integridade referencial.",
      "Armazenar o nome de utilizadores estrangeiros.",
      "Ser a coluna principal de uma tabela."
    ],
    "correctAnswer": "Criar um elo entre duas tabelas, garantindo a integridade referencial.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 7,
    "descricao": "Qual comando SQL é usado para selecionar dados de um banco de dados?",
    "alternativas": [
      "GET",
      "OPEN",
      "SELECT",
      "EXTRACT"
    ],
    "correctAnswer": "SELECT",
    "subject": "SQL - DQL"
  },
  {
    "id": 8,
    "descricao": "Qual comando SQL é usado para inserir um novo registo em uma tabela?",
    "alternativas": [
      "ADD NEW",
      "INSERT INTO",
      "CREATE RECORD",
      "UPDATE"
    ],
    "correctAnswer": "INSERT INTO",
    "subject": "SQL - DML"
  },
  {
    "id": 9,
    "descricao": "Qual comando SQL é usado para modificar registos existentes em uma tabela?",
    "alternativas": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "INSERT"
    ],
    "correctAnswer": "UPDATE",
    "subject": "SQL - DML"
  },
  {
    "id": 10,
    "descricao": "Qual comando SQL é usado para apagar registos de uma tabela?",
    "alternativas": [
      "REMOVE",
      "DELETE",
      "DROP",
      "CLEAR"
    ],
    "correctAnswer": "DELETE",
    "subject": "SQL - DML"
  },
  {
    "id": 11,
    "descricao": "Para que serve a cláusula 'WHERE' em uma consulta SQL?",
    "alternativas": [
      "Para ordenar os resultados.",
      "Para agrupar os resultados.",
      "Para especificar quais tabelas usar.",
      "Para filtrar os registos e retornar apenas aqueles que cumprem uma condição específica."
    ],
    "correctAnswer": "Para filtrar os registos e retornar apenas aqueles que cumprem uma condição específica.",
    "subject": "SQL - DQL"
  },
  {
    "id": 12,
    "descricao": "Qual comando da DDL (Data Definition Language) é usado para criar uma nova tabela?",
    "alternativas": [
      "NEW TABLE",
      "CREATE TABLE",
      "MAKE TABLE",
      "DEFINE TABLE"
    ],
    "correctAnswer": "CREATE TABLE",
    "subject": "SQL - DDL"
  },
  {
    "id": 13,
    "descricao": "O que significa a sigla SQL?",
    "alternativas": [
      "Standardized Query Language",
      "Simple Query Language",
      "Structured Query Language",
      "System Query Logic"
    ],
    "correctAnswer": "Structured Query Language",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 14,
    "descricao": "Em `SELECT * FROM Utilizadores;`, o que o asterisco (*) significa?",
    "alternativas": [
      "Selecionar apenas o primeiro registo.",
      "Selecionar todas as colunas da tabela.",
      "Selecionar registos onde a coluna principal seja nula.",
      "Um erro de sintaxe."
    ],
    "correctAnswer": "Selecionar todas as colunas da tabela.",
    "subject": "SQL - DQL"
  },
  {
    "id": 15,
    "descricao": "Qual tipo de dado é mais apropriado para armazenar o nome de uma pessoa?",
    "alternativas": [
      "INT",
      "BOOLEAN",
      "DATE",
      "VARCHAR"
    ],
    "correctAnswer": "VARCHAR",
    "subject": "SQL - DDL"
  },
  {
    "id": 16,
    "descricao": "Uma tabela de banco de dados pode ter múltiplas Chaves Primárias.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 17,
    "descricao": "Uma coluna definida como Chave Primária pode conter valores nulos (NULL).",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 18,
    "descricao": "O comando `DROP TABLE Utilizadores;` apaga todos os registos da tabela, mas mantém a sua estrutura.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DDL"
  },
  {
    "id": 19,
    "descricao": "O comando `DELETE FROM Utilizadores;` (sem cláusula WHERE) apaga todos os registos da tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DML"
  },
  {
    "id": 20,
    "descricao": "A cláusula `WHERE` é obrigatória em todas as consultas `SELECT`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 21,
    "descricao": "Em SQL, os comandos como 'SELECT', 'FROM', 'WHERE' são geralmente case-insensitive (não distinguem maiúsculas de minúsculas).",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 22,
    "descricao": "Todas as colunas em uma tabela de banco de dados devem ser do mesmo tipo de dado.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 23,
    "descricao": "A restrição (constraint) `NOT NULL` em uma coluna impede que sejam inseridos valores nulos nessa coluna.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 24,
    "descricao": "O comando `UPDATE` é usado para adicionar novas linhas a uma tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DML"
  },
  {
    "id": 25,
    "descricao": "Uma Chave Estrangeira em uma tabela deve corresponder a um valor de uma Chave Primária (ou Chave Única) em outra tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 26,
    "descricao": "O tipo de dado `BOOLEAN` pode armazenar três valores: verdadeiro, falso ou nulo.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 27,
    "descricao": "A DML (Data Manipulation Language) inclui comandos como `CREATE TABLE` e `ALTER TABLE`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 28,
    "descricao": "Um banco de dados relacional organiza os dados em formato de tabelas com relações entre si.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 29,
    "descricao": "Para modificar a estrutura de uma tabela existente, como adicionar uma nova coluna, usa-se o comando `ALTER TABLE`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 30,
    "descricao": "Executar o comando `UPDATE Utilizadores SET idade = 30;` sem a cláusula `WHERE` atualizará a idade de todos os utilizadores para 30.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DML"
  },
  {
    "id": 31,
    "descricao": "Qual tipo de 'JOIN' retorna todos os registos da tabela da esquerda e os registos correspondentes da tabela da direita?",
    "alternativas": [
      "INNER JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN",
      "LEFT JOIN"
    ],
    "correctAnswer": "LEFT JOIN",
    "subject": "SQL - DQL"
  },
  {
    "id": 32,
    "descricao": "Qual tipo de 'JOIN' retorna apenas os registos que têm valores correspondentes em AMBAS as tabelas?",
    "alternativas": [
      "INNER JOIN",
      "LEFT JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN"
    ],
    "correctAnswer": "INNER JOIN",
    "subject": "SQL - DQL"
  },
  {
    "id": 33,
    "descricao": "Qual função de agregação é usada para contar o número de registos em uma consulta?",
    "alternativas": [
      "SUM()",
      "MAX()",
      "COUNT()",
      "TOTAL()"
    ],
    "correctAnswer": "COUNT()",
    "subject": "SQL - DQL"
  },
  {
    "id": 34,
    "descricao": "Qual função de agregação é usada para calcular a média de uma coluna numérica?",
    "alternativas": [
      "SUM()",
      "AVG()",
      "MEDIAN()",
      "MEAN()"
    ],
    "correctAnswer": "AVG()",
    "subject": "SQL - DQL"
  },
  {
    "id": 35,
    "descricao": "A cláusula `GROUP BY` é mais frequentemente usada em conjunto com:",
    "alternativas": [
      "UPDATE",
      "ORDER BY",
      "Funções de Agregação",
      "INSERT"
    ],
    "correctAnswer": "Funções de Agregação",
    "subject": "SQL - DQL"
  },
  {
    "id": 36,
    "descricao": "Qual é a principal diferença entre as cláusulas `WHERE` e `HAVING`?",
    "alternativas": [
      "Não há diferença, são sinónimos.",
      "`WHERE` filtra registos antes da agrupação, enquanto `HAVING` filtra grupos após a agrupação.",
      "`HAVING` é mais rápida que `WHERE`.",
      "`WHERE` é usada em `SELECT`, e `HAVING` é usada em `UPDATE`."
    ],
    "correctAnswer": "`WHERE` filtra registos antes da agrupação, enquanto `HAVING` filtra grupos após a agrupação.",
    "subject": "SQL - DQL"
  },
  {
    "id": 37,
    "descricao": "Como se ordena o resultado de uma consulta em ordem decrescente?",
    "alternativas": [
      "Usando a palavra-chave `DOWN` na cláusula `ORDER BY`.",
      "Usando a palavra-chave `DESC` na cláusula `ORDER BY`.",
      "Usando a palavra-chave `REVERSE` na cláusula `ORDER BY`.",
      "O SQL só permite ordenação crescente."
    ],
    "correctAnswer": "Usando a palavra-chave `DESC` na cláusula `ORDER BY`.",
    "subject": "SQL - DQL"
  },
  {
    "id": 38,
    "descricao": "Na cláusula `LIKE`, qual caractere representa 'qualquer sequência de zero ou mais caracteres'?",
    "alternativas": [
      "_",
      "*",
      "?",
      "%"
    ],
    "correctAnswer": "%",
    "subject": "SQL - DQL"
  },
  {
    "id": 39,
    "descricao": "Na cláusula `LIKE`, qual caractere representa 'exatamente um único caractere'?",
    "alternativas": [
      "_",
      "*",
      "?",
      "%"
    ],
    "correctAnswer": "_",
    "subject": "SQL - DQL"
  },
  {
    "id": 40,
    "descricao": "Qual operador é usado para especificar um intervalo de valores em uma cláusula `WHERE`?",
    "alternativas": [
      "RANGE",
      "BETWEEN",
      "INTERVAL",
      "WITHIN"
    ],
    "correctAnswer": "BETWEEN",
    "subject": "SQL - DQL"
  },
  {
    "id": 41,
    "descricao": "Qual é o principal objetivo da normalização de um banco de dados?",
    "alternativas": [
      "Aumentar a velocidade de todas as consultas.",
      "Deixar o banco de dados mais complexo.",
      "Reduzir a redundância de dados e melhorar a sua integridade.",
      "Juntar todas as informações em uma única tabela."
    ],
    "correctAnswer": "Reduzir a redundância de dados e melhorar a sua integridade.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 42,
    "descricao": "O que a Primeira Forma Normal (1FN) exige?",
    "alternativas": [
      "Que a tabela tenha uma chave estrangeira.",
      "Que não existam chaves primárias.",
      "Que todos os valores nas colunas sejam atómicos (indivisíveis) e não haja grupos de repetição.",
      "Que a tabela esteja ligada a pelo menos duas outras."
    ],
    "correctAnswer": "Que todos os valores nas colunas sejam atómicos (indivisíveis) e não haja grupos de repetição.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 43,
    "descricao": "Qual comando SQL é usado para dar um nome alternativo (um 'alias') a uma coluna ou tabela em uma consulta?",
    "alternativas": [
      "RENAME",
      "ALIAS",
      "AS",
      "LABEL"
    ],
    "correctAnswer": "AS",
    "subject": "SQL - DQL"
  },
  {
    "id": 44,
    "descricao": "O que é um 'índice' (index) em um banco de dados?",
    "alternativas": [
      "Um resumo dos dados da tabela.",
      "Uma estrutura de dados especial que melhora a velocidade das operações de recuperação de dados em uma tabela.",
      "Uma restrição que impede valores duplicados.",
      "Um registo dos utilizadores que acederam à tabela."
    ],
    "correctAnswer": "Uma estrutura de dados especial que melhora a velocidade das operações de recuperação de dados em uma tabela.",
    "subject": "Otimização"
  },
  {
    "id": 45,
    "descricao": "O que é uma 'view' em SQL?",
    "alternativas": [
      "Uma cópia física de uma tabela.",
      "Uma tabela virtual baseada no conjunto de resultados de uma consulta SQL.",
      "Um relatório visual dos dados.",
      "Uma função para visualizar imagens armazenadas no banco."
    ],
    "correctAnswer": "Uma tabela virtual baseada no conjunto de resultados de uma consulta SQL.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 46,
    "descricao": "O que é uma 'subconsulta' (subquery)?",
    "alternativas": [
      "Uma consulta que é executada após a consulta principal terminar.",
      "Uma consulta que é aninhada dentro de outra consulta SQL.",
      "Um nome alternativo para a cláusula JOIN.",
      "Uma consulta que não funciona."
    ],
    "correctAnswer": "Uma consulta que é aninhada dentro de outra consulta SQL.",
    "subject": "SQL - DQL"
  },
  {
    "id": 47,
    "descricao": "Qual operador combina o resultado de duas ou more consultas `SELECT` e remove as linhas duplicadas?",
    "alternativas": [
      "COMBINE",
      "MERGE",
      "UNION",
      "JOIN"
    ],
    "correctAnswer": "UNION",
    "subject": "SQL - DQL"
  },
  {
    "id": 48,
    "descricao": "Qual é a função do operador `IN`?",
    "alternativas": [
      "Verificar se um valor está dentro de um intervalo numérico.",
      "Verificar se um valor corresponde a qualquer valor em uma lista de valores.",
      "Verificar se um valor contém um determinado texto.",
      "Verificar a existência de um ficheiro."
    ],
    "correctAnswer": "Verificar se um valor corresponde a qualquer valor em uma lista de valores.",
    "subject": "SQL - DQL"
  },
  {
    "id": 49,
    "descricao": "Qual restrição (constraint) garante que todos os valores em uma coluna sejam diferentes?",
    "alternativas": [
      "NOT NULL",
      "UNIQUE",
      "CHECK",
      "PRIMARY KEY"
    ],
    "correctAnswer": "UNIQUE",
    "subject": "SQL - DDL"
  },
  {
    "id": 50,
    "descricao": "A Terceira Forma Normal (3FN) visa eliminar qual tipo de dependência?",
    "alternativas": [
      "Dependências parciais.",
      "Dependências de repetição.",
      "Dependências transitivas.",
      "Dependências de chave primária."
    ],
    "correctAnswer": "Dependências transitivas.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 51,
    "descricao": "O que faz o comando `COMMIT` em uma transação?",
    "alternativas": [
      "Cancela todas as alterações da transação.",
      "Inicia uma nova transação.",
      "Salva permanentemente todas as alterações feitas na transação.",
      "Verifica se a transação tem erros."
    ],
    "correctAnswer": "Salva permanentemente todas as alterações feitas na transação.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 52,
    "descricao": "E o que faz o comando `ROLLBACK`?",
    "alternativas": [
      "Desfaz todas as alterações feitas desde o início da transação.",
      "Confirma todas as alterações da transação.",
      "Executa a transação novamente.",
      "Apaga a tabela da transação."
    ],
    "correctAnswer": "Desfaz todas as alterações feitas desde o início da transação.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 53,
    "descricao": "Qual o propósito da cláusula `LIMIT` (ou `TOP` em alguns SGBDs)?",
    "alternativas": [
      "Definir o valor máximo para uma coluna.",
      "Restringir o número de registos retornados por uma consulta.",
      "Limitar o acesso de utilizadores à tabela.",
      "Aumentar o limite de memória para a consulta."
    ],
    "correctAnswer": "Restringir o número de registos retornados por uma consulta.",
    "subject": "SQL - DQL"
  },
  {
    "id": 54,
    "descricao": "O que o operador `IS NULL` verifica?",
    "alternativas": [
      "Se um valor de texto é uma string vazia ('').",
      "Se um valor numérico é zero (0).",
      "Se uma coluna tem um valor nulo (ausência de valor).",
      "Se um valor é indefinido."
    ],
    "correctAnswer": "Se uma coluna tem um valor nulo (ausência de valor).",
    "subject": "SQL - DQL"
  },
  {
    "id": 55,
    "descricao": "A propriedade 'Atomicidade' do ACID garante que:",
    "alternativas": [
      "A transação seja isolada de outras.",
      "Uma transação seja tratada como uma única unidade de trabalho, que ou é executada completamente ou não é executada de todo.",
      "Os dados sejam sempre consistentes.",
      "As alterações sejam permanentes."
    ],
    "correctAnswer": "Uma transação seja tratada como uma única unidade de trabalho, que ou é executada completamente ou não é executada de todo.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 56,
    "descricao": "Qual comando DDL é usado para apagar uma coluna de uma tabela existente?",
    "alternativas": [
      "UPDATE TABLE ... DROP COLUMN",
      "ALTER TABLE ... DROP COLUMN",
      "MODIFY TABLE ... DELETE COLUMN",
      "DELETE COLUMN"
    ],
    "correctAnswer": "ALTER TABLE ... DROP COLUMN",
    "subject": "SQL - DDL"
  },
  {
    "id": 57,
    "descricao": "Um banco de dados NoSQL é mais adequado para:",
    "alternativas": [
      "Dados altamente estruturados e com relações complexas.",
      "Dados não estruturados ou semi-estruturados, e que exigem alta escalabilidade.",
      "Sistemas que nunca mudam de estrutura.",
      "Aplicações que exigem transações ACID complexas."
    ],
    "correctAnswer": "Dados não estruturados ou semi-estruturados, e que exigem alta escalabilidade.",
    "subject": "NoSQL"
  },
  {
    "id": 58,
    "descricao": "Qual função `JOIN` retorna todos os registos quando há uma correspondência na tabela da esquerda ou da direita?",
    "alternativas": [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    "correctAnswer": "FULL OUTER JOIN",
    "subject": "SQL - DQL"
  },
  {
    "id": 59,
    "descricao": "Qual cláusula é usada com `GROUP BY` para filtrar os resultados agrupados com base em uma condição?",
    "alternativas": [
      "WHERE",
      "HAVING",
      "FILTER",
      "CONDITION"
    ],
    "correctAnswer": "HAVING",
    "subject": "SQL - DQL"
  },
  {
    "id": 60,
    "descricao": "O que é um 'Diagrama Entidade-Relacionamento' (DER)?",
    "alternativas": [
      "Um diagrama do fluxo de uma consulta SQL.",
      "Uma representação visual da estrutura lógica de um banco de dados, mostrando entidades, atributos e relacionamentos.",
      "Um gráfico do uso de memória do banco de dados.",
      "Uma lista de todas as chaves estrangeiras."
    ],
    "correctAnswer": "Uma representação visual da estrutura lógica de um banco de dados, mostrando entidades, atributos e relacionamentos.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 61,
    "descricao": "O que o operador `UNION ALL` faz?",
    "alternativas": [
      "Combina dois resultados e remove duplicados.",
      "É um sinónimo para `INNER JOIN`.",
      "Combina dois resultados mas não remove as linhas duplicadas.",
      "Seleciona todos os sindicatos de uma cidade."
    ],
    "correctAnswer": "Combina dois resultados mas não remove as linhas duplicadas.",
    "subject": "SQL - DQL"
  },
  {
    "id": 62,
    "descricao": "O que faz a restrição `CHECK`?",
    "alternativas": [
      "Verifica se o utilizador tem permissão para aceder à tabela.",
      "Limita o intervalo de valores que pode ser colocado em uma coluna.",
      "Verifica se a chave estrangeira é válida.",
      "Confere a ortografia dos dados inseridos."
    ],
    "correctAnswer": "Limita o intervalo de valores que pode ser colocado em uma coluna.",
    "subject": "SQL - DDL"
  },
  {
    "id": 63,
    "descricao": "Qual função de agregação retorna o maior valor de uma coluna?",
    "alternativas": [
      "MAX()",
      "TOP()",
      "LARGE()",
      "UPPER()"
    ],
    "correctAnswer": "MAX()",
    "subject": "SQL - DQL"
  },
  {
    "id": 64,
    "descricao": "Qual destas opções é um exemplo de um banco de dados NoSQL do tipo 'Documento'?",
    "alternativas": [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis"
    ],
    "correctAnswer": "MongoDB",
    "subject": "NoSQL"
  },
  {
    "id": 65,
    "descricao": "Uma `PRIMARY KEY` é uma combinação de quais duas restrições?",
    "alternativas": [
      "FOREIGN KEY e CHECK",
      "UNIQUE e NOT NULL",
      "DEFAULT e NOT NULL",
      "INDEX e UNIQUE"
    ],
    "correctAnswer": "UNIQUE e NOT NULL",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 66,
    "descricao": "Um `INNER JOIN` entre a Tabela A e a Tabela B retornará registos da Tabela A que não têm correspondência na Tabela B.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 67,
    "descricao": "A função `COUNT(nome_da_coluna)` ignora os valores nulos ao fazer a contagem.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 68,
    "descricao": "É possível usar a cláusula `WHERE` para filtrar os resultados de uma função de agregação.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 69,
    "descricao": "A cláusula `ORDER BY` pode ser usada para ordenar os resultados por múltiplas colunas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 70,
    "descricao": "O operador `LIKE` é case-sensitive na maioria dos sistemas de banco de dados por padrão.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 71,
    "descricao": "Uma subconsulta pode ser usada na cláusula `FROM`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 72,
    "descricao": "A principal desvantagem de criar muitos índices é que eles podem tornar as operações de escrita (`INSERT`, `UPDATE`, `DELETE`) mais lentas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Otimização"
  },
  {
    "id": 73,
    "descricao": "A Segunda Forma Normal (2FN) lida com a eliminação de dependências transitivas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 74,
    "descricao": "Uma `VIEW` armazena os seus próprios dados fisicamente, fazendo uma cópia dos dados das tabelas base.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 75,
    "descricao": "O comando `UNION` e `UNION ALL` produzem sempre o mesmo resultado.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 76,
    "descricao": "Uma transação é uma sequência de operações executadas como uma única unidade lógica de trabalho.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 77,
    "descricao": "É possível fazer um `JOIN` de uma tabela com ela mesma.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 78,
    "descricao": "O operador `BETWEEN` é inclusivo, ou seja, `BETWEEN 10 AND 20` inclui os números 10 e 20.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 79,
    "descricao": "Se uma consulta tiver as cláusulas `WHERE`, `GROUP BY` e `HAVING`, a cláusula `WHERE` é aplicada primeiro.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 80,
    "descricao": "O principal objetivo de um banco de dados NoSQL é garantir as propriedades ACID.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "NoSQL"
  },
  {
    "id": 81,
    "descricao": "Um `FULL OUTER JOIN` retorna todos os registos de ambas as tabelas, preenchendo com NULL onde não há correspondência.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 82,
    "descricao": "A cláusula `AS` é obrigatória ao criar um alias para uma coluna.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 83,
    "descricao": "Uma tabela pode ter múltiplas colunas com a restrição `UNIQUE`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 84,
    "descricao": "Redundância de dados é algo desejável em um banco de dados bem modelado.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 85,
    "descricao": "A função `SUM()` pode ser usada em colunas de texto.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 86,
    "descricao": "Uma `VIEW` pode ser usada para simplificar consultas complexas e para restringir o acesso a dados.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 87,
    "descricao": "A propriedade 'Isolamento' do ACID garante que transações concorrentes não interfiram umas com as outras.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 88,
    "descricao": "O comando `ALTER TABLE` pode ser usado para mudar o tipo de dado de uma coluna.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 89,
    "descricao": "O `CROSS JOIN` retorna o produto cartesiano das duas tabelas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 90,
    "descricao": "A Terceira Forma Normal (3FN) implica que a tabela já esteja na Segunda Forma Normal (2FN).",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 91,
    "descricao": "`SELECT nome, apelido FROM Utilizadores;` é um exemplo de projeção.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 92,
    "descricao": "`SELECT * FROM Utilizadores WHERE idade > 18;` é um exemplo de seleção.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 93,
    "descricao": "Bancos de dados NoSQL usam SQL como sua principal linguagem de consulta.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "NoSQL"
  },
  {
    "id": 94,
    "descricao": "O uso de índices não tem impacto no espaço de armazenamento do banco de dados.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 95,
    "descricao": "A restrição `DEFAULT` especifica um valor padrão para uma coluna quando nenhum valor é fornecido.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 96,
    "descricao": "Um `RIGHT JOIN` é funcionalmente idêntico a um `LEFT JOIN` se a ordem das tabelas for invertida.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 97,
    "descricao": "Uma subconsulta que retorna múltiplos valores pode ser usada com o operador `IN`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 98,
    "descricao": "A cláusula `DISTINCT` é usada para retornar apenas valores diferentes.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 99,
    "descricao": "A 'cardinalidade' de um relacionamento refere-se ao número de instâncias de uma entidade que podem ser associadas a instâncias de outra entidade.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 100,
    "descricao": "O SGBD (Sistema de Gestão de Banco de Dados) é o próprio banco de dados.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 101,
    "descricao": "Como é implementado um relacionamento 'Muitos-para-Muitos' entre duas tabelas (ex: Alunos e Disciplinas)?",
    "alternativas": [
      "Adicionando uma chave estrangeira em cada tabela apontando uma para a outra.",
      "Criando uma terceira tabela, chamada de tabela de junção (ou associativa), que contém chaves estrangeiras para ambas as tabelas.",
      "Colocando múltiplos IDs em uma única coluna.",
      "Não é possível implementar este tipo de relacionamento em bancos de dados relacionais."
    ],
    "correctAnswer": "Criando uma terceira tabela, chamada de tabela de junção (ou associativa), que contém chaves estrangeiras para ambas as tabelas.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 102,
    "descricao": "Qual a finalidade da instrução `CASE` em uma consulta `SELECT`?",
    "alternativas": [
      "Para criar uma nova tabela.",
      "Para aplicar lógica condicional (if-then-else) aos resultados da consulta.",
      "Para filtrar os resultados, como a cláusula `WHERE`.",
      "Para contar o número de casos."
    ],
    "correctAnswer": "Para aplicar lógica condicional (if-then-else) aos resultados da consulta.",
    "subject": "SQL - DQL"
  },
  {
    "id": 103,
    "descricao": "Um `SELF JOIN` é uma consulta em que uma tabela é juntada com:",
    "alternativas": [
      "Outra tabela com a mesma estrutura.",
      "Uma `VIEW`.",
      "Ela mesma.",
      "Uma tabela de outro banco de dados."
    ],
    "correctAnswer": "Ela mesma.",
    "subject": "SQL - DQL"
  },
  {
    "id": 104,
    "descricao": "Qual é a principal diferença entre `DELETE` e `TRUNCATE`?",
    "alternativas": [
      "Não há diferença.",
      "`DELETE` remove a tabela e `TRUNCATE` remove apenas os dados.",
      "`DELETE` é uma operação DDL e `TRUNCATE` é DML.",
      "`TRUNCATE` é geralmente mais rápido, não ativa triggers de `DELETE` e reinicia a contagem de identidades (auto-incremento)."
    ],
    "correctAnswer": "`TRUNCATE` é geralmente mais rápido, não ativa triggers de `DELETE` e reinicia a contagem de identidades (auto-incremento).",
    "subject": "SQL - DML/DDL"
  },
  {
    "id": 105,
    "descricao": "O que é uma 'Common Table Expression' (CTE) e qual palavra-chave a inicia?",
    "alternativas": [
      "É um alias para uma tabela, iniciado por `AS`.",
      "É uma tabela temporária nomeada, visível apenas na consulta atual, iniciada por `WITH`.",
      "É uma variável que armazena um resultado, iniciada por `DECLARE`.",
      "É um índice temporário, iniciado por `TEMP INDEX`."
    ],
    "correctAnswer": "É uma tabela temporária nomeada, visível apenas na consulta atual, iniciada por `WITH`.",
    "subject": "SQL - DQL"
  },
  {
    "id": 106,
    "descricao": "O que a propriedade 'Consistência' do ACID garante?",
    "alternativas": [
      "Que a transação será executada por completo ou não será de todo.",
      "Que a transação trará o banco de dados de um estado válido para outro, preservando as regras de integridade.",
      "Que as alterações da transação não serão visíveis para outras até o `COMMIT`.",
      "Que as alterações confirmadas são permanentes."
    ],
    "correctAnswer": "Que a transação trará o banco de dados de um estado válido para outro, preservando as regras de integridade.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 107,
    "descricao": "O que é 'desnormalização'?",
    "alternativas": [
      "Um erro no processo de normalização.",
      "O processo de juntar todas as tabelas em uma só.",
      "O processo de adicionar redundância controlada a um banco de dados para melhorar o desempenho das leituras.",
      "A primeira etapa da normalização."
    ],
    "correctAnswer": "O processo de adicionar redundância controlada a um banco de dados para melhorar o desempenho das leituras.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 108,
    "descricao": "O que é um 'trigger' (gatilho) de banco de dados?",
    "alternativas": [
      "Uma consulta agendada para ser executada em um horário específico.",
      "Um procedimento armazenado que é executado automaticamente em resposta a um evento (INSERT, UPDATE, DELETE) em uma tabela.",
      "Um backup automático do banco de dados.",
      "Um alerta de segurança."
    ],
    "correctAnswer": "Um procedimento armazenado que é executado automaticamente em resposta a um evento (INSERT, UPDATE, DELETE) em uma tabela.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 109,
    "descricao": "O que faz a opção `ON DELETE CASCADE` em uma chave estrangeira?",
    "alternativas": [
      "Impede que o registo pai seja apagado se houver registos filhos.",
      "Define o valor da chave estrangeira nos registos filhos como NULL quando o registo pai é apagado.",
      "Apaga automaticamente os registos filhos quando o registo pai correspondente é apagado.",
      "Envia um email de alerta quando um registo é apagado."
    ],
    "correctAnswer": "Apaga automaticamente os registos filhos quando o registo pai correspondente é apagado.",
    "subject": "SQL - DDL"
  },
  {
    "id": 110,
    "descricao": "Qual função é usada para substituir valores NULL por um outro valor específico?",
    "alternativas": [
      "NVL",
      "ISNULL",
      "COALESCE",
      "Todas as anteriores, dependendo do SGBD."
    ],
    "correctAnswer": "Todas as anteriores, dependendo do SGBD.",
    "subject": "SQL - DQL"
  },
  {
    "id": 111,
    "descricao": "A cláusula `OFFSET` em uma consulta SQL é usada para:",
    "alternativas": [
      "Calcular a diferença entre dois valores.",
      "Pular um número específico de linhas antes de começar a retornar as linhas do resultado.",
      "Definir um valor padrão para uma coluna.",
      "Criar uma cópia de uma tabela."
    ],
    "correctAnswer": "Pular um número específico de linhas antes de começar a retornar as linhas do resultado.",
    "subject": "SQL - DQL"
  },
  {
    "id": 112,
    "descricao": "O que é um 'procedimento armazenado' (stored procedure)?",
    "alternativas": [
      "Uma `VIEW` que aceita parâmetros.",
      "Uma consulta `SELECT` salva no banco de dados.",
      "Um conjunto de comandos SQL pré-compilados e armazenados no banco de dados que podem ser executados como uma única unidade.",
      "Um log de todas as transações."
    ],
    "correctAnswer": "Um conjunto de comandos SQL pré-compilados e armazenados no banco de dados que podem ser executados como uma única unidade.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 113,
    "descricao": "Qual a principal vantagem de usar um procedimento armazenado?",
    "alternativas": [
      "Garante que os dados nunca terão erros.",
      "Reduz o tráfego de rede, melhora a segurança e permite a reutilização de código.",
      "Funciona em qualquer tipo de banco de dados, incluindo NoSQL.",
      "Substitui a necessidade de ter uma aplicação."
    ],
    "correctAnswer": "Reduz o tráfego de rede, melhora a segurança e permite a reutilização de código.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 114,
    "descricao": "Em modelagem de dados, o que é 'cardinalidade'?",
    "alternativas": [
      "O número de colunas em uma tabela.",
      "O número de tabelas em um banco de dados.",
      "Descreve o número de instâncias de uma entidade que se relaciona com uma instância de outra entidade (ex: 1:1, 1:N, N:M).",
      "A importância de uma tabela no modelo."
    ],
    "correctAnswer": "Descreve o número de instâncias de uma entidade que se relaciona com uma instância de outra entidade (ex: 1:1, 1:N, N:M).",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 115,
    "descricao": "Qual das seguintes opções descreve melhor um relacionamento 'Um-para-Um'?",
    "alternativas": [
      "Um cliente pode ter várias faturas.",
      "Um país tem uma única capital, e uma capital pertence a um único país.",
      "Um aluno pode estar inscrito em várias disciplinas, e uma disciplina pode ter vários alunos.",
      "Um produto pode ter várias cores."
    ],
    "correctAnswer": "Um país tem uma única capital, e uma capital pertence a um único país.",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 116,
    "descricao": "O que são 'funções de janela' (window functions) em SQL?",
    "alternativas": [
      "Funções para criar interfaces gráficas.",
      "Funções que executam um cálculo sobre um conjunto de linhas que estão de alguma forma relacionadas com a linha atual.",
      "Funções para abrir e fechar conexões com o banco de dados.",
      "Funções de formatação de texto."
    ],
    "correctAnswer": "Funções que executam um cálculo sobre um conjunto de linhas que estão de alguma forma relacionadas com a linha atual.",
    "subject": "SQL - DQL"
  },
  {
    "id": 117,
    "descricao": "A função `ROW_NUMBER()` é um exemplo de:",
    "alternativas": [
      "Função de Agregação",
      "Função de Texto",
      "Função de Janela",
      "Função de Conversão"
    ],
    "correctAnswer": "Função de Janela",
    "subject": "SQL - DQL"
  },
  {
    "id": 118,
    "descricao": "Qual é a principal característica de um índice 'clusterizado' (clustered index)?",
    "alternativas": [
      "Pode haver vários por tabela.",
      "Não afeta a ordem dos dados.",
      "Determina a ordem física de armazenamento dos dados na tabela.",
      "É usado apenas para colunas de texto."
    ],
    "correctAnswer": "Determina a ordem física de armazenamento dos dados na tabela.",
    "subject": "Otimização"
  },
  {
    "id": 119,
    "descricao": "O que é 'injeção de SQL' (SQL Injection)?",
    "alternativas": [
      "Uma técnica para otimizar consultas.",
      "Um tipo de ataque de segurança em que código SQL malicioso é inserido em uma consulta para manipular o banco de dados.",
      "O processo de instalar um SGBD.",
      "A inserção de dados via comando `INSERT`."
    ],
    "correctAnswer": "Um tipo de ataque de segurança em que código SQL malicioso é inserido em uma consulta para manipular o banco de dados.",
    "subject": "Segurança"
  },
  {
    "id": 120,
    "descricao": "Como se pode prevenir a injeção de SQL?",
    "alternativas": [
      "Usando `TRUNCATE` em vez de `DELETE`.",
      "Não usando a cláusula `WHERE`.",
      "Usando consultas parametrizadas (prepared statements) e 'escaping' de entradas do utilizador.",
      "Armazenando senhas em texto plano."
    ],
    "correctAnswer": "Usando consultas parametrizadas (prepared statements) e 'escaping' de entradas do utilizador.",
    "subject": "Segurança"
  },
  {
    "id": 121,
    "descricao": "Qual é a diferença entre uma chave primária e uma chave única (unique key)?",
    "alternativas": [
      "Não há diferença.",
      "Uma tabela pode ter várias chaves primárias, mas apenas uma chave única.",
      "Uma chave primária não pode ser nula, enquanto uma chave única pode permitir um valor nulo (na maioria dos SGBDs).",
      "Chaves únicas são sempre numéricas."
    ],
    "correctAnswer": "Uma chave primária não pode ser nula, enquanto uma chave única pode permitir um valor nulo (na maioria dos SGBDs).",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 122,
    "descricao": "O que o Teorema CAP (Consistência, Disponibilidade, Tolerância a Partições) afirma sobre sistemas distribuídos?",
    "alternativas": [
      "Que é possível ter os três atributos simultaneamente.",
      "Que um sistema distribuído pode garantir no máximo dois dos três atributos (C, A, P) ao mesmo tempo.",
      "Que a consistência é o atributo mais importante.",
      "Que a segurança (S) deveria ser o quarto atributo."
    ],
    "correctAnswer": "Que um sistema distribuído pode garantir no máximo dois dos três atributos (C, A, P) ao mesmo tempo.",
    "subject": "NoSQL"
  },
  {
    "id": 123,
    "descricao": "O que é um 'deadlock' (impasse)?",
    "alternativas": [
      "Um erro de sintaxe em uma consulta.",
      "Uma situação em que duas ou mais transações estão à espera uma da outra para liberar recursos, resultando em um bloqueio mútuo.",
      "Um trigger que nunca é acionado.",
      "Uma tabela sem chave primária."
    ],
    "correctAnswer": "Uma situação em que duas ou mais transações estão à espera uma da outra para liberar recursos, resultando em um bloqueio mútuo.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 124,
    "descricao": "A cláusula `EXCEPT` (ou `MINUS` em Oracle) é usada para:",
    "alternativas": [
      "Retornar a intersecção de duas consultas.",
      "Retornar todas as linhas da primeira consulta que não estão presentes na segunda consulta.",
      "Retornar todas as linhas, incluindo duplicados.",
      "Retornar uma exceção se a consulta falhar."
    ],
    "correctAnswer": "Retornar todas as linhas da primeira consulta que não estão presentes na segunda consulta.",
    "subject": "SQL - DQL"
  },
  {
    "id": 125,
    "descricao": "O que é um 'savepoint' em uma transação?",
    "alternativas": [
      "O ponto final de uma transação (`COMMIT`).",
      "Um ponto dentro de uma transação para o qual se pode reverter (`ROLLBACK`) parcialmente.",
      "Um backup automático da transação.",
      "O ponto de início de uma transação."
    ],
    "correctAnswer": "Um ponto dentro de uma transação para o qual se pode reverter (`ROLLBACK`) parcialmente.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 126,
    "descricao": "Qual das seguintes opções é uma vantagem dos bancos de dados NoSQL sobre os relacionais?",
    "alternativas": [
      "Garantia de propriedades ACID.",
      "Modelo de dados rígido e bem definido.",
      "Esquema flexível e escalabilidade horizontal.",
      "Linguagem de consulta padronizada (SQL)."
    ],
    "correctAnswer": "Esquema flexível e escalabilidade horizontal.",
    "subject": "NoSQL"
  },
  {
    "id": 127,
    "descricao": "O que a função `MAX()` retorna se aplicada a uma coluna de texto como 'nome'?",
    "alternativas": [
      "Um erro.",
      "O nome com mais caracteres.",
      "O último valor na ordem alfabética.",
      "O primeiro valor na ordem alfabética."
    ],
    "correctAnswer": "O último valor na ordem alfabética.",
    "subject": "SQL - DQL"
  },
  {
    "id": 128,
    "descricao": "Em um `SELF JOIN` de uma tabela de 'Funcionarios' para encontrar o chefe de cada funcionário, o que é essencial?",
    "alternativas": [
      "Criar uma cópia da tabela.",
      "Usar `GROUP BY`.",
      "Usar aliases para distinguir as duas 'instâncias' da mesma tabela na consulta.",
      "Usar a função `COUNT()`."
    ],
    "correctAnswer": "Usar aliases para distinguir as duas 'instâncias' da mesma tabela na consulta.",
    "subject": "SQL - DQL"
  },
  {
    "id": 129,
    "descricao": "A `DCL (Data Control Language)` lida com que tipo de comandos?",
    "alternativas": [
      "`SELECT`, `INSERT`, `UPDATE`",
      "`CREATE`, `ALTER`, `DROP`",
      "`GRANT`, `REVOKE`",
      "`COMMIT`, `ROLLBACK`"
    ],
    "correctAnswer": "`GRANT`, `REVOKE`",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 130,
    "descricao": "Qual tipo de índice é criado automaticamente quando uma chave primária é definida?",
    "alternativas": [
      "Índice não-clusterizado",
      "Índice de texto completo",
      "Índice clusterizado (na maioria dos SGBDs)",
      "Nenhum índice é criado"
    ],
    "correctAnswer": "Índice clusterizado (na maioria dos SGBDs)",
    "subject": "Otimização"
  },
  {
    "id": 131,
    "descricao": "O que é um 'esquema' (schema) de banco de dados?",
    "alternativas": [
      "A consulta SQL para criar o banco.",
      "Uma coleção de objetos de banco de dados (tabelas, views, etc.) associados a um determinado utilizador ou grupo.",
      "O hardware onde o banco de dados está armazenado.",
      "O backup do banco de dados."
    ],
    "correctAnswer": "Uma coleção de objetos de banco de dados (tabelas, views, etc.) associados a um determinado utilizador ou grupo.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 132,
    "descricao": "Qual o objetivo de um 'plano de execução' de uma consulta?",
    "alternativas": [
      "Um plano de projeto para desenvolver o banco.",
      "A sequência de passos que o SGBD decide usar para executar uma consulta.",
      "Um log de quem executou a consulta.",
      "As permissões necessárias para executar a consulta."
    ],
    "correctAnswer": "A sequência de passos que o SGBD decide usar para executar uma consulta.",
    "subject": "Otimização"
  },
  {
    "id": 133,
    "descricao": "O que a função `COALESCE(col1, col2, 'N/A')` faz?",
    "alternativas": [
      "Concatena os valores de col1 e col2.",
      "Retorna o primeiro valor não nulo da lista (col1, col2, ou 'N/A').",
      "Retorna um erro se col1 ou col2 for nulo.",
      "Compara se col1 e col2 são iguais."
    ],
    "correctAnswer": "Retorna o primeiro valor não nulo da lista (col1, col2, ou 'N/A').",
    "subject": "SQL - DQL"
  },
  {
    "id": 134,
    "descricao": "Qual destes não é um tipo de banco de dados NoSQL?",
    "alternativas": [
      "Chave-Valor",
      "Documento",
      "Grafo",
      "Relacional"
    ],
    "correctAnswer": "Relacional",
    "subject": "NoSQL"
  },
  {
    "id": 135,
    "descricao": "O que é 'sharding' em um banco de dados?",
    "alternativas": [
      "O processo de criptografar dados.",
      "Uma técnica de particionamento horizontal que distribui os dados por múltiplos servidores.",
      "Um tipo de ataque de segurança.",
      "O processo de criar um backup."
    ],
    "correctAnswer": "Uma técnica de particionamento horizontal que distribui os dados por múltiplos servidores.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 136,
    "descricao": "A cláusula `INTERSECT` é usada para:",
    "alternativas": [
      "Retornar a união de duas consultas.",
      "Retornar apenas as linhas que aparecem em ambos os conjuntos de resultados de duas consultas.",
      "Dividir uma consulta em duas.",
      "Criar uma interseção na estrada."
    ],
    "correctAnswer": "Retornar apenas as linhas que aparecem em ambos os conjuntos de resultados de duas consultas.",
    "subject": "SQL - DQL"
  },
  {
    "id": 137,
    "descricao": "Qual a diferença entre uma função e um procedimento armazenado?",
    "alternativas": [
      "Não há diferença.",
      "Funções devem retornar um único valor, enquanto procedimentos podem retornar múltiplos conjuntos de resultados (ou nenhum).",
      "Procedimentos são mais rápidos.",
      "Funções não podem aceitar parâmetros."
    ],
    "correctAnswer": "Funções devem retornar um único valor, enquanto procedimentos podem retornar múltiplos conjuntos de resultados (ou nenhum).",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 138,
    "descricao": "O que é um 'índice de texto completo' (full-text index)?",
    "alternativas": [
      "Um índice para colunas numéricas.",
      "Um tipo de índice que permite buscas rápidas e flexíveis em dados de texto, procurando por palavras ou frases.",
      "Um índice que contém o texto completo de um livro.",
      "Um índice que não pode ser modificado."
    ],
    "correctAnswer": "Um tipo de índice que permite buscas rápidas e flexíveis em dados de texto, procurando por palavras ou frases.",
    "subject": "Otimização"
  },
  {
    "id": 139,
    "descricao": "O que a propriedade 'Durabilidade' do ACID garante?",
    "alternativas": [
      "Que a transação vai durar muito tempo.",
      "Que os dados serão consistentes.",
      "Que, uma vez que uma transação tenha sido confirmada (`COMMIT`), suas alterações permanecerão mesmo em caso de falha do sistema.",
      "Que a transação é atómica."
    ],
    "correctAnswer": "Que, uma vez que uma transação tenha sido confirmada (`COMMIT`), suas alterações permanecerão mesmo em caso de falha do sistema.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 140,
    "descricao": "Qual destes comandos é parte da `TCL (Transaction Control Language)`?",
    "alternativas": [
      "CREATE",
      "SELECT",
      "GRANT",
      "COMMIT"
    ],
    "correctAnswer": "COMMIT",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 141,
    "descricao": "Um 'orphan record' (registo órfão) é um registo...",
    "alternativas": [
      "que não tem chave primária.",
      "cuja chave estrangeira aponta para um registo pai que não existe mais.",
      "que não tem nenhuma coluna preenchida.",
      "que nunca foi selecionado por uma consulta."
    ],
    "correctAnswer": "cuja chave estrangeira aponta para um registo pai que não existe mais.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 142,
    "descricao": "Qual é um bom caso de uso para um `SELF JOIN`?",
    "alternativas": [
      "Ligar clientes e pedidos.",
      "Listar todos os funcionários e os seus respectivos chefes (que também são funcionários).",
      "Calcular o total de vendas.",
      "Inserir dados em duas tabelas ao mesmo tempo."
    ],
    "correctAnswer": "Listar todos os funcionários e os seus respectivos chefes (que também são funcionários).",
    "subject": "SQL - DQL"
  },
  {
    "id": 143,
    "descricao": "A 'replicação' de banco de dados é o processo de:",
    "alternativas": [
      "Apagar dados antigos.",
      "Manter uma cópia do banco de dados em um ou mais servidores para redundância ou distribuição de carga.",
      "Responder a uma consulta.",
      "Normalizar os dados."
    ],
    "correctAnswer": "Manter uma cópia do banco de dados em um ou mais servidores para redundância ou distribuição de carga.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 144,
    "descricao": "Qual o propósito da função `CAST()` ou `CONVERT()`?",
    "alternativas": [
      "Para converter um valor de um tipo de dado para outro.",
      "Para formatar a data.",
      "Para arredondar um número.",
      "Para criar uma cópia de uma tabela."
    ],
    "correctAnswer": "Para converter um valor de um tipo de dado para outro.",
    "subject": "SQL - DQL"
  },
  {
    "id": 145,
    "descricao": "Um banco de dados orientado a grafos, como o Neo4j, é otimizado para:",
    "alternativas": [
      "Armazenar documentos JSON.",
      "Realizar cálculos matemáticos complexos.",
      "Gerir e consultar dados com relacionamentos complexos e interconectados.",
      "Armazenar dados em cache de alta velocidade."
    ],
    "correctAnswer": "Gerir e consultar dados com relacionamentos complexos e interconectados.",
    "subject": "NoSQL"
  },
  {
    "id": 146,
    "descricao": "O que o comando `REVOKE` faz?",
    "alternativas": [
      "Concede permissões a um utilizador.",
      "Inicia uma transação.",
      "Remove permissões de um utilizador.",
      "Cria um novo utilizador."
    ],
    "correctAnswer": "Remove permissões de um utilizador.",
    "subject": "SQL - DCL"
  },
  {
    "id": 147,
    "descricao": "O que acontece se tentarmos inserir uma linha com um valor de chave primária que já existe?",
    "alternativas": [
      "A linha antiga é sobrescrita.",
      "O SGBD gera um erro de violação de restrição.",
      "O SGBD cria uma nova chave primária automaticamente.",
      "O SGBD permite a inserção."
    ],
    "correctAnswer": "O SGBD gera um erro de violação de restrição.",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 148,
    "descricao": "O que é 'data warehousing'?",
    "alternativas": [
      "O processo de fazer o backup diário de um banco de dados.",
      "Um sistema usado para relatórios e análise de dados, que agrega dados de múltiplas fontes.",
      "Um tipo de banco de dados NoSQL.",
      "O armazenamento de dados em um armazém físico."
    ],
    "correctAnswer": "Um sistema usado para relatórios e análise de dados, que agrega dados de múltiplas fontes.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 149,
    "descricao": "O que a função `UPPER()` faz com uma string de texto?",
    "alternativas": [
      "Converte a string para minúsculas.",
      "Coloca a primeira letra em maiúscula.",
      "Converte a string para maiúsculas.",
      "Inverte a string."
    ],
    "correctAnswer": "Converte a string para maiúsculas.",
    "subject": "SQL - DQL"
  },
  {
    "id": 150,
    "descricao": "O que é 'escalabilidade vertical' (scale-up)?",
    "alternativas": [
      "Adicionar mais servidores ao sistema.",
      "Adicionar mais recursos (CPU, RAM, disco) a um único servidor.",
      "Distribuir os dados por vários servidores.",
      "Aumentar o número de tabelas."
    ],
    "correctAnswer": "Adicionar mais recursos (CPU, RAM, disco) a um único servidor.",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 151,
    "descricao": "Uma tabela pode ter apenas um índice clusterizado.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Otimização"
  },
  {
    "id": 152,
    "descricao": "A cláusula `HAVING` pode ser usada sem uma cláusula `GROUP BY`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 153,
    "descricao": "Um `SELF JOIN` é um tipo especial de `INNER JOIN` ou `LEFT JOIN` onde uma tabela é juntada com ela mesma.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 154,
    "descricao": "O comando `TRUNCATE TABLE` ativa triggers de `DELETE` associados à tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DML/DDL"
  },
  {
    "id": 155,
    "descricao": "Uma Common Table Expression (CTE) definida com `WITH` pode ser referenciada em múltiplas consultas SQL independentes.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 156,
    "descricao": "A desnormalização é sempre considerada uma má prática de modelagem de dados.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 157,
    "descricao": "Um trigger pode ser configurado para ser executado `BEFORE` ou `AFTER` um evento DML.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 158,
    "descricao": "`ON DELETE SET NULL` é uma ação que, ao apagar o registo pai, define a chave estrangeira nos registos filhos como `NULL`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DDL"
  },
  {
    "id": 159,
    "descricao": "A função `COALESCE` retorna o último valor não nulo de uma lista.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 160,
    "descricao": "Um procedimento armazenado pode aceitar parâmetros de entrada e retornar parâmetros de saída.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 161,
    "descricao": "Um relacionamento Um-para-Muitos (1:N) é implementado colocando a chave primária da tabela do lado '1' como chave estrangeira na tabela do lado 'N'.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 162,
    "descricao": "Funções de janela afetam o número total de linhas retornadas pela consulta.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 163,
    "descricao": "A principal razão para usar índices é economizar espaço em disco.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 164,
    "descricao": "Uma `VIEW` não pode ser usada para juntar múltiplas tabelas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 165,
    "descricao": "Consultas parametrizadas são uma medida de segurança eficaz contra a injeção de SQL.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Segurança"
  },
  {
    "id": 166,
    "descricao": "Uma chave primária composta é uma chave primária que consiste em mais de uma coluna.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 167,
    "descricao": "Um deadlock é resolvido automaticamente pelo SGBD, geralmente escolhendo uma transação como 'vítima' e revertendo-a.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 168,
    "descricao": "A cláusula `LIMIT` é um padrão ANSI SQL e funciona em todos os SGBDs.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 169,
    "descricao": "A propriedade 'Isolamento' do ACID significa que nenhuma transação pode ser executada ao mesmo tempo que outra.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 170,
    "descricao": "Os comandos `GRANT` e `REVOKE` fazem parte da DML.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 171,
    "descricao": "Um índice não-clusterizado não altera a ordem física dos dados na tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Otimização"
  },
  {
    "id": 172,
    "descricao": "O comando `TRUNCATE` pode ser usado com uma cláusula `WHERE` para apagar linhas específicas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DML/DDL"
  },
  {
    "id": 173,
    "descricao": "Bancos de dados de documentos, como o MongoDB, armazenam dados em um formato semelhante a JSON.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "NoSQL"
  },
  {
    "id": 174,
    "descricao": "Uma tabela pode ter múltiplas chaves estrangeiras.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 175,
    "descricao": "Uma função SQL definida pelo utilizador deve sempre retornar um valor.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 176,
    "descricao": "Escalabilidade horizontal (scale-out) significa adicionar mais servidores para distribuir a carga.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 177,
    "descricao": "A cláusula `CASE` não pode ser usada dentro de uma função de agregação.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 178,
    "descricao": "A `TCL (Transaction Control Language)` inclui os comandos `COMMIT` e `ROLLBACK`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 179,
    "descricao": "Um `trigger` pode chamar um procedimento armazenado.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 180,
    "descricao": "Otimizar uma consulta significa fazê-la retornar mais dados.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 181,
    "descricao": "`SELECT` com `DISTINCT` é geralmente mais rápido do que um `SELECT` normal.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 182,
    "descricao": "A normalização até a Terceira Forma Normal (3FN) é suficiente para a maioria das aplicações.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 183,
    "descricao": "Em um relacionamento 1:N, a chave estrangeira fica na tabela do lado '1'.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 184,
    "descricao": "É possível fazer um `JOIN` entre tabelas de bancos de dados diferentes (em alguns SGBDs).",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 185,
    "descricao": "O operador `LIKE` é mais performático que o operador `=`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 186,
    "descricao": "Um `SAVEPOINT` permite reverter uma transação inteira.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 187,
    "descricao": "O Redis é um exemplo de um banco de dados em memória do tipo chave-valor.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "NoSQL"
  },
  {
    "id": 188,
    "descricao": "Uma chave estrangeira pode ter valores nulos.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 189,
    "descricao": "A função `CONCAT()` é usada para juntar duas ou mais strings.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "SQL - DQL"
  },
  {
    "id": 190,
    "descricao": "Um plano de execução de consulta é fixo e não muda, mesmo que os dados na tabela mudem.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 191,
    "descricao": "Em um relacionamento um-para-um, as duas entidades poderiam, em teoria, ser combinadas em uma única tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Modelagem de Dados"
  },
  {
    "id": 192,
    "descricao": "A cláusula `ORDER BY` é executada antes da cláusula `SELECT` na ordem lógica de processamento de uma consulta.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 193,
    "descricao": "O `OR` lógico tem maior precedência que o `AND` lógico em uma cláusula `WHERE`.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DQL"
  },
  {
    "id": 194,
    "descricao": "O `ETL (Extract, Transform, Load)` é um processo comumente usado em data warehousing.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 195,
    "descricao": "Uma `VIEW` materializada armazena fisicamente o resultado da sua consulta, ao contrário de uma `VIEW` normal.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  },
  {
    "id": 196,
    "descricao": "O `timestamp` é um tipo de dado que armazena apenas a hora, sem a data.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "SQL - DDL"
  },
  {
    "id": 197,
    "descricao": "Não é possível criar um índice em múltiplas colunas.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Otimização"
  },
  {
    "id": 198,
    "descricao": "A `integridade referencial` garante que um valor de chave estrangeira sempre aponte para uma linha existente na tabela referenciada.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Fundamentais"
  },
  {
    "id": 199,
    "descricao": "É uma boa prática usar `SELECT *` em código de produção, pois é mais flexível a mudanças na tabela.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Falso",
    "subject": "Boas Práticas"
  },
  {
    "id": 200,
    "descricao": "A 'atomicidade' e a 'durabilidade' do ACID são garantidas pelo uso de logs de transação pelo SGBD.",
    "alternativas": [ "Verdadeiro", "Falso" ],
    "correctAnswer": "Verdadeiro",
    "subject": "Conceitos Avançados"
  }

]

module.exports = {bancoDeDadosQuestions};