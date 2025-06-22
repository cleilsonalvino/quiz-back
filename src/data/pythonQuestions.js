const pythonQuestions = [
  {
    "id": "py1",
    "descricao": "Qual é a função da instrução 'def' em Python?",
    "alternativas": ["Definir uma variável", "Definir uma função", "Definir um módulo", "Definir uma classe"],
    "correctAnswer": "Definir uma função",
    "subject": "Python"
  },
  {
    "id": "py2",
    "descricao": "Qual é a saída do código: print(type([]))?",
    "alternativas": ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
    "correctAnswer": "<class 'list'>",
    "subject": "Python"
  },
  {
    "id": "py3",
    "descricao": "Como se cria uma estrutura de repetição 'enquanto' em Python?",
    "alternativas": ["while (condição) {}", "enquanto (condição):", "while (condição):", "loop (condição):"],
    "correctAnswer": "while (condição):",
    "subject": "Python"
  },
  {
    "id": "py4",
    "descricao": "O que o método append() faz em uma lista Python?",
    "alternativas": ["Remove um item", "Adiciona um item ao final", "Ordena a lista", "Substitui um item"],
    "correctAnswer": "Adiciona um item ao final",
    "subject": "Python"
  },
  {
    "id": "py5",
    "descricao": "Como se chama uma estrutura de dados que armazena pares chave-valor em Python?",
    "alternativas": ["Lista", "Tupla", "Dicionário", "Conjunto"],
    "correctAnswer": "Dicionário",
    "subject": "Python"
  },
  {
    "id": "py6",
    "descricao": "Qual é o operador usado para verificação de igualdade em Python?",
    "alternativas": ["=", "==", "!=", "==="],
    "correctAnswer": "==",
    "subject": "Python"
  },
  {
    "id": "py7",
    "descricao": "Qual é a forma correta de se importar um módulo externo chamado 'math'?",
    "alternativas": ["include math", "import math", "using math", "load math"],
    "correctAnswer": "import math",
    "subject": "Python"
  },
  {
    "id": "py8",
    "descricao": "Qual função retorna o comprimento (quantidade de itens) de uma lista?",
    "alternativas": ["length()", "count()", "size()", "len()"],
    "correctAnswer": "len()",
    "subject": "Python"
  },
  {
    "id": "py9",
    "descricao": "Qual é a saída de print(2 ** 3)?",
    "alternativas": ["6", "8", "9", "5"],
    "correctAnswer": "8",
    "subject": "Python"
  },
  {
    "id": "py10",
    "descricao": "Qual das opções representa corretamente uma tupla?",
    "alternativas": ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
    "correctAnswer": "(1, 2, 3)",
    "subject": "Python"
  },
  {
    "id": "py11",
    "descricao": "Qual é a saída do código: print(3 * 1 ** 3)?",
    "alternativas": ["3", "27", "9", "1"],
    "correctAnswer": "3",
    "subject": "Python"
  },
  {
    "id": "py12",
    "descricao": "Como você cria uma tupla vazia em Python?",
    "alternativas": ["()", "[]", "{}", "tuple()"],
    "correctAnswer": "()",
    "subject": "Python"
  },
  {
    "id": "py13",
    "descricao": "Qual é o método para adicionar um item a um conjunto (set) em Python?",
    "alternativas": ["add()", "append()", "insert()", "push()"],
    "correctAnswer": "add()",
    "subject": "Python"
  },
  {
    "id": "py14",
    "descricao": "Qual é a saída do código: print('Python'.lower())?",
    "alternativas": ["PYTHON", "python", "Python", "Erro"],
    "correctAnswer": "python",
    "subject": "Python"
  },
  {
    "id": "py15",
    "descricao": "Como você verifica o tipo de uma variável em Python?",
    "alternativas": ["type()", "typeof()", "check()", "isinstance()"],
    "correctAnswer": "type()",
    "subject": "Python"
  },
  {
    "id": "py16",
    "descricao": "Qual é a função para obter o comprimento de uma lista em Python?",
    "alternativas": ["size()", "len()", "count()", "length()"],
    "correctAnswer": "len()",
    "subject": "Python"
  },
  {
    "id": "py17",
    "descricao": "Qual é o operador para potência em Python?",
    "alternativas": ["^", "**", "exp()", "pow()"],
    "correctAnswer": "**",
    "subject": "Python"
  },
  {
    "id": "py18",
    "descricao": "Qual é a saída do código: print(3 // 2)?",
    "alternativas": ["1", "1.5", "2", "Erro"],
    "correctAnswer": "1",
    "subject": "Python"
  },
  {
    "id": "py19",
    "descricao": "Qual é o método para remover um item de uma lista em Python?",
    "alternativas": ["remove()", "pop()", "delete()", "clear()"],
    "correctAnswer": "remove()",
    "subject": "Python"
  },
  {
    "id": "py20",
    "descricao": "Como você cria um dicionário vazio em Python?",
    "alternativas": ["{}", "[]", "()", "dict()"],
    "correctAnswer": "{}",
    "subject": "Python"
  },
  {
    "id": "py21",
    "descricao": "O que é uma compreensão de lista (list comprehension) em Python?",
    "alternativas": [
      "Uma forma de criar listas usando loops for e condicionais.",
      "Uma função que retorna uma lista de todos os elementos de um iterável.",
      "Uma estrutura de dados que armazena pares chave-valor.",
      "Uma função que ordena uma lista em ordem crescente."
    ],
    "correctAnswer": "Uma forma de criar listas usando loops for e condicionais.",
    "subject": "Python"
  },
  {
    "id": "py22",
    "descricao": "Qual é a sintaxe correta para criar uma compreensão de lista que retorna os quadrados dos números de 1 a 5?",
    "alternativas": [
      "[x**2 for x in range(1, 6)]",
      "[x^2 for x in range(1, 6)]",
      "{x**2 for x in range(1, 6)}",
      "(x**2 for x in range(1, 6))"
    ],
    "correctAnswer": "[x**2 for x in range(1, 6)]",
    "subject": "Python"
  },
  {
    "id": "py23",
    "descricao": "Como você pode filtrar os números ímpares de uma lista usando compreensão de lista?",
    "alternativas": [
      "[x for x in lista if x % 2 != 0]",
      "[x for x in lista if x % 2 == 0]",
      "[x for x in lista if x % 2 == 1]",
      "[x for x in lista if x % 2]"
    ],
    "correctAnswer": "[x for x in lista if x % 2 != 0]",
    "subject": "Python"
  },
  {
    "id": "py24",
    "descricao": "O que é uma função lambda em Python?",
    "alternativas": [
      "Uma função anônima definida com a palavra-chave 'lambda'.",
      "Uma função que retorna outra função.",
      "Uma função que pode ter múltiplas expressões.",
      "Uma função que não retorna valor."
    ],
    "correctAnswer": "Uma função anônima definida com a palavra-chave 'lambda'.",
    "subject": "Python"
  },
  {
    "id": "py25",
    "descricao": "Qual é a sintaxe correta para criar uma função lambda que retorna o quadrado de um número?",
    "alternativas": [
      "lambda x: x**2",
      "lambda x: return x**2",
      "def lambda x: x**2",
      "lambda x: x^2"
    ],
    "correctAnswer": "lambda x: x**2",
    "subject": "Python"
  },
  {
    "id": "py26",
    "descricao": "Como você pode usar uma função lambda com a função 'map' para dobrar todos os números em uma lista?",
    "alternativas": [
      "map(lambda x: x*2, lista)",
      "map(lambda x: x+2, lista)",
      "map(lambda x: x/2, lista)",
      "map(lambda x: x-2, lista)"
    ],
    "correctAnswer": "map(lambda x: x*2, lista)",
    "subject": "Python"
  },
  {
    "id": "py27",
    "descricao": "Qual é a saída do código: print((lambda x: x + 5)(10))?",
    "alternativas": [
      "15",
      "10",
      "5",
      "Erro de sintaxe"
    ],
    "correctAnswer": "15",
    "subject": "Python"
  },
  {
    "id": "py28",
    "descricao": "Como você pode usar uma função lambda com a função 'filter' para obter todos os números pares de uma lista?",
    "alternativas": [
      "filter(lambda x: x % 2 == 0, lista)",
      "filter(lambda x: x % 2 != 0, lista)",
      "filter(lambda x: x % 2 == 1, lista)",
      "filter(lambda x: x % 2, lista)"
    ],
    "correctAnswer": "filter(lambda x: x % 2 == 0, lista)",
    "subject": "Python"
  },
  {
    "id": "py29",
    "descricao": "Qual é a função usada para ordenar uma lista em ordem crescente em Python?",
    "alternativas": [
      "sort()",
      "order()",
      "arrange()",
      "sorted()"
    ],
    "correctAnswer": "sort()",
    "subject": "Python"
  },
  {
    "id": "py30",
    "descricao": "Como você pode inverter uma lista em Python?",
    "alternativas": [
      "lista.reverse()",
      "reverse(lista)",
      "invert(lista)",
      "lista.invert()"
    ],
    "correctAnswer": "lista.reverse()",
    "subject": "Python"
  },
  {
    "id": "py31",
    "descricao": "Qual é a saída do código: print(3 * 2 == 6)?",
    "alternativas": [
      "True",
      "False",
      "Erro de sintaxe",
      "Nenhuma das anteriores"
    ],
    "correctAnswer": "True",
    "subject": "Python"
  },
  {
    "id": "py32",
    "descricao": "Como se chama uma estrutura de dados que armazena pares chave-valor em Python?",
    "alternativas": [
      "Lista",
      "Tupla",
      "Dicionário",
      "Conjunto"
    ],
    "correctAnswer": "Dicionário",
    "subject": "Python"
  },
  {
    "id": "py33",
    "descricao": "Qual é a função do método `pop()` em uma lista Python?",
    "alternativas": [
      "Adicionar um item ao final",
      "Remover e retornar o último item",
      "Ordenar a lista",
      "Substituir um item"
    ],
    "correctAnswer": "Remover e retornar o último item",
    "subject": "Python"
  },
  {
    "id": "py34",
    "descricao": "Qual é a sintaxe correta para definir uma função em Python?",
    "alternativas": [
      "def minha_funcao():",
      "function minha_funcao():",
      "def minha_funcao;",
      "minha_funcao() =>"
    ],
    "correctAnswer": "def minha_funcao():",
    "subject": "Python"
  },
  {
    "id": "py35",
    "descricao": "Qual é a saída do código: print('Python'[::-1])?",
    "alternativas": [
      "nohtyP",
      "Python",
      "Erro de sintaxe",
      "Nenhuma das anteriores"
    ],
    "correctAnswer": "nohtyP",
    "subject": "Python"
  },
  {
    "id": "py36",
    "descricao": "Como se cria uma tupla em Python?",
    "alternativas": [
      "tupla = (1, 2, 3)",
      "tupla = [1, 2, 3]",
      "tupla = {1, 2, 3}",
      "tupla = <1, 2, 3>"
    ],
    "correctAnswer": "tupla = (1, 2, 3)",
    "subject": "Python"
  },
  {
    "id": "py37",
    "descricao": "Qual é a função do método `strip()` em uma string Python?",
    "alternativas": [
      "Remover espaços em branco no início e no final",
      "Converter todos os caracteres para minúsculas",
      "Substituir caracteres específicos",
      "Dividir a string em uma lista"
    ],
    "correctAnswer": "Remover espaços em branco no início e no final",
    "subject": "Python"
  },
  {
    "id": "py38",
    "descricao": "Qual é a saída do código: print(5 / 2)?",
    "alternativas": [
      "2.5",
      "2",
      "Erro de sintaxe",
      "Nenhuma das anteriores"
    ],
    "correctAnswer": "2.5",
    "subject": "Python"
  },
  {
    "id": "py39",
    "descricao": "Como se chama uma estrutura de dados que armazena elementos únicos e não ordenados em Python?",
    "alternativas": [
      "Lista",
      "Tupla",
      "Dicionário",
      "Conjunto"
    ],
    "correctAnswer": "Conjunto",
    "subject": "Python"
  },
  {
    "id": "py40",
    "descricao": "Qual é a função do método `lower()` em uma string Python?",
    "alternativas": [
      "Converter todos os caracteres para maiúsculas",
      "Converter todos os caracteres para minúsculas",
      "Remover espaços em branco",
      "Substituir caracteres específicos"
    ],
    "correctAnswer": "Converter todos os caracteres para minúsculas",
    "subject": "Python"
  },
  {
    "id": "py42",
    "descricao": "Qual é a função do método 'join()' em Python?",
    "alternativas": [
      "Unir elementos de uma lista em uma string",
      "Dividir uma string em uma lista",
      "Ordenar uma lista",
      "Adicionar um elemento no final de uma lista"
    ],
    "correctAnswer": "Unir elementos de uma lista em uma string",
    "subject": "Python"
  },
  {
    "id": "py43",
    "descricao": "Como se cria um dicionário em Python?",
    "alternativas": [
      "d = {}",
      "d = []",
      "d = ()",
      "d = set()"
    ],
    "correctAnswer": "d = {}",
    "subject": "Python"
  },
  {
    "id": "py44",
    "descricao": "Qual é a saída de 'print(3 * 'ab')'?",
    "alternativas": [
      "ababab",
      "ab3",
      "a3b",
      "ab"
    ],
    "correctAnswer": "ababab",
    "subject": "Python"
  },
  {
    "id": "py45",
    "descricao": "Como se verifica se uma chave existe em um dicionário em Python?",
    "alternativas": [
      "if chave in dicionario:",
      "if dicionario.contains(chave):",
      "if chave.exists():",
      "if chave in dicionario.keys():"
    ],
    "correctAnswer": "if chave in dicionario:",
    "subject": "Python"
  },
  {
    "id": "py46",
    "descricao": "Qual é a função do método 'pop()' em uma lista Python?",
    "alternativas": [
      "Adicionar um item no final",
      "Remover e retornar o último item",
      "Ordenar a lista",
      "Remover todos os itens"
    ],
    "correctAnswer": "Remover e retornar o último item",
    "subject": "Python"
  },
  {
    "id": "py47",
    "descricao": "Como se cria uma tupla em Python?",
    "alternativas": [
      "t = ()",
      "t = []",
      "t = {}",
      "t = set()"
    ],
    "correctAnswer": "t = ()",
    "subject": "Python"
  },
  {
    "id": "py48",
    "descricao": "Qual é a saída de 'print(len([1, 2, 3]))'?",
    "alternativas": [
      "3",
      "2",
      "1",
      "erro"
    ],
    "correctAnswer": "3",
    "subject": "Python"
  },
  {
    "id": "py49",
    "descricao": "Como se cria uma classe em Python?",
    "alternativas": [
      "class MinhaClasse:",
      "def MinhaClasse():",
      "class MinhaClasse[]:",
      "class MinhaClasse()"
    ],
    "correctAnswer": "class MinhaClasse:",
    "subject": "Python"
  },
  {
    "id": "py50",
    "descricao": "Qual é a saída de 'print(2 + 3 * 4)'?",
    "alternativas": [
      "14",
      "20",
      "12",
      "11"
    ],
    "correctAnswer": "14",
    "subject": "Python"
  },
  {
    "id": "py51",
    "descricao": "Como se faz um comentário de uma linha em Python?",
    "alternativas": [
      "# Este é um comentário",
      "// Este é um comentário",
      "/* Este é um comentário */",
      "<!-- Este é um comentário -->"
    ],
    "correctAnswer": "# Este é um comentário",
    "subject": "Python"
  },
  
];

module.exports = {pythonQuestions};