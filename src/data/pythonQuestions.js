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
  {
    "id": "py52",
    "descricao": "Qual é a função da palavra-chave 'pass' em Python?",
    "alternativas": ["Sair de um loop", "É um espaço reservado que não faz nada", "Gerar um erro", "Pular a próxima iteração do loop"],
    "correctAnswer": "É um espaço reservado que não faz nada",
    "subject": "Python"
  },
  {
    "id": "py53",
    "descricao": "Qual método retorna uma visão de todas as chaves em um dicionário?",
    "alternativas": ["get_keys()", "keys()", "values()", "items()"],
    "correctAnswer": "keys()",
    "subject": "Python"
  },
  {
    "id": "py54",
    "descricao": "Qual é o propósito do método '__init__()' em uma classe Python?",
    "alternativas": ["Para destruir uma instância de objeto", "Para inicializar o estado de uma nova instância de objeto", "Para criar um método estático", "Para definir o nome da classe"],
    "correctAnswer": "Para inicializar o estado de uma nova instância de objeto",
    "subject": "Python"
  },
  {
    "id": "py55",
    "descricao": "Qual é a principal diferença entre uma lista e uma tupla?",
    "alternativas": ["Listas são imutáveis, tuplas são mutáveis", "Tuplas são imutáveis, listas são mutáveis", "Não há diferença", "Tuplas só podem conter números"],
    "correctAnswer": "Tuplas são imutáveis, listas são mutáveis",
    "subject": "Python"
  },
  {
    "id": "py56",
    "descricao": "Qual modo é usado na função 'open()' para abrir um arquivo para escrita, sobrescrevendo o conteúdo existente?",
    "alternativas": ["'r'", "'a'", "'w'", "'x'"],
    "correctAnswer": "'w'",
    "subject": "Python"
  },
  {
    "id": "py57",
    "descricao": "O que é um 'decorator' (decorador) em Python?",
    "alternativas": ["Um tipo de comentário", "Uma função que modifica ou estende o comportamento de outra função sem alterá-la permanentemente", "Uma variável global", "Um método de classe especial"],
    "correctAnswer": "Uma função que modifica ou estende o comportamento de outra função sem alterá-la permanentemente",
    "subject": "Python"
  },
  {
    "id": "py58",
    "descricao": "O que a palavra-chave 'yield' faz em uma função Python?",
    "alternativas": ["Retorna um valor e encerra a função", "Transforma a função em um gerador (generator), pausando a execução e retornando um valor", "Cria um loop infinito", "Gera uma exceção"],
    "correctAnswer": "Transforma a função em um gerador (generator), pausando a execução e retornando um valor",
    "subject": "Python"
  },
  {
    "id": "py59",
    "descricao": "Qual bloco de código é usado para capturar e tratar exceções em Python?",
    "alternativas": ["if...else", "for...in", "switch...case", "try...except"],
    "correctAnswer": "try...except",
    "subject": "Python"
  },
  {
    "id": "py60",
    "descricao": "Qual é o propósito da verificação 'if __name__ == \"__main__\":'?",
    "alternativas": ["Para verificar o nome do autor do script", "Para permitir que o código no bloco seja executado apenas quando o arquivo é executado diretamente, e não quando é importado", "Para definir a função principal do programa", "É obrigatório em todos os scripts Python"],
    "correctAnswer": "Para permitir que o código no bloco seja executado apenas quando o arquivo é executado diretamente, e não quando é importado",
    "subject": "Python"
  },
  {
    "id": "py61",
    "descricao": "Qual método de string é usado para formatar strings, inserindo valores em espaços reservados?",
    "alternativas": ["format()", "concat()", "join()", "insert()"],
    "correctAnswer": "format()",
    "subject": "Python"
  },
  {
    "id": "py62",
    "descricao": "O que o operador '%' faz com strings?",
    "alternativas": ["Calcula o resto da divisão", "Realiza a formatação de strings (estilo antigo)", "Compara duas strings", "Não tem função com strings"],
    "correctAnswer": "Realiza a formatação de strings (estilo antigo)",
    "subject": "Python"
  },
  {
    "id": "py63",
    "descricao": "Qual das seguintes opções cria um conjunto (set) de forma correta?",
    "alternativas": ["`{1, 2, 2, 3}`", "`[1, 2, 3]`", "`(1, 2, 3)`", "`{'a':1, 'b':2}`"],
    "correctAnswer": "`{1, 2, 2, 3}`",
    "subject": "Python"
  },
  {
    "id": "py64",
    "descricao": "Qual será o conteúdo do conjunto criado com `{10, 20, 30, 20}`?",
    "alternativas": ["`{10, 20, 30, 20}`", "`{10, 20, 30}`", "`[10, 20, 30]`", "Um erro será gerado"],
    "correctAnswer": "`{10, 20, 30}`",
    "subject": "Python"
  },
  {
    "id": "py65",
    "descricao": "Como se acessa o valor associado à chave 'nome' em um dicionário 'd'?",
    "alternativas": ["`d.nome`", "`d('nome')`", "`d['nome']`", "`d.get_value('nome')`"],
    "correctAnswer": "`d['nome']`",
    "subject": "Python"
  },
  {
    "id": "py66",
    "descricao": "Qual é a principal característica das tuplas?",
    "alternativas": ["São mutáveis", "São imutáveis", "Só podem conter strings", "Não podem ser aninhadas"],
    "correctAnswer": "São imutáveis",
    "subject": "Python"
  },
  {
    "id": "py67",
    "descricao": "Qual função é usada para converter um objeto em uma string?",
    "alternativas": ["`string()`", "`str()`", "`convertToString()`", "`cast_string()`"],
    "correctAnswer": "`str()`",
    "subject": "Python"
  },
  {
    "id": "py68",
    "descricao": "Qual o resultado de `bool(0)`?",
    "alternativas": ["`True`", "`False`", "`0`", "`None`"],
    "correctAnswer": "`False`",
    "subject": "Python"
  },
  {
    "id": "py69",
    "descricao": "Qual o resultado de `bool([])` onde `[]` é uma lista vazia?",
    "alternativas": ["`True`", "`False`", "`[]`", "Um erro será gerado"],
    "correctAnswer": "`False`",
    "subject": "Python"
  },
  {
    "id": "py70",
    "descricao": "Em POO, o que é 'herança'?",
    "alternativas": ["A capacidade de uma classe herdar atributos e métodos de outra classe", "A criação de múltiplas instâncias de uma classe", "A ocultação de detalhes de implementação", "A capacidade de um objeto ter múltiplas formas"],
    "correctAnswer": "A capacidade de uma classe herdar atributos e métodos de outra classe",
    "subject": "Python"
  },
  {
    "id": "py71",
    "descricao": "Qual é a sintaxe correta para uma classe 'Filha' herdar da classe 'Pai'?",
    "alternativas": ["`class Filha extends Pai:`", "`class Filha(Pai):`", "`class Filha inherits Pai:`", "`class Filha from Pai:`"],
    "correctAnswer": "`class Filha(Pai):`",
    "subject": "Python"
  },
  {
    "id": "py72",
    "descricao": "O que o método `popitem()` faz em um dicionário?",
    "alternativas": ["Remove e retorna um par `(chave, valor)` arbitrário (em versões antigas) ou o último inserido (em versões recentes)", "Remove o primeiro item", "Adiciona um item", "Retorna todas as chaves"],
    "correctAnswer": "Remove e retorna um par `(chave, valor)` arbitrário (em versões antigas) ou o último inserido (em versões recentes)",
    "subject": "Python"
  },
  {
    "id": "py73",
    "descricao": "Qual o resultado do operador `in` na expressão `'a' in 'banana'`?",
    "alternativas": ["`True`", "`False`", "`1`", "Um erro será gerado"],
    "correctAnswer": "`True`",
    "subject": "Python"
  },
  {
    "id": "py74",
    "descricao": "Qual função é usada para obter a entrada do usuário no console?",
    "alternativas": ["`get_input()`", "`read()`", "`console.input()`", "`input()`"],
    "correctAnswer": "`input()`",
    "subject": "Python"
  },
  {
    "id": "py75",
    "descricao": "O que a função `range(5)` gera?",
    "alternativas": ["`[1, 2, 3, 4, 5]`", "Um objeto que representa a sequência de números de 0 a 4", "`[0, 1, 2, 3, 4, 5]`", "Um erro"],
    "correctAnswer": "Um objeto que representa a sequência de números de 0 a 4",
    "subject": "Python"
  },
  {
    "id": "py76",
    "descricao": "Qual método de string divide a string em uma lista de substrings com base em um separador?",
    "alternativas": ["`join()`", "`split()`", "`slice()`", "`separate()`"],
    "correctAnswer": "`split()`",
    "subject": "Python"
  },
  {
    "id": "py77",
    "descricao": "Qual é a função do primeiro parâmetro (convencionalmente chamado de 'self') em um método de instância de uma classe?",
    "alternativas": ["É opcional", "Refere-se à própria classe", "Refere-se à instância do objeto que está chamando o método", "É usado para herança"],
    "correctAnswer": "Refere-se à instância do objeto que está chamando o método",
    "subject": "Python"
  },
  {
    "id": "py78",
    "descricao": "Qual das seguintes opções é uma f-string (string literal formatada)?",
    "alternativas": ["`'Olá, {nome}'`", "`f'Olá, {nome}'`", "`format('Olá, {nome}')`", "`'Olá, %s' % nome`"],
    "correctAnswer": "`f'Olá, {nome}'`",
    "subject": "Python"
  },
  {
    "id": "py79",
    "descricao": "O que o bloco 'finally' em uma estrutura 'try...except' faz?",
    "alternativas": ["É executado apenas se ocorrer uma exceção", "É executado apenas se não ocorrer uma exceção", "É sempre executado, independentemente de ter ocorrido uma exceção ou não", "É um sinônimo para 'else'"],
    "correctAnswer": "É sempre executado, independentemente de ter ocorrido uma exceção ou não",
    "subject": "Python"
  },
  {
    "id": "py80",
    "descricao": "Qual palavra-chave é usada para levantar (lançar) uma exceção manualmente?",
    "alternativas": ["`throw`", "`raise`", "`exception`", "`error`"],
    "correctAnswer": "`raise`",
    "subject": "Python"
  },
  {
    "id": "py81",
    "descricao": "O que é 'duck typing' em Python?",
    "alternativas": ["Um tipo de dado para patos", "Um estilo de tipagem onde o tipo ou a classe de um objeto é menos importante do que os métodos que ele define", "Uma biblioteca para testes", "Uma forma de nomear variáveis"],
    "correctAnswer": "Um estilo de tipagem onde o tipo ou a classe de um objeto é menos importante do que os métodos que ele define",
    "subject": "Python"
  },
  {
    "id": "py82",
    "descricao": "Qual o valor de `None` em Python?",
    "alternativas": ["Representa o valor zero", "É um objeto especial que representa a ausência de valor", "É o mesmo que `False`", "É uma string vazia"],
    "correctAnswer": "É um objeto especial que representa a ausência de valor",
    "subject": "Python"
  },
  {
    "id": "py83",
    "descricao": "Como você pode iterar sobre as chaves e os valores de um dicionário 'd' simultaneamente?",
    "alternativas": ["`for k, v in d.items():`", "`for k, v in d:`", "`for k in d.keys(): v = d[k]`", "A e C estão corretas"],
    "correctAnswer": "A e C estão corretas",
    "subject": "Python"
  },
  {
    "id": "py84",
    "descricao": "O que `*args` em uma definição de função permite?",
    "alternativas": ["Passar um número fixo de argumentos", "Passar um número variável de argumentos posicionais, que serão coletados em uma tupla", "Passar argumentos nomeados", "Definir o tipo dos argumentos"],
    "correctAnswer": "Passar um número variável de argumentos posicionais, que serão coletados em uma tupla",
    "subject": "Python"
  },
  {
    "id": "py85",
    "descricao": "O que `**kwargs` em uma definição de função permite?",
    "alternativas": ["Passar argumentos posicionais", "Passar um número variável de argumentos de palavra-chave (nomeados), que serão coletados em um dicionário", "Exigir que todos os argumentos sejam nomeados", "Limitar o número de argumentos"],
    "correctAnswer": "Passar um número variável de argumentos de palavra-chave (nomeados), que serão coletados em um dicionário",
    "subject": "Python"
  },
  {
    "id": "py86",
    "descricao": "Qual é a principal biblioteca em Python para computação científica e manipulação de arrays multidimensionais?",
    "alternativas": ["Pandas", "Matplotlib", "SciPy", "NumPy"],
    "correctAnswer": "NumPy",
    "subject": "Python"
  },
  {
    "id": "py87",
    "descricao": "Qual biblioteca é comumente usada para análise e manipulação de dados, famosa por sua estrutura de dados 'DataFrame'?",
    "alternativas": ["NumPy", "TensorFlow", "Pandas", "Requests"],
    "correctAnswer": "Pandas",
    "subject": "Python"
  },
  {
    "id": "py88",
    "descricao": "O que o método `get()` faz em um dicionário, por exemplo, `d.get('chave', 'padrao')`?",
    "alternativas": ["Retorna o valor para 'chave' se ela existir, caso contrário, retorna um erro", "Retorna o valor para 'chave' se ela existir, caso contrário, retorna 'padrao'", "Sempre retorna 'padrao'", "Verifica se 'chave' existe e retorna `True` ou `False`"],
    "correctAnswer": "Retorna o valor para 'chave' se ela existir, caso contrário, retorna 'padrao'",
    "subject": "Python"
  },
  {
    "id": "py89",
    "descricao": "Como se cria um comentário de múltiplas linhas (docstring) em Python?",
    "alternativas": ["`/* ... */`", "`# ... #`", "`''' ... '''` ou `\"\"\" ... \"\"\"`", "``"],
    "correctAnswer": "`''' ... '''` ou `\"\"\" ... \"\"\"`",
    "subject": "Python"
  },
  {
    "id": "py90",
    "descricao": "Qual operador é usado para a divisão inteira (que descarta a parte fracionária)?",
    "alternativas": ["`/`", "`%`", "`//`", "`div`"],
    "correctAnswer": "`//`",
    "subject": "Python"
  },
  {
    "id": "py91",
    "descricao": "Qual o resultado de `10 % 3`?",
    "alternativas": ["`3`", "`3.33`", "`1`", "`0`"],
    "correctAnswer": "`1`",
    "subject": "Python"
  },
  {
    "id": "py92",
    "descricao": "Qual das seguintes estruturas de dados é mutável?",
    "alternativas": ["`str` (string)", "`tuple` (tupla)", "`int` (inteiro)", "`list` (lista)"],
    "correctAnswer": "`list` (lista)",
    "subject": "Python"
  },
  {
    "id": "py93",
    "descricao": "Qual das seguintes estruturas de dados é ordenada (mantém a ordem de inserção)?",
    "alternativas": ["`set` (conjunto) antes do Python 3.7", "`dict` (dicionário) antes do Python 3.7", "`list` (lista)", "`frozenset`"],
    "correctAnswer": "`list` (lista)",
    "subject": "Python"
  },
  {
    "id": "py94",
    "descricao": "O que o `is` compara?",
    "alternativas": ["Compara se dois valores são iguais", "Compara se duas variáveis referenciam o mesmo objeto na memória", "Compara os tipos de duas variáveis", "É um sinônimo para `==`"],
    "correctAnswer": "Compara se duas variáveis referenciam o mesmo objeto na memória",
    "subject": "Python"
  },
  {
    "id": "py95",
    "descricao": "Qual o resultado de `a = [1, 2]; b = a; a is b`?",
    "alternativas": ["`True`", "`False`", "Depende do conteúdo", "Um erro"],
    "correctAnswer": "`True`",
    "subject": "Python"
  },
  {
    "id": "py96",
    "descricao": "Qual o resultado de `a = [1, 2]; b = [1, 2]; a is b`?",
    "alternativas": ["`True`", "`False`", "Depende do sistema", "Um erro"],
    "correctAnswer": "`False`",
    "subject": "Python"
  },
  {
    "id": "py97",
    "descricao": "O que o `slice` `[1:4]` faz em uma lista `L`?",
    "alternativas": ["Retorna os elementos dos índices 1, 2, 3 e 4", "Retorna os elementos dos índices 1, 2 e 3", "Retorna os 4 primeiros elementos", "Retorna os elementos a partir do índice 1"],
    "correctAnswer": "Retorna os elementos dos índices 1, 2 e 3",
    "subject": "Python"
  },
  {
    "id": "py98",
    "descricao": "Como você importa apenas a função `sqrt` do módulo `math`?",
    "alternativas": ["`import math.sqrt`", "`from math import sqrt`", "`import sqrt from math`", "`using math.sqrt`"],
    "correctAnswer": "`from math import sqrt`",
    "subject": "Python"
  },
  {
    "id": "py99",
    "descricao": "O que é o `pip` no ecossistema Python?",
    "alternativas": ["A biblioteca padrão do Python", "Um interpretador Python alternativo", "O gerenciador de pacotes padrão para instalar e gerenciar bibliotecas", "Uma ferramenta de formatação de código"],
    "correctAnswer": "O gerenciador de pacotes padrão para instalar e gerenciar bibliotecas",
    "subject": "Python"
  },
  {
    "id": "py100",
    "descricao": "O que é um 'ambiente virtual' (virtual environment) em Python?",
    "alternativas": ["Um sistema operacional dentro do Python", "Uma ferramenta para isolar projetos Python e suas dependências, evitando conflitos", "Uma simulação de hardware", "Um tipo de IDE online"],
    "correctAnswer": "Uma ferramenta para isolar projetos Python e suas dependências, evitando conflitos",
    "subject": "Python"
  },
  {
    "id": "py101",
    "descricao": "Qual o comando para criar um ambiente virtual chamado 'venv'?",
    "alternativas": ["`python -m venv venv`", "`virtualenv create venv`", "`python new venv`", "`pip venv create`"],
    "correctAnswer": "`python -m venv venv`",
    "subject": "Python"
  },
  {
    "id": "py102",
    "descricao": "Em POO, o que é 'encapsulamento'?",
    "alternativas": ["Agrupar dados (atributos) e os métodos que operam nesses dados em uma única unidade (classe), e restringir o acesso direto a alguns dos componentes do objeto", "Permitir que uma classe herde de múltiplas classes", "A capacidade de uma função ter múltiplos comportamentos", "Converter um objeto para outro tipo"],
    "correctAnswer": "Agrupar dados (atributos) e os métodos que operam nesses dados em uma única unidade (classe), e restringir o acesso direto a alguns dos componentes do objeto",
    "subject": "Python"
  },
  {
    "id": "py103",
    "descricao": "Como, por convenção, um atributo é marcado como 'privado' ou 'protegido' em Python?",
    "alternativas": ["Usando a palavra-chave `private`", "Colocando um ou dois underscores `_` ou `__` antes do nome do atributo", "Colocando o nome em maiúsculas", "Não é possível ter atributos privados"],
    "correctAnswer": "Colocando um ou dois underscores `_` ou `__` antes do nome do atributo",
    "subject": "Python"
  },
  {
    "id": "py104",
    "descricao": "O que o método `sorted(iteravel)` faz?",
    "alternativas": ["Ordena o iterável no local (in-place)", "Retorna uma nova lista contendo todos os itens do iterável em ordem crescente", "Verifica se o iterável está ordenado", "Retorna um erro se o iterável não for uma lista"],
    "correctAnswer": "Retorna uma nova lista contendo todos os itens do iterável em ordem crescente",
    "subject": "Python"
  },
  {
    "id": "py105",
    "descricao": "Qual a diferença entre o método `.sort()` e a função `sorted()`?",
    "alternativas": ["Não há diferença", "`.sort()` modifica a lista original, `sorted()` retorna uma nova lista ordenada", "`sorted()` é mais rápido", "`.sort()` só funciona com números"],
    "correctAnswer": "`.sort()` modifica a lista original, `sorted()` retorna uma nova lista ordenada",
    "subject": "Python"
  },
  {
    "id": "py106",
    "descricao": "O que o 'context manager' (gerenciador de contexto), usado com a instrução `with`, garante?",
    "alternativas": ["Que o código seja executado mais rapidamente", "Que certos recursos (como arquivos) sejam configurados e liberados corretamente, mesmo se ocorrerem erros", "Que o código seja executado de forma assíncrona", "Que o acesso a variáveis globais seja seguro"],
    "correctAnswer": "Que certos recursos (como arquivos) sejam configurados e liberados corretamente, mesmo se ocorrerem erros",
    "subject": "Python"
  },
  {
    "id": "py107",
    "descricao": "Qual é a forma idiomática de abrir e ler um arquivo em Python?",
    "alternativas": ["`f = open('f.txt'); data = f.read(); f.close()`", "`with open('f.txt', 'r') as f: data = f.read()`", "`data = read_file('f.txt')`", "`try: f=open('f.txt'); data=f.read() finally: pass`"],
    "correctAnswer": "`with open('f.txt', 'r') as f: data = f.read()`",
    "subject": "Python"
  },
  {
    "id": "py108",
    "descricao": "Qual método lê uma única linha de um arquivo, incluindo o caractere de nova linha?",
    "alternativas": ["`.read()`", "`.readline()`", "`.readlines()`", "`.get_line()`"],
    "correctAnswer": "`.readline()`",
    "subject": "Python"
  },
  {
    "id": "py109",
    "descricao": "Qual método lê todas as linhas de um arquivo e as retorna como uma lista de strings?",
    "alternativas": ["`.read()`", "`.readline()`", "`.readlines()`", "`.read_all()`"],
    "correctAnswer": "`.readlines()`",
    "subject": "Python"
  },
  {
    "id": "py110",
    "descricao": "Qual biblioteca é comumente usada para fazer requisições HTTP em Python?",
    "alternativas": ["`http_lib`", "`urllib`", "`requests`", "`web`"],
    "correctAnswer": "`requests`",
    "subject": "Python"
  },
  {
    "id": "py111",
    "descricao": "Qual o propósito do módulo `os`?",
    "alternativas": ["Realizar operações matemáticas", "Interagir com o sistema operacional (manipular arquivos, diretórios, etc.)", "Criar interfaces gráficas", "Trabalhar com data e hora"],
    "correctAnswer": "Interagir com o sistema operacional (manipular arquivos, diretórios, etc.)",
    "subject": "Python"
  },
  {
    "id": "py112",
    "descricao": "Qual o propósito do módulo `datetime`?",
    "alternativas": ["Para pausar a execução do programa", "Para trabalhar com datas e horas", "Para agendar tarefas", "Para medir o tempo de execução do código"],
    "correctAnswer": "Para trabalhar com datas e horas",
    "subject": "Python"
  },
  {
    "id": "py113",
    "descricao": "Qual método de string verifica se todos os caracteres na string são alfabéticos?",
    "alternativas": ["`.isdigit()`", "`.isalpha()`", "`.isalnum()`", "`.isspace()`"],
    "correctAnswer": "`.isalpha()`",
    "subject": "Python"
  },
  {
    "id": "py114",
    "descricao": "Qual método de string verifica se todos os caracteres na string são numéricos?",
    "alternativas": ["`.isdigit()`", "`.isalpha()`", "`.isalnum()`", "`.isnumeric()`"],
    "correctAnswer": "`.isdigit()`",
    "subject": "Python"
  },
  {
    "id": "py115",
    "descricao": "O que `isinstance(obj, classe)` verifica?",
    "alternativas": ["Se `obj` é exatamente do tipo `classe`", "Se `obj` é uma instância de `classe` ou de uma subclasse de `classe`", "Se `obj` tem os mesmos métodos de `classe`", "Compara os IDs de `obj` e `classe`"],
    "correctAnswer": "Se `obj` é uma instância de `classe` ou de uma subclasse de `classe`",
    "subject": "Python"
  },
  {
    "id": "py116",
    "descricao": "Qual a diferença entre uma cópia rasa (`copy.copy()`) e uma cópia profunda (`copy.deepcopy()`)?",
    "alternativas": ["Não há diferença", "A cópia profunda cria um novo objeto e insere recursivamente cópias dos objetos encontrados no original; a cópia rasa cria um novo objeto e insere referências aos objetos encontrados no original", "A cópia rasa é mais rápida, mas menos segura", "B e C estão corretas"],
    "correctAnswer": "B e C estão corretas",
    "subject": "Python"
  },
  {
    "id": "py117",
    "descricao": "O que o 'walrus operator' `:=` (operador morsa), introduzido no Python 3.8, permite?",
    "alternativas": ["Comparar e atribuir valores", "Atribuir um valor a uma variável como parte de uma expressão maior", "Criar um novo tipo de variável", "Substituir o operador `=`"],
    "correctAnswer": "Atribuir um valor a uma variável como parte de uma expressão maior",
    "subject": "Python"
  },
  {
    "id": "py118",
    "descricao": "Qual a principal característica de um `frozenset`?",
    "alternativas": ["É um conjunto que pode conter outros conjuntos", "É uma versão imutável de um `set`", "É um conjunto que só pode conter números", "É um conjunto ordenado"],
    "correctAnswer": "É uma versão imutável de um `set`",
    "subject": "Python"
  },
  {
    "id": "py119",
    "descricao": "Como você remove o último item de uma lista e o armazena em uma variável `x`?",
    "alternativas": ["`x = lista.remove_last()`", "`x = lista[-1]; del lista[-1]`", "`x = lista.pop()`", "B e C estão corretas"],
    "correctAnswer": "B e C estão corretas",
    "subject": "Python"
  },
  {
    "id": "py120",
    "descricao": "O que a função `enumerate(iteravel)` retorna?",
    "alternativas": ["Apenas os itens do iterável", "Apenas os índices do iterável", "Um objeto enumerado que produz pares `(índice, item)`", "O número total de itens"],
    "correctAnswer": "Um objeto enumerado que produz pares `(índice, item)`",
    "subject": "Python"
  },
  {
    "id": "py121",
    "descricao": "Qual o propósito da função `zip(iteravel1, iteravel2, ...)`?",
    "alternativas": ["Comprimir arquivos", "Juntar iteráveis, agregando os elementos de cada um em tuplas", "Descompactar um único iterável", "Calcular a soma dos elementos"],
    "correctAnswer": "Juntar iteráveis, agregando os elementos de cada um em tuplas",
    "subject": "Python"
  },
  {
    "id": "py122",
    "descricao": "Qual é a saída do código: `x = {1, 2, 3}; y = {3, 4, 5}; print(x | y)`?",
    "alternativas": ["`{3}`", "`{1, 2, 3, 4, 5}`", "`{1, 2, 4, 5}`", "`{1, 2}`"],
    "correctAnswer": "`{1, 2, 3, 4, 5}`",
    "subject": "Python"
  },
  {
    "id": "py123",
    "descricao": "O que o operador `|` representa para conjuntos?",
    "alternativas": ["Interseção", "Diferença", "União", "Diferença simétrica"],
    "correctAnswer": "União",
    "subject": "Python"
  },
  {
    "id": "py124",
    "descricao": "O que o operador `&` representa para conjuntos?",
    "alternativas": ["Interseção", "União", "Diferença", "Ou exclusivo"],
    "correctAnswer": "Interseção",
    "subject": "Python"
  },
  {
    "id": "py125",
    "descricao": "Qual o resultado de `True and False`?",
    "alternativas": ["`True`", "`False`", "`1`", "`0`"],
    "correctAnswer": "`False`",
    "subject": "Python"
  },
  {
    "id": "py126",
    "descricao": "Qual o resultado de `False or True`?",
    "alternativas": ["`True`", "`False`", "`None`", "Um erro"],
    "correctAnswer": "`True`",
    "subject": "Python"
  },
  {
    "id": "py127",
    "descricao": "O que o método `update()` faz em um dicionário?",
    "alternativas": ["Atualiza o valor de uma única chave", "Adiciona os pares chave-valor de outro dicionário, sobrescrevendo chaves existentes", "Remove todas as chaves", "Cria uma cópia do dicionário"],
    "correctAnswer": "Adiciona os pares chave-valor de outro dicionário, sobrescrevendo chaves existentes",
    "subject": "Python"
  },
  {
    "id": "py128",
    "descricao": "Como você cria uma lista de números de 0 a 99?",
    "alternativas": ["`list(range(100))`", "`[...range(99)]`", "`range(0, 99)`", "`list(100)`"],
    "correctAnswer": "`list(range(100))`",
    "subject": "Python"
  },
  {
    "id": "py129",
    "descricao": "O que significa dizer que Python é uma linguagem 'interpretada'?",
    "alternativas": ["O código é traduzido para linguagem de máquina antes da execução", "O código é executado linha por linha por um programa chamado interpretador, sem uma etapa de compilação prévia", "O código é sempre fácil de interpretar", "O código só pode ser executado na web"],
    "correctAnswer": "O código é executado linha por linha por um programa chamado interpretador, sem uma etapa de compilação prévia",
    "subject": "Python"
  },
  {
    "id": "py130",
    "descricao": "Qual a saída de `print('hello'.capitalize())`?",
    "alternativas": ["`'HELLO'`", "`'Hello'`", "`'hello'`", "`'hELLO'`"],
    "correctAnswer": "`'Hello'`",
    "subject": "Python"
  },
  {
    "id": "py131",
    "descricao": "O que o `break` faz em um loop?",
    "alternativas": ["Pula a iteração atual", "Encerra o loop imediatamente", "Pausa o loop", "Reinicia o loop"],
    "correctAnswer": "Encerra o loop imediatamente",
    "subject": "Python"
  },
  {
    "id": "py132",
    "descricao": "O que o `continue` faz em um loop?",
    "alternativas": ["Encerra o loop", "Pula o resto do código dentro do loop para a iteração atual e passa para a próxima", "Causa um erro", "É o mesmo que `pass`"],
    "correctAnswer": "Pula o resto do código dentro do loop para a iteração atual e passa para a próxima",
    "subject": "Python"
  },
  {
    "id": "py133",
    "descricao": "Qual o propósito do bloco `else` em um loop `for` ou `while`?",
    "alternativas": ["É executado se o loop for encerrado por um `break`", "É executado se o loop terminar normalmente (sem ser interrompido por um `break`)", "É executado em cada iteração", "Não é uma sintaxe válida"],
    "correctAnswer": "É executado se o loop terminar normalmente (sem ser interrompido por um `break`)",
    "subject": "Python"
  },
  {
    "id": "py134",
    "descricao": "Qual o propósito da palavra-chave `global`?",
    "alternativas": ["Para declarar uma variável que pode ser acessada em qualquer lugar do programa", "Para indicar que uma atribuição dentro de uma função deve modificar uma variável no escopo global", "Para criar uma constante global", "Para importar um módulo global"],
    "correctAnswer": "Para indicar que uma atribuição dentro de uma função deve modificar uma variável no escopo global",
    "subject": "Python"
  },
  {
    "id": "py135",
    "descricao": "Qual o propósito da palavra-chave `nonlocal`?",
    "alternativas": ["Para acessar variáveis globais", "Para indicar que uma atribuição deve modificar uma variável em um escopo que não é local nem global (em funções aninhadas)", "Para criar variáveis locais", "É um sinônimo de `global`"],
    "correctAnswer": "Para indicar que uma atribuição deve modificar uma variável em um escopo que não é local nem global (em funções aninhadas)",
    "subject": "Python"
  },
  {
    "id": "py136",
    "descricao": "O que é 'recursão'?",
    "alternativas": ["Um tipo de loop", "O processo de uma função chamar a si mesma para resolver um problema", "Uma forma de declarar variáveis", "Uma técnica de otimização"],
    "correctAnswer": "O processo de uma função chamar a si mesma para resolver um problema",
    "subject": "Python"
  },
  {
    "id": "py137",
    "descricao": "Qual a principal desvantagem da recursão profunda?",
    "alternativas": ["Uso excessivo de CPU", "Pode levar a um `RecursionError` (estouro da pilha de recursão)", "É mais lenta que loops", "Código mais difícil de ler"],
    "correctAnswer": "Pode levar a um `RecursionError` (estouro da pilha de recursão)",
    "subject": "Python"
  },
  {
    "id": "py138",
    "descricao": "Qual o módulo da biblioteca padrão usado para trabalhar com JSON?",
    "alternativas": ["`json`", "`simplejson`", "`pickle`", "`data`"],
    "correctAnswer": "`json`",
    "subject": "Python"
  },
  {
    "id": "py139",
    "descricao": "Qual função no módulo `json` é usada para decodificar (parse) uma string JSON em um objeto Python?",
    "alternativas": ["`json.parse()`", "`json.load()`", "`json.decode()`", "`json.loads()`"],
    "correctAnswer": "`json.loads()`",
    "subject": "Python"
  },
  {
    "id": "py140",
    "descricao": "Qual função no módulo `json` é usada para codificar um objeto Python em uma string JSON?",
    "alternativas": ["`json.encode()`", "`json.dump()`", "`json.stringify()`", "`json.dumps()`"],
    "correctAnswer": "`json.dumps()`",
    "subject": "Python"
  },
  {
    "id": "py141",
    "descricao": "O que o `any(iteravel)` retorna?",
    "alternativas": ["`True` se todos os elementos forem verdadeiros", "`True` se pelo menos um elemento do iterável for verdadeiro", "`False` se todos os elementos forem verdadeiros", "O primeiro elemento verdadeiro"],
    "correctAnswer": "`True` se pelo menos um elemento do iterável for verdadeiro",
    "subject": "Python"
  },
  {
    "id": "py142",
    "descricao": "O que o `all(iteravel)` retorna?",
    "alternativas": ["`True` se todos os elementos do iterável forem verdadeiros", "`True` se algum elemento for verdadeiro", "`False` se nenhum elemento for verdadeiro", "A lista de elementos verdadeiros"],
    "correctAnswer": "`True` se todos os os elementos do iterável forem verdadeiros",
    "subject": "Python"
  },
  {
    "id": "py143",
    "descricao": "Qual o resultado de `'{} e {}'.format('A', 'B')`?",
    "alternativas": ["`'A e B'`", "`'{A} e {B}'`", "`'{} e {}'`", "Um erro"],
    "correctAnswer": "`'A e B'`",
    "subject": "Python"
  },
  {
    "id": "py144",
    "descricao": "Qual o resultado de `f'{2*3}'`?",
    "alternativas": ["`'2*3'`", "`'6'`", "`6` (inteiro)", "Um erro"],
    "correctAnswer": "`'6'`",
    "subject": "Python"
  },
  {
    "id": "py145",
    "descricao": "Como você pode obter o valor absoluto de um número `-5`?",
    "alternativas": ["`abs(-5)`", "`absolute(-5)`", "`math.abs(-5)`", "`|-5|`"],
    "correctAnswer": "`abs(-5)`",
    "subject": "Python"
  },
  {
    "id": "py146",
    "descricao": "Como se obtém o quociente e o resto de uma divisão em uma única operação?",
    "alternativas": ["`divmod(10, 3)`", "`divide(10, 3)`", "`qr(10, 3)`", "Não é possível"],
    "correctAnswer": "`divmod(10, 3)`",
    "subject": "Python"
  },
  {
    "id": "py147",
    "descricao": "O que o `del lista[0]` faz?",
    "alternativas": ["Retorna o primeiro elemento da lista", "Remove o primeiro elemento da lista", "Apaga a lista inteira", "Limpa a lista"],
    "correctAnswer": "Remove o primeiro elemento da lista",
    "subject": "Python"
  },
  {
    "id": "py148",
    "descricao": "Qual a diferença entre remover um item de um dicionário com `del d['chave']` e `d.pop('chave')`?",
    "alternativas": ["Não há diferença", "`pop` retorna o valor removido, `del` não", "`del` é mais rápido", "`pop` pode remover múltiplas chaves"],
    "correctAnswer": "`pop` retorna o valor removido, `del` não",
    "subject": "Python"
  },
  {
    "id": "py149",
    "descricao": "O que o módulo `random` faz?",
    "alternativas": ["Gera números aleatórios e realiza seleções aleatórias", "Ordena listas de forma aleatória", "Cria arquivos aleatórios", "Executa código de forma aleatória"],
    "correctAnswer": "Gera números aleatórios e realiza seleções aleatórias",
    "subject": "Python"
  },
  {
    "id": "py150",
    "descricao": "Qual função do módulo `random` gera um inteiro aleatório dentro de um intervalo `[a, b]`?",
    "alternativas": ["`random.random()`", "`random.randrange()`", "`random.randint(a, b)`", "`random.choice()`"],
    "correctAnswer": "`random.randint(a, b)`",
    "subject": "Python"
  },
  {
    "id": "py151",
    "descricao": "Qual função do módulo `random` retorna um elemento aleatório de uma sequência não vazia?",
    "alternativas": ["`random.randint()`", "`random.choice()`", "`random.select()`", "`random.pick()`"],
    "correctAnswer": "`random.choice()`",
    "subject": "Python"
  },
  {
    "id": "py152",
    "descricao": "Em POO, o que é 'polimorfismo'?",
    "alternativas": ["A capacidade de uma função ou método operar em objetos de diferentes classes", "A herança de múltiplas classes", "Ocultar dados", "Criar múltiplas cópias de um objeto"],
    "correctAnswer": "A capacidade de uma função ou método operar em objetos de diferentes classes",
    "subject": "Python"
  },
  {
    "id": "py153",
    "descricao": "O que o método `replace(antigo, novo)` faz em uma string?",
    "alternativas": ["Modifica a string original", "Retorna uma nova string com as ocorrências de `antigo` substituídas por `novo`", "Remove todas as ocorrências de `antigo`", "Adiciona `novo` no final"],
    "correctAnswer": "Retorna uma nova string com as ocorrências de `antigo` substituídas por `novo`",
    "subject": "Python"
  },
  {
    "id": "py154",
    "descricao": "Qual é a função do operador `...` (Ellipsis) em Python?",
    "alternativas": ["É usado como um espaço reservado em código incompleto", "É usado em fatiamento (slicing) de arrays multidimensionais (ex: NumPy)", "É usado para indicar a continuação de uma linha", "A e B estão corretas"],
    "correctAnswer": "A e B estão corretas",
    "subject": "Python"
  },
  {
    "id": "py155",
    "descricao": "Qual o tipo de dado retornado pela função `input()`?",
    "alternativas": ["`int`", "`float`", "`str`", "Depende do que for digitado"],
    "correctAnswer": "`str`",
    "subject": "Python"
  },
  {
    "id": "py156",
    "descricao": "Qual o propósito do `set.difference(outro_set)`?",
    "alternativas": ["Retornar um novo conjunto com elementos presentes em `set` mas não em `outro_set`", "Retornar os elementos comuns", "Retornar a união dos dois conjuntos", "Retornar True se os conjuntos forem diferentes"],
    "correctAnswer": "Retornar um novo conjunto com elementos presentes em `set` mas não em `outro_set`",
    "subject": "Python"
  },
  {
    "id": "py157",
    "descricao": "Qual o propósito do `set.intersection(outro_set)`?",
    "alternativas": ["Retornar os elementos diferentes", "Retornar um novo conjunto com os elementos presentes em ambos os conjuntos", "Retornar a união", "Retornar a diferença simétrica"],
    "correctAnswer": "Retornar um novo conjunto com os elementos presentes em ambos os conjuntos",
    "subject": "Python"
  },
  {
    "id": "py158",
    "descricao": "O que é o `GIL` (Global Interpreter Lock) no CPython?",
    "alternativas": ["Uma ferramenta de segurança", "Uma trava que permite que apenas uma thread execute bytecode Python por vez em um único processo", "Uma biblioteca de interface gráfica", "Um otimizador de código"],
    "correctAnswer": "Uma trava que permite que apenas uma thread execute bytecode Python por vez em um único processo",
    "subject": "Python"
  },
  {
    "id": "py159",
    "descricao": "Qual a consequência do GIL para a programação concorrente em Python?",
    "alternativas": ["Impede completamente a programação concorrente", "Faz com que programas multithread não possam tirar proveito total de processadores multi-core para tarefas limitadas pela CPU", "Acelera a execução de threads", "Aplica-se apenas a programas de I/O"],
    "correctAnswer": "Faz com que programas multithread não possam tirar proveito total de processadores multi-core para tarefas limitadas pela CPU",
    "subject": "Python"
  },
  {
    "id": "py160",
    "descricao": "Para quais tipos de tarefas as threads ainda são úteis em Python, apesar do GIL?",
    "alternativas": ["Tarefas limitadas pela CPU", "Tarefas limitadas por I/O (ex: operações de rede, disco), pois o GIL é liberado durante essas operações", "Apenas para cálculos matemáticos", "Não são úteis"],
    "correctAnswer": "Tarefas limitadas por I/O (ex: operações de rede, disco), pois o GIL é liberado durante essas operações",
    "subject": "Python"
  },
  {
    "id": "py161",
    "descricao": "O que são 'magic methods' (métodos mágicos) ou 'dunder methods'?",
    "alternativas": ["Métodos que começam e terminam com dois underscores (ex: `__init__`) e permitem emular comportamentos nativos", "Métodos que não podem ser chamados diretamente", "Métodos de bibliotecas externas", "Métodos que executam mágica"],
    "correctAnswer": "Métodos que começam e terminam com dois underscores (ex: `__init__`) e permitem emular comportamentos nativos",
    "subject": "Python"
  },
  {
    "id": "py162",
    "descricao": "Qual método mágico é chamado quando usamos o operador `+` em instâncias de uma classe?",
    "alternativas": ["`__add__`", "`__plus__`", "`__sum__`", "`__concat__`"],
    "correctAnswer": "`__add__`",
    "subject": "Python"
  },
  {
    "id": "py163",
    "descricao": "Qual método mágico é chamado quando usamos `len()` em uma instância de uma classe?",
    "alternativas": ["`__size__`", "`__length__`", "`__len__`", "`__count__`"],
    "correctAnswer": "`__len__`",
    "subject": "Python"
  },
  {
    "id": "py164",
    "descricao": "Qual método mágico define a representação de string de um objeto para o desenvolvedor (usado para depuração)?",
    "alternativas": ["`__str__`", "`__repr__`", "`__string__`", "`__debug__`"],
    "correctAnswer": "`__repr__`",
    "subject": "Python"
  },
  {
    "id": "py165",
    "descricao": "Qual método mágico define a representação de string 'amigável' de um objeto para o usuário final?",
    "alternativas": ["`__str__`", "`__repr__`", "`__print__`", "`__show__`"],
    "correctAnswer": "`__str__`",
    "subject": "Python"
  },
  {
    "id": "py166",
    "descricao": "O que o módulo `pickle` faz?",
    "alternativas": ["Conserva alimentos", "Serializa e desserializa objetos Python, convertendo-os em um fluxo de bytes e vice-versa", "Trabalha com arquivos de texto", "Cria interfaces gráficas"],
    "correctAnswer": "Serializa e desserializa objetos Python, convertendo-os em um fluxo de bytes e vice-versa",
    "subject": "Python"
  },
  {
    "id": "py167",
    "descricao": "Qual é a principal biblioteca para visualização de dados e plotagem de gráficos em Python?",
    "alternativas": ["`Seaborn`", "`Plotly`", "`Matplotlib`", "`Bokeh`"],
    "correctAnswer": "`Matplotlib`",
    "subject": "Python"
  },
  {
    "id": "py168",
    "descricao": "Qual a saída de `type(lambda: None)`?",
    "alternativas": ["`<class 'lambda'>`", "`<class 'function'>`", "`<class 'NoneType'>`", "`<class 'object'>`"],
    "correctAnswer": "`<class 'function'>`",
    "subject": "Python"
  },
  {
    "id": "py169",
    "descricao": "Como você pode criar uma cópia rasa de uma lista `L`?",
    "alternativas": ["`L[:]`", "`L.copy()`", "`list(L)`", "Todas as alternativas anteriores"],
    "correctAnswer": "Todas as alternativas anteriores",
    "subject": "Python"
  },
  {
    "id": "py170",
    "descricao": "O que `collections.namedtuple` cria?",
    "alternativas": ["Uma tupla com nomes para cada posição, permitindo acesso por nome e por índice", "Um dicionário ordenado", "Uma tupla que não pode ser nomeada", "Uma lista com nomes"],
    "correctAnswer": "Uma tupla com nomes para cada posição, permitindo acesso por nome e por índice",
    "subject": "Python"
  },
  {
    "id": "py171",
    "descricao": "O que o `collections.defaultdict` faz?",
    "alternativas": ["É um dicionário que não permite chaves duplicadas", "É um dicionário que atribui um valor padrão a chaves que ainda não existem, evitando um `KeyError`", "É um dicionário com um tamanho fixo", "É um dicionário que só aceita strings como chaves"],
    "correctAnswer": "É um dicionário que atribui um valor padrão a chaves que ainda não existem, evitando um `KeyError`",
    "subject": "Python"
  },
  {
    "id": "py172",
    "descricao": "O que é o `collections.Counter`?",
    "alternativas": ["Um contador para loops `for`", "Um subtipo de dicionário para contar objetos hasheáveis", "Uma função para medir o tempo", "Um iterador que conta para cima"],
    "correctAnswer": "Um subtipo de dicionário para contar objetos hasheáveis",
    "subject": "Python"
  },
  {
    "id": "py173",
    "descricao": "Qual o propósito do `collections.deque`?",
    "alternativas": ["Uma fila dupla (double-ended queue) otimizada para adições e remoções rápidas em ambas as extremidades", "Uma fila que só permite remoção", "Uma pilha", "Uma fila de prioridade"],
    "correctAnswer": "Uma fila dupla (double-ended queue) otimizada para adições e remoções rápidas em ambas as extremidades",
    "subject": "Python"
  },
  {
    "id": "py174",
    "descricao": "O que o `itertools.permutations(iteravel)` gera?",
    "alternativas": ["Todas as permutações de comprimento especificado dos elementos do iterável", "Todas as combinações", "Apenas o primeiro e o último elemento", "O iterável em ordem inversa"],
    "correctAnswer": "Todas as permutações de comprimento especificado dos elementos do iterável",
    "subject": "Python"
  },
  {
    "id": "py175",
    "descricao": "O que o `itertools.combinations(iteravel, r)` gera?",
    "alternativas": ["Todas as combinações de comprimento `r` dos elementos do iterável, sem repetição", "Todas as permutações", "Apenas as combinações que somam `r`", "O produto cartesiano"],
    "correctAnswer": "Todas as combinações de comprimento `r` dos elementos do iterável, sem repetição",
    "subject": "Python"
  },
  {
    "id": "py176",
    "descricao": "O que a instrução `assert` faz?",
    "alternativas": ["Garante que uma condição seja verdadeira, caso contrário, levanta um `AssertionError`", "Atribui um valor a uma variável", "Imprime uma mensagem de depuração", "É um sinônimo para `if`"],
    "correctAnswer": "Garante que uma condição seja verdadeira, caso contrário, levanta um `AssertionError`",
    "subject": "Python"
  },
  {
    "id": "py177",
    "descricao": "O que é `PEP 8`?",
    "alternativas": ["A oitava versão do Python", "Um documento que fornece um guia de estilo para o código Python", "Uma biblioteca de otimização", "Um framework web"],
    "correctAnswer": "Um documento que fornece um guia de estilo para o código Python",
    "subject": "Python"
  },
  {
    "id": "py178",
    "descricao": "Qual é a forma recomendada pelo PEP 8 para nomear variáveis e funções?",
    "alternativas": ["`camelCase`", "`PascalCase`", "`snake_case`", "`kebab-case`"],
    "correctAnswer": "`snake_case`",
    "subject": "Python"
  },
  {
    "id": "py179",
    "descricao": "Qual é a forma recomendada pelo PEP 8 para nomear classes?",
    "alternativas": ["`camelCase`", "`PascalCase`", "`snake_case`", "`UPPER_CASE`"],
    "correctAnswer": "`PascalCase`",
    "subject": "Python"
  },
  {
    "id": "py180",
    "descricao": "O que `map(funcao, iteravel)` retorna?",
    "alternativas": ["Uma lista", "Um iterador que aplica a `funcao` a cada item do `iteravel`", "Uma tupla", "O resultado da primeira aplicação"],
    "correctAnswer": "Um iterador que aplica a `funcao` a cada item do `iteravel`",
    "subject": "Python"
  },
  {
    "id": "py181",
    "descricao": "O que `filter(funcao, iteravel)` retorna?",
    "alternativas": ["Uma lista", "Um iterador com os itens do `iteravel` para os quais `funcao` retorna `True`", "Um iterador com os itens para os quais `funcao` retorna `False`", "Um booleano"],
    "correctAnswer": "Um iterador com os itens do `iteravel` para os quais `funcao` retorna `True`",
    "subject": "Python"
  },
  {
    "id": "py182",
    "descricao": "Como se define o tipo de um parâmetro de função e seu retorno (type hints)?",
    "alternativas": ["`def func(param: int) -> str:`", "`def func(int param) str:`", "`def func(param as int) returns str:`", "Python não suporta isso"],
    "correctAnswer": "`def func(param: int) -> str:`",
    "subject": "Python"
  },
  {
    "id": "py183",
    "descricao": "Os 'type hints' (dicas de tipo) são obrigatórios e verificados pelo interpretador Python?",
    "alternativas": ["Sim, o código não executa sem eles", "Não, eles são ignorados pelo interpretador padrão e usados principalmente por ferramentas de análise estática e IDEs", "Sim, mas apenas para o tipo de retorno", "Apenas em modo estrito"],
    "correctAnswer": "Não, eles são ignorados pelo interpretador padrão e usados principalmente por ferramentas de análise estática e IDEs",
    "subject": "Python"
  },
  {
    "id": "py184",
    "descricao": "O que o módulo `sys` permite fazer?",
    "alternativas": ["Acessar parâmetros e funções específicas do sistema (interpretador)", "Manipular strings", "Fazer cálculos matemáticos", "Criar interfaces de usuário"],
    "correctAnswer": "Acessar parâmetros e funções específicas do sistema (interpretador)",
    "subject": "Python"
  },
  {
    "id": "py185",
    "descricao": "O que `sys.argv` contém?",
    "alternativas": ["A versão do Python", "O caminho de instalação do Python", "Uma lista de argumentos de linha de comando passados para um script Python", "As variáveis de ambiente"],
    "correctAnswer": "Uma lista de argumentos de linha de comando passados para um script Python",
    "subject": "Python"
  },
  {
    "id": "py186",
    "descricao": "O que é `__slots__` em uma classe?",
    "alternativas": ["Um mecanismo para declarar um conjunto fixo de atributos, economizando memória e acelerando o acesso", "Uma lista de métodos da classe", "Um dicionário para armazenar atributos de instância", "Um método para criar instâncias"],
    "correctAnswer": "Um mecanismo para declarar um conjunto fixo de atributos, economizando memória e acelerando o acesso",
    "subject": "Python"
  },
  {
    "id": "py187",
    "descricao": "Qual é um dos casos de uso para `asyncio` em Python?",
    "alternativas": ["Escrever código concorrente usando a sintaxe `async`/`await` para tarefas limitadas por I/O", "Processamento paralelo de CPU", "Substituir o threading", "Executar código Python no navegador"],
    "correctAnswer": "Escrever código concorrente usando a sintaxe `async`/`await` para tarefas limitadas por I/O",
    "subject": "Python"
  },
  {
    "id": "py188",
    "descricao": "Como se declara uma função assíncrona?",
    "alternativas": ["`def async func():`", "`async def func():`", "`function async func():`", "`def func() async:`"],
    "correctAnswer": "`async def func():`",
    "subject": "Python"
  },
  {
    "id": "py189",
    "descricao": "Dentro de uma função `async def`, o que a palavra-chave `await` faz?",
    "alternativas": ["Pausa a execução da corrotina até que o objeto 'awaitable' seja concluído", "Executa a função imediatamente", "Define um temporizador", "Cria uma nova thread"],
    "correctAnswer": "Pausa a execução da corrotina até que o objeto 'awaitable' seja concluído",
    "subject": "Python"
  },
  {
    "id": "py190",
    "descricao": "O que são 'dataclasses' (introduzidas no Python 3.7)?",
    "alternativas": ["Um decorador e funções para adicionar automaticamente métodos especiais como `__init__()`, `__repr__()` a classes que armazenam dados", "Classes que só podem conter dados numéricos", "Um novo tipo de dado", "Um substituto para dicionários"],
    "correctAnswer": "Um decorador e funções para adicionar automaticamente métodos especiais como `__init__()`, `__repr__()` a classes que armazenam dados",
    "subject": "Python"
  },
  {
    "id": "py191",
    "descricao": "O que o `...` (Ellipsis) representa como um valor literal?",
    "alternativas": ["Um objeto singleton usado para indicar código inacabado ou em fatiamento de arrays de alto desempenho", "O mesmo que `None`", "Um erro de sintaxe", "Infinito"],
    "correctAnswer": "Um objeto singleton usado para indicar código inacabado ou em fatiamento de arrays de alto desempenho",
    "subject": "Python"
  },
  {
    "id": "py192",
    "descricao": "Qual o propósito do operador `//=`?",
    "alternativas": ["É um atalho para a divisão inteira com atribuição (ex: `x //= 2` é o mesmo que `x = x // 2`)", "Compara se duas divisões são iguais", "Não é um operador válido", "Cria um comentário"],
    "correctAnswer": "É um atalho para a divisão inteira com atribuição (ex: `x //= 2` é o mesmo que `x = x // 2`)",
    "subject": "Python"
  },
  {
    "id": "py193",
    "descricao": "Qual o propósito do operador `**=`?",
    "alternativas": ["Multiplica e atribui", "É um atalho para a exponenciação com atribuição (ex: `x **= 2` é o mesmo que `x = x ** 2`)", "Cria um ponteiro", "Compara potências"],
    "correctAnswer": "É um atalho para a exponenciação com atribuição (ex: `x **= 2` é o mesmo que `x = x ** 2`)",
    "subject": "Python"
  },
  {
    "id": "py194",
    "descricao": "Em Python 3, qual a codificação de caracteres padrão para arquivos de código-fonte?",
    "alternativas": ["`ASCII`", "`Latin-1`", "`UTF-8`", "`Unicode`"],
    "correctAnswer": "`UTF-8`",
    "subject": "Python"
  },
  {
    "id": "py195",
    "descricao": "O que `dir(objeto)` faz?",
    "alternativas": ["Retorna o diretório do objeto", "Retorna uma lista de atributos e métodos válidos para o objeto", "Descreve o objeto", "Deleta o objeto"],
    "correctAnswer": "Retorna uma lista de atributos e métodos válidos para o objeto",
    "subject": "Python"
  },
  {
    "id": "py196",
    "descricao": "O que `help(objeto)` faz?",
    "alternativas": ["Abre uma página de ajuda na web", "Imprime o objeto", "Exibe a documentação (docstring) do objeto e de seus métodos", "Retorna `True` se o objeto for útil"],
    "correctAnswer": "Exibe a documentação (docstring) do objeto e de seus métodos",
    "subject": "Python"
  },
  {
    "id": "py197",
    "descricao": "Como você pode obter o identificador único de um objeto na memória (CPython)?",
    "alternativas": ["`id(objeto)`", "`mem(objeto)`", "`ref(objeto)`", "`address(objeto)`"],
    "correctAnswer": "`id(objeto)`",
    "subject": "Python"
  },
  {
    "id": "py198",
    "descricao": "O que a desestruturação de tuplas permite, como em `a, b = (1, 2)`?",
    "alternativas": ["Criar uma tupla", "Desempacotar os valores da tupla em variáveis individuais", "Comparar duas tuplas", "Somar os valores da tupla"],
    "correctAnswer": "Desempacotar os valores da tupla em variáveis individuais",
    "subject": "Python"
  },
  {
    "id": "py199",
    "descricao": "Qual a forma idiomática de trocar os valores de duas variáveis `a` e `b` em Python?",
    "alternativas": ["`temp = a; a = b; b = temp`", "`a, b = b, a`", "`swap(a, b)`", "Não é possível sem uma variável temporária"],
    "correctAnswer": "`a, b = b, a`",
    "subject": "Python"
  },
  {
    "id": "py200",
    "descricao": "O que o 'Zen do Python' (import this) representa?",
    "alternativas": ["As regras estritas da linguagem", "Um poema sobre a história do Python", "Uma coleção de 19 princípios orientadores para escrever código Python de forma clara e idiomática", "A documentação oficial"],
    "correctAnswer": "Uma coleção de 19 princípios orientadores para escrever código Python de forma clara e idiomática",
    "subject": "Python"
  }
  
];

module.exports = {pythonQuestions};