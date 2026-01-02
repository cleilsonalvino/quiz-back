const questionsST = [
  {
    "id": "st01",
    "descricao": "Qual é o nome real da Eleven (Onze)?",
    "alternativas": ["Jane Ives", "Sara Hopper", "C... Max Mayfield", "Nancy Wheeler", "Erica Sinclair"],
    "correctAnswer": "Jane Ives",
    "subject": "Stranger Things"
  },
  {
    "id": "st02",
    "descricao": "Qual é a comida favorita da Eleven?",
    "alternativas": ["Pizza de Peperoni", "Hambúrguer", "Batata Frita", "Waffles Eggo", "Sorvete"],
    "correctAnswer": "Waffles Eggo",
    "subject": "Stranger Things"
  },
  {
    "id": "st03",
    "descricao": "Como se chama o jogo de RPG que os garotos jogam no porão?",
    "alternativas": ["Magic", "Dungeons & Dragons", "Warhammer", "World of Warcraft", "Catan"],
    "correctAnswer": "Dungeons & Dragons",
    "subject": "Stranger Things"
  },
  {
    "id": "st04",
    "descricao": "Qual o nome da dimensão paralela e sombria de Hawkins?",
    "alternativas": ["O Vazio", "Mundo Inferior", "Mundo Invertido", "Lado Sombrio", "O Abismo"],
    "correctAnswer": "Mundo Invertido",
    "subject": "Stranger Things"
  },
  {
    "id": "st05",
    "descricao": "Quem desaparece no primeiro episódio da primeira temporada?",
    "alternativas": ["Mike Wheeler", "Dustin Henderson", "Lucas Sinclair", "Will Byers", "Barb Holland"],
    "correctAnswer": "Will Byers",
    "subject": "Stranger Things"
  },
  {
    "id": "st06",
    "descricao": "Qual o nome do monstro sem rosto da primeira temporada?",
    "alternativas": ["Devorador de Mentes", "Demogorgon", "Vecna", "Democão", "Aranha Gigante"],
    "correctAnswer": "Demogorgon",
    "subject": "Stranger Things"
  },
  {
    "id": "st07",
    "descricao": "Joyce comunica-se com Will no Mundo Invertido através de quê?",
    "alternativas": ["Rádio Amador", "Telefone fixo", "Luzes de Natal", "Desenhos na parede", "Espelhos"],
    "correctAnswer": "Luzes de Natal",
    "subject": "Stranger Things"
  },
  {
    "id": "st08",
    "descricao": "Em qual estado americano fica a cidade de Hawkins?",
    "alternativas": ["Indiana", "Illinois", "Ohio", "Texas", "Califórnia"],
    "correctAnswer": "Indiana",
    "subject": "Stranger Things"
  },
  {
    "id": "st09",
    "descricao": "Qual o nome da sorveteria onde Steve e Robin trabalham na 3ª temporada?",
    "alternativas": ["Scoops Ahoy", "Ice Cream Palace", "Baskin Robbins", "Sailor Sorvetes", "Hawkins Dairy"],
    "correctAnswer": "Scoops Ahoy",
    "subject": "Stranger Things"
  },
  {
    "id": "st10",
    "descricao": "Como Eleven chama o Dr. Brenner?",
    "alternativas": ["Doutor", "Mestre", "Senhor", "Papai", "Criador"],
    "correctAnswer": "Papai",
    "subject": "Stranger Things"
  },
  {
    "id": "st11",
    "descricao": "Qual é a profissão de Jim Hopper?",
    "alternativas": ["Bombeiro", "Xerife", "Segurança de Laboratório", "Professor", "Detetive Particular"],
    "correctAnswer": "Xerife",
    "subject": "Stranger Things"
  },
  {
    "id": "st12",
    "descricao": "Qual o apelido que Dustin dá ao seu pequeno animal de estimação (Democão)?",
    "alternativas": ["Dart", "Rex", "Sparky", "Buddy", "Fang"],
    "correctAnswer": "Dart",
    "subject": "Stranger Things"
  },
  {
    "id": "st13",
    "descricao": "Qual o nome da irmã do Lucas que adora provocar os garotos?",
    "alternativas": ["Robin", "Suzie", "Erica", "Holly", "Barb"],
    "correctAnswer": "Erica",
    "subject": "Stranger Things"
  },
  {
    "id": "st14",
    "descricao": "Qual é o nome da música favorita de Max que a salva de Vecna?",
    "alternativas": ["Master of Puppets", "Should I Stay or Should I Go", "Running Up That Hill", "Never Surrender", "Material Girl"],
    "correctAnswer": "Running Up That Hill",
    "subject": "Stranger Things"
  },
  {
    "id": "st15",
    "descricao": "Quem é o vilão principal da 4ª temporada?",
    "alternativas": ["Billy Hargrove", "Dr. Owens", "Vecna", "Grigori", "Devorador de Mentes"],
    "correctAnswer": "Vecna",
    "subject": "Stranger Things"
  },
  {
    "id": "st16",
    "descricao": "Qual o nome do namorado da Joyce na 2ª temporada que morre tragicamente?",
    "alternativas": ["Bob Newby", "Murray Bauman", "Lonnie Byers", "Scott Clarke", "Benny Hammond"],
    "correctAnswer": "Bob Newby",
    "subject": "Stranger Things"
  },
  {
    "id": "st17",
    "descricao": "Onde o grupo de amigos costuma se reunir para conversar via rádio?",
    "alternativas": ["Escola Hawkins", "Shopping Starcourt", "Porão do Mike", "Delegacia", "Casa do Will"],
    "correctAnswer": "Porão do Mike",
    "subject": "Stranger Things"
  },
  {
    "id": "st18",
    "descricao": "Qual o nome da namorada do Dustin que mora em Utah?",
    "alternativas": ["Max", "Suzie", "Robin", "Heather", "Chrissy"],
    "correctAnswer": "Suzie",
    "subject": "Stranger Things"
  },
  {
    "id": "st19",
    "descricao": "Qual personagem se sacrifica tocando Metallica no Mundo Invertido?",
    "alternativas": ["Steve Harrington", "Jonathan Byers", "Eddie Munson", "Billy Hargrove", "Argyle"],
    "correctAnswer": "Eddie Munson",
    "subject": "Stranger Things"
  },
  {
    "id": "st20",
    "descricao": "Qual o nome do shopping que é destaque na 3ª temporada?",
    "alternativas": ["Hawkins Mall", "Starcourt Mall", "Grand Central", "Liberty Mall", "Town Square"],
    "correctAnswer": "Starcourt Mall",
    "subject": "Stranger Things"
  },
  {
    "id": "st21",
    "descricao": "Qual é o número tatuado no braço da Eleven?",
    "alternativas": ["001", "007", "011", "008", "010"],
    "correctAnswer": "011",
    "subject": "Stranger Things"
  },
  {
    "id": "st22",
    "descricao": "Quem é o pai biológico da Eleven?",
    "alternativas": ["Jim Hopper", "Martin Brenner", "Andrew Rich", "Sam Owens", "Henry Creel"],
    "correctAnswer": "Andrew Rich",
    "subject": "Stranger Things"
  },
  {
    "id": "st23",
    "descricao": "Qual o nome do clube de RPG liderado por Eddie Munson?",
    "alternativas": ["Hellfire Club", "Dragon Club", "Hawkins Knights", "Fireballers", "The Party"],
    "correctAnswer": "Hellfire Club",
    "subject": "Stranger Things"
  },
  {
    "id": "st24",
    "descricao": "Em que ano a série começa (1ª temporada)?",
    "alternativas": ["1980", "1983", "1985", "1988", "1990"],
    "correctAnswer": "1983",
    "subject": "Stranger Things"
  },
  {
    "id": "st25",
    "descricao": "Qual é o nome da melhor amiga de Nancy que desaparece na piscina?",
    "alternativas": ["Robin", "Chrissy", "Heather", "Barb", "Eden"],
    "correctAnswer": "Barb",
    "subject": "Stranger Things"
  },
  {
    "id": "st26",
    "descricao": "Qual é o nome da mãe biológica da Eleven?",
    "alternativas": ["Joyce Byers", "Terry Ives", "Karen Wheeler", "Claudia Henderson", "Virginia Creel"],
    "correctAnswer": "Terry Ives",
    "subject": "Stranger Things"
  },
  {
    "id": "st27",
    "descricao": "Qual personagem é conhecido por suas habilidades com o estilingue?",
    "alternativas": ["Mike", "Dustin", "Lucas", "Will", "Steve"],
    "correctAnswer": "Lucas",
    "subject": "Stranger Things"
  },
  {
    "id": "st28",
    "descricao": "Qual o nome da substância que os russos usam para abrir o portal na 3ª temporada?",
    "alternativas": ["Ectoplasma", "Energon", "Líquido Verde", "Chave de Prometeu", "Ouro de Tiamat"],
    "correctAnswer": "Líquido Verde",
    "subject": "Stranger Things"
  },
  {
    "id": "st29",
    "descricao": "Como se chama a 'irmã' de Eleven que aparece na 2ª temporada (Número 008)?",
    "alternativas": ["Kali", "Sara", "Maya", "Linnea", "Shiela"],
    "correctAnswer": "Kali",
    "subject": "Stranger Things"
  },
  {
    "id": "st30",
    "descricao": "Qual é o nome do jornal onde Nancy e Jonathan trabalham na 3ª temporada?",
    "alternativas": ["Hawkins Post", "Indiana Daily", "The Gazette", "Hawkins Ledger", "Starcourt News"],
    "correctAnswer": "Hawkins Post",
    "subject": "Stranger Things"
  },
  {
    "id": "st31",
    "descricao": "Quem é o irmão de Max que se torna hospedeiro do Devorador de Mentes?",
    "alternativas": ["Jason Carver", "Billy Hargrove", "Troy", "James", "Neil"],
    "correctAnswer": "Billy Hargrove",
    "subject": "Stranger Things"
  },
  {
    "id": "st32",
    "descricao": "Qual é o nome da pizzaria onde Argyle trabalha na 4ª temporada?",
    "alternativas": ["Pizza Hut", "Surfer Boy Pizza", "California Crust", "Pineapple Express", "Domino's"],
    "correctAnswer": "Surfer Boy Pizza",
    "subject": "Stranger Things"
  },
  {
    "id": "st33",
    "descricao": "Qual o nome do laboratório onde Eleven foi criada?",
    "alternativas": ["Laboratório de Hawkins", "Divisão de Energia", "Projeto MKUltra", "Centro de Pesquisa Indiana", "Base Russa"],
    "correctAnswer": "Laboratório de Hawkins",
    "subject": "Stranger Things"
  },
  {
    "id": "st34",
    "descricao": "O que o grupo usa para se proteger contra as abelhas/morcegos no Mundo Invertido na 4ª temporada?",
    "alternativas": ["Armaduras de metal", "Escudos de madeira e pregos", "Coquetéis Molotov", "Capas de chuva", "Lança-chamas"],
    "correctAnswer": "Escudos de madeira e pregos",
    "subject": "Stranger Things"
  },
  {
    "id": "st35",
    "descricao": "Qual o nome do apresentador do programa 'The Upside Down' que Murray adora investigar?",
    "alternativas": ["Ted Wheeler", "Murray Bauman", "Yuri", "Enzo", "Alexei"],
    "correctAnswer": "Murray Bauman",
    "subject": "Stranger Things"
  },
  {
    "id": "st36",
    "descricao": "Qual objeto Dustin usa para detectar radiação e encontrar o sinal dos russos?",
    "alternativas": ["Cerebro", "Walkie-talkie", "Bússola", "Contador Geiger", "Telescópio"],
    "correctAnswer": "Cerebro",
    "subject": "Stranger Things"
  },
  {
    "id": "st37",
    "descricao": "Como Eleven perdeu seus poderes no final da 3ª temporada?",
    "alternativas": ["Após lutar com Billy", "Mordida pelo Devorador de Mentes", "Uso excessivo contra o portal", "Bloqueio mental de Brenner", "Veneno russo"],
    "correctAnswer": "Mordida pelo Devorador de Mentes",
    "subject": "Stranger Things"
  },
  {
    "id": "st38",
    "descricao": "Qual o nome do cientista russo que fica amigo de Hopper e Joyce e ama Slurpees de cereja?",
    "alternativas": ["Ivan", "Boris", "Alexei", "Dimitri", "Vladimir"],
    "correctAnswer": "Alexei",
    "subject": "Stranger Things"
  },
  {
    "id": "st39",
    "descricao": "Qual o nome da mansão onde a família Creel morava?",
    "alternativas": ["Mansão Creel", "Casa do Horror", "Residência Victor", "Solar Hawkins", "Casa das Rosas"],
    "correctAnswer": "Mansão Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st40",
    "descricao": "Qual é o nome da música que Dustin e Suzie cantam via rádio?",
    "alternativas": ["NeverEnding Story", "Total Eclipse of the Heart", "Africa", "Heroes", "Every Breath You Take"],
    "correctAnswer": "NeverEnding Story",
    "subject": "Stranger Things"
  },
  {
    "id": "st41",
    "descricao": "O que aconteceu com a perna de Max no final da 4ª temporada?",
    "alternativas": ["Foi cortada", "Ficou paralisada", "Foi quebrada por Vecna", "Nada aconteceu", "Ela perdeu a perna"],
    "correctAnswer": "Foi quebrada por Vecna",
    "subject": "Stranger Things"
  },
  {
    "id": "st42",
    "descricao": "Qual o nome do guarda russo que ajuda Hopper na prisão?",
    "alternativas": ["Yuri", "Enzo (Dimitri)", "Mikhail", "Grigori", "Stefan"],
    "correctAnswer": "Enzo (Dimitri)",
    "subject": "Stranger Things"
  },
  {
    "id": "st43",
    "descricao": "Qual é a cor principal do Devorador de Mentes quando aparece como fumaça?",
    "alternativas": ["Vermelho", "Azul", "Verde", "Preto/Cinza Escuro", "Roxo"],
    "correctAnswer": "Preto/Cinza Escuro",
    "subject": "Stranger Things"
  },
  {
    "id": "st44",
    "descricao": "Quem Mike Wheeler convidou para o Baile de Inverno (Snow Ball)?",
    "alternativas": ["Max", "Nancy", "Eleven", "Barb", "Robin"],
    "correctAnswer": "Eleven",
    "subject": "Stranger Things"
  },
  {
    "id": "st45",
    "descricao": "Qual é o nome do projeto secreto do governo que originou a Eleven?",
    "alternativas": ["MKUltra", "Projeto Paperclip", "Operação Hawkins", "Projeto Indigo", "Área 51"],
    "correctAnswer": "MKUltra",
    "subject": "Stranger Things"
  },
  {
    "id": "st46",
    "descricao": "Como Vecna escolhe suas vítimas?",
    "alternativas": ["Pessoas mais ricas", "Quem joga D&D", "Jovens com traumas e culpa", "Quem mora perto da floresta", "Aleatoriamente"],
    "correctAnswer": "Jovens com traumas e culpa",
    "subject": "Stranger Things"
  },
  {
    "id": "st47",
    "descricao": "Qual o nome da cidade na Califórnia para onde os Byers se mudam?",
    "alternativas": ["Los Angeles", "Lenora Hills", "Santa Monica", "Sunnyvale", "San Diego"],
    "correctAnswer": "Lenora Hills",
    "subject": "Stranger Things"
  },
  {
    "id": "st48",
    "descricao": "Qual é a arma icônica de Steve Harrington?",
    "alternativas": ["Um revólver", "Um taco de beisebol com pregos", "Um canivete", "Um machado", "Uma funda"],
    "correctAnswer": "Um taco de beisebol com pregos",
    "subject": "Stranger Things"
  },
  {
    "id": "st49",
    "descricao": "Qual personagem é o primeiro a morrer por Vecna na 4ª temporada?",
    "alternativas": ["Fred Benson", "Patrick McKinney", "Chrissy Cunningham", "Eddie Munson", "Max"],
    "correctAnswer": "Chrissy Cunningham",
    "subject": "Stranger Things"
  },
  {
    "id": "st50",
    "descricao": "Qual o nome do ator que interpreta o Jim Hopper?",
    "alternativas": ["Finn Wolfhard", "David Harbour", "Gaten Matarazzo", "Joe Keery", "Noah Schnapp"],
    "correctAnswer": "David Harbour",
    "subject": "Stranger Things"
  },
  {
    "id": "st51",
    "descricao": "Qual é o nome do primeiro episódio da primeira temporada da série?",
    "alternativas": ["O Mundo Invertido", "O Desaparecimento de Will Byers", "A Esquisita da Rua Maple", "O Laboratório", "O Corpo"],
    "correctAnswer": "O Desaparecimento de Will Byers",
    "subject": "Stranger Things"
  },
  {
    "id": "st52",
    "descricao": "Qual o nome do personagem que é o 'Número 001' no laboratório de Hawkins?",
    "alternativas": ["Henry Creel", "Martin Brenner", "Andrew Rich", "Peter Ballard", "Victor Creel"],
    "correctAnswer": "Henry Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st53",
    "descricao": "Na 2ª temporada, qual fantasia de Halloween o grupo de amigos usa?",
    "alternativas": ["Star Wars", "Os Caça-Fantasmas", "De Volta para o Futuro", "E.T. O Extraterrestre", "Indiana Jones"],
    "correctAnswer": "Os Caça-Fantasmas",
    "subject": "Stranger Things"
  },
  {
    "id": "st54",
    "descricao": "Qual é a condição médica real de Gaten Matarazzo (Dustin) que foi incorporada ao personagem?",
    "alternativas": ["Dislexia", "Displasia Cleidocraniana", "Daltonismo", "Asma Crônica", "Escoliose"],
    "correctAnswer": "Displasia Cleidocraniana",
    "subject": "Stranger Things"
  },
  {
    "id": "st55",
    "descricao": "Qual o nome da substância que os russos estavam extraindo em Kamchatka na 4ª temporada?",
    "alternativas": ["Sangue de Demogorgon", "Matéria Escura", "Partículas do Devorador", "Ferro Fluido", "Vapor de Almas"],
    "correctAnswer": "Partículas do Devorador",
    "subject": "Stranger Things"
  },
  {
    "id": "st56",
    "descricao": "Quantas badaladas de relógio as vítimas de Vecna ouvem antes de morrer?",
    "alternativas": ["Duas", "Três", "Quatro", "Cinco", "Seis"],
    "correctAnswer": "Quatro",
    "subject": "Stranger Things"
  },
  {
    "id": "st57",
    "descricao": "Qual é o nome do fliperama onde os garotos passam o tempo na 2ª temporada?",
    "alternativas": ["Palace Arcade", "Hawkins Gaming", "Starcourt Games", "Joystick Hub", "Retro Pixel"],
    "correctAnswer": "Palace Arcade",
    "subject": "Stranger Things"
  },
  {
    "id": "st58",
    "descricao": "Quem ensina Eleven sobre 'Promessas' na 1ª temporada?",
    "alternativas": ["Hopper", "Mike", "Dustin", "Lucas", "Joyce"],
    "correctAnswer": "Mike",
    "subject": "Stranger Things"
  },
  {
    "id": "st59",
    "descricao": "Qual o nome da rádio amador que Dustin constrói para falar com Suzie?",
    "alternativas": ["Cerebro", "Magnon", "Apollo", "Big Ear", "Silver Fox"],
    "correctAnswer": "Cerebro",
    "subject": "Stranger Things"
  },
  {
    "id": "st60",
    "descricao": "Qual é o nome do monstro formado por restos humanos e ratos na 3ª temporada?",
    "alternativas": ["O Esfolado (The Flayed)", "O Carniceiro", "Monstro de Flesh", "O Amálgama", "Rato-Rei"],
    "correctAnswer": "O Esfolado (The Flayed)",
    "subject": "Stranger Things"
  },
  {
    "id": "st61",
    "descricao": "O que Steve Harrington usa no cabelo para deixá-lo tão volumoso?",
    "alternativas": ["Laquê comum", "Spray Fabergé Organics", "Gel de babosa", "Água e açúcar", "Pomada modeladora"],
    "correctAnswer": "Spray Fabergé Organics",
    "subject": "Stranger Things"
  },
  {
    "id": "st62",
    "descricao": "Qual o nome do personagem que lidera a 'caça às bruxas' contra o Hellfire Club?",
    "alternativas": ["Billy Hargrove", "Jason Carver", "Troy", "James", "Andy"],
    "correctAnswer": "Jason Carver",
    "subject": "Stranger Things"
  },
  {
    "id": "st63",
    "descricao": "Na 4ª temporada, como Nancy percebe que Vecna está no mundo invertido?",
    "alternativas": ["Através de um rádio", "Pelos diários dela no passado", "Por uma foto da Barb", "Por causa de uma aranha", "Através das luzes"],
    "correctAnswer": "Pelos diários dela no passado",
    "subject": "Stranger Things"
  },
  {
    "id": "st64",
    "descricao": "Qual o nome da técnica que Eleven usa para localizar pessoas no 'Vazio'?",
    "alternativas": ["Projeção Astral", "Visão Remota", "Telepatia Cinética", "Mergulho Mental", "Psicoscopia"],
    "correctAnswer": "Visão Remota",
    "subject": "Stranger Things"
  },
  {
    "id": "st65",
    "descricao": "Qual o nome do xerife que substitui Hopper temporariamente?",
    "alternativas": ["Powell", "Callahan", "Owens", "Clarke", "Higgins"],
    "correctAnswer": "Powell",
    "subject": "Stranger Things"
  },
  {
    "id": "st66",
    "descricao": "Quantos quilos de sal de cozinha são usados para fazer o tanque de privação sensorial na escola?",
    "alternativas": ["100 kg", "250 kg", "500 kg", "680 kg", "800 kg"],
    "correctAnswer": "680 kg",
    "subject": "Stranger Things"
  },
  {
    "id": "st67",
    "descricao": "Qual é o nome da gíria russa que Robin e Steve tentam traduzir na 3ª temporada?",
    "alternativas": ["Dlinnaya Neft", "Serebryanyy Kit", "Krasnaya Zvezda", "Podzemka", "Matryoshka"],
    "correctAnswer": "Serebryanyy Kit (Silver Cat)",
    "subject": "Stranger Things"
  },
  {
    "id": "st68",
    "descricao": "O que significa a sigla MKUltra?",
    "alternativas": ["Mind Killer Ultra", "Mind Kontrolle Ultra", "Military King Ultra", "Master Key Ultra", "Mental Knowledge Ultra"],
    "correctAnswer": "Mind Kontrolle Ultra",
    "subject": "Stranger Things"
  },
  {
    "id": "st69",
    "descricao": "Em qual feriado se passa a maior parte da 3ª temporada?",
    "alternativas": ["Natal", "Halloween", "4 de Julho", "Dia de Ação de Graças", "Páscoa"],
    "correctAnswer": "4 de Julho",
    "subject": "Stranger Things"
  },
  {
    "id": "st70",
    "descricao": "Qual é o nome da música que toca no final do baile de inverno na 2ª temporada?",
    "alternativas": ["Every Breath You Take", "Time After Time", "Careless Whisper", "Take on Me", "True Colors"],
    "correctAnswer": "Every Breath You Take",
    "subject": "Stranger Things"
  },
  {
    "id": "st71",
    "descricao": "Qual o nome da lanchonete onde o dono tenta ajudar a Eleven na 1ª temporada?",
    "alternativas": ["Benny's Burgers", "Hawkins Diner", "Hopper's Grill", "The Palace", "Melvald's"],
    "correctAnswer": "Benny's Burgers",
    "subject": "Stranger Things"
  },
  {
    "id": "st72",
    "descricao": "Quem criou a série Stranger Things?",
    "alternativas": ["Irmãos Russo", "Irmãos Duffer", "Shawn Levy", "Steven Spielberg", "J.J. Abrams"],
    "correctAnswer": "Irmãos Duffer",
    "subject": "Stranger Things"
  },
  {
    "id": "st73",
    "descricao": "Qual a cor dos olhos do Demogorgon?",
    "alternativas": ["Vermelho", "Amarelo", "Azul", "Ele não tem olhos", "Branco"],
    "correctAnswer": "Ele não tem olhos",
    "subject": "Stranger Things"
  },
  {
    "id": "st74",
    "descricao": "O que o grupo de amigos chama de 'Caminho das Flores' na 4ª temporada?",
    "alternativas": ["Um jardim no mundo invertido", "O rastro deixado por Vecna", "As fendas no teto do trailer", "A estrada para Lenora Hills", "O portal na floresta"],
    "correctAnswer": "As fendas no teto do trailer",
    "subject": "Stranger Things"
  },
  {
    "id": "st75",
    "descricao": "Qual é o nome do animal de estimação de Will Byers que morre antes da 2ª temporada?",
    "alternativas": ["Chester", "Buster", "Duke", "Sparky", "Bear"],
    "correctAnswer": "Chester",
    "subject": "Stranger Things"
  },
  {
    "id": "st76",
    "descricao": "Qual é o nome da loja de departamentos onde a Joyce Byers trabalha?",
    "alternativas": ["JCPenney", "Melvald's General Store", "Hawkins Square Shop", "Bradley's Big Buy", "Sears"],
    "correctAnswer": "Melvald's General Store",
    "subject": "Stranger Things"
  },
  {
    "id": "st77",
    "descricao": "Qual o nome do personagem 'Número 010' que aparece no flashback da 4ª temporada?",
    "alternativas": ["Benny", "Peter", "Andrew", "Christopher", "Ele não tem nome, apenas número"],
    "correctAnswer": "Ele não tem nome, apenas número",
    "subject": "Stranger Things"
  },
  {
    "id": "st78",
    "descricao": "Qual é o nome do clube de vídeo onde Steve e Robin trabalham na 4ª temporada?",
    "alternativas": ["Blockbuster", "Family Video", "Hawkins Video", "Captain Video", "Starcourt Video"],
    "correctAnswer": "Family Video",
    "subject": "Stranger Things"
  },
  {
    "id": "st79",
    "descricao": "O que o grupo usa para flutuar no portal do lago (Lovers Lake)?",
    "alternativas": ["Um barco a motor", "Pranchas de surf", "Um bote inflável", "Colchões de air", "Boias de pneu"],
    "correctAnswer": "Um bote inflável",
    "subject": "Stranger Things"
  },
  {
    "id": "st80",
    "descricao": "Quantos anos Eleven tinha quando os eventos da 1ª temporada começaram?",
    "alternativas": ["10 anos", "11 anos", "12 anos", "13 anos", "14 anos"],
    "correctAnswer": "12 anos",
    "subject": "Stranger Things"
  },
  {
    "id": "st81",
    "descricao": "Qual é o nome do pai de Henry Creel (Vecna)?",
    "alternativas": ["Martin Creel", "Victor Creel", "Andrew Creel", "Peter Creel", "Sam Creel"],
    "correctAnswer": "Victor Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st82",
    "descricao": "O que Lucas Sinclair usa para sinalizar o grupo na 1ª temporada?",
    "alternativas": ["Um apito", "Um binóculo", "Um rádio amador", "Um espelho", "Lanternas"],
    "correctAnswer": "Um rádio amador",
    "subject": "Stranger Things"
  },
  {
    "id": "st83",
    "descricao": "Qual o nome da técnica de luta que Hopper usa contra o Demogorgon na prisão russa?",
    "alternativas": ["Ele usa um taco", "Ele usa uma espada", "Ele usa um lança-chamas", "Ele usa as próprias mãos", "Ele usa uma granada"],
    "correctAnswer": "Ele usa uma espada",
    "subject": "Stranger Things"
  },
  {
    "id": "st84",
    "descricao": "Qual é a cor da fita cassete que contém a música favorita de Max?",
    "alternativas": ["Vermelha", "Azul", "Verde", "Amarela", "Transparente"],
    "correctAnswer": "Azul",
    "subject": "Stranger Things"
  },
  {
    "id": "st85",
    "descricao": "Qual o nome do bar onde Hopper costuma ir na 1ª temporada?",
    "alternativas": ["The Hideaway", "Benny's Place", "Hawkins Pub", "The Quarry", "Roane's"],
    "correctAnswer": "The Hideaway",
    "subject": "Stranger Things"
  },
  {
    "id": "st86",
    "descricao": "O que Murray Bauman era antes de se tornar um investigador conspiracionista?",
    "alternativas": ["Policial", "Jornalista", "Professor de História", "Agente da CIA", "Advogado"],
    "correctAnswer": "Jornalista",
    "subject": "Stranger Things"
  },
  {
    "id": "st87",
    "descricao": "Qual o nome da babá da Holly Wheeler que aparece brevemente?",
    "alternativas": ["Barb", "Vickie", "Heather", "Stacy", "Ela não tem babá"],
    "correctAnswer": "Ela não tem babá",
    "subject": "Stranger Things"
  },
  {
    "id": "st88",
    "descricao": "Qual o nome do gato da família Henderson que é comido pelo Dart?",
    "alternativas": ["Mews", "Whiskers", "Tigger", "Simba", "Oliver"],
    "correctAnswer": "Mews",
    "subject": "Stranger Things"
  },
  {
    "id": "st89",
    "descricao": "Em que dia e mês é celebrado o 'Stranger Things Day'?",
    "alternativas": ["15 de julho", "31 de outubro", "6 de novembro", "4 de julho", "25 de dezembro"],
    "correctAnswer": "6 de novembro",
    "subject": "Stranger Things"
  },
  {
    "id": "st90",
    "descricao": "Qual a marca do carro do Steve Harrington?",
    "alternativas": ["Chevrolet Camarro", "Ford Mustang", "BMW 733i", "Toyota Corolla", "Pontiac Firebird"],
    "correctAnswer": "BMW 733i",
    "subject": "Stranger Things"
  },
  {
    "id": "st91",
    "descricao": "Qual personagem diz a famosa frase: 'Friends don't lie' (Amigos não mentem)?",
    "alternativas": ["Mike", "Eleven", "Hopper", "Will", "Dustin"],
    "correctAnswer": "Eleven",
    "subject": "Stranger Things"
  },
  {
    "id": "st92",
    "descricao": "Qual o nome do monstro que Vecna enviou para a Geórgia (Rússia) na 4ª temporada?",
    "alternativas": ["Democão", "Demobat", "Demogorgon", "Devorador de Mentes", "Aranha"],
    "correctAnswer": "Demogorgon",
    "subject": "Stranger Things"
  },
  {
    "id": "st93",
    "descricao": "Qual a cor dos uniformes dos funcionários do Laboratório de Hawkins?",
    "alternativas": ["Branco", "Azul claro", "Cinza", "Verde militar", "Bege"],
    "correctAnswer": "Branco",
    "subject": "Stranger Things"
  },
  {
    "id": "st94",
    "descricao": "Quem Mike Wheeler acha que é o espião no grupo na 2ª temporada?",
    "alternativas": ["Max", "Eleven", "Will", "Bob", "Dustin"],
    "correctAnswer": "Will",
    "subject": "Stranger Things"
  },
  {
    "id": "st95",
    "descricao": "Qual o nome do refrigerante que Eleven experimenta e não gosta na 1ª temporada?",
    "alternativas": ["Coca-Cola", "Pepsi", "Sprite", "Dr Pepper", "Fanta"],
    "correctAnswer": "Coca-Cola",
    "subject": "Stranger Things"
  },
  {
    "id": "st96",
    "descricao": "Qual o nome da vizinha idosa de Nancy que está sendo controlada pelo Devorador?",
    "alternativas": ["Sra. Wheeler", "Sra. Driscoll", "Sra. Henderson", "Sra. Creel", "Sra. Byers"],
    "correctAnswer": "Sra. Driscoll",
    "subject": "Stranger Things"
  },
  {
    "id": "st97",
    "descricao": "Quantas temporadas tem a série (até o final de 2024)?",
    "alternativas": ["3", "4", "5", "6", "2"],
    "correctAnswer": "4",
    "subject": "Stranger Things"
  },
  {
    "id": "st98",
    "descricao": "Qual o nome do local onde Hopper e Joyce encontram a Eleven na 1ª temporada?",
    "alternativas": ["Floresta Mirkwood", "Biblioteca", "Laboratório", "Castelo Byers", "Escola"],
    "correctAnswer": "Laboratório",
    "subject": "Stranger Things"
  },
  {
    "id": "st99",
    "descricao": "Qual personagem é conhecido por amar teorias da conspiração?",
    "alternativas": ["Murray Bauman", "Jim Hopper", "Dr. Owens", "Scott Clarke", "Ted Wheeler"],
    "correctAnswer": "Murray Bauman",
    "subject": "Stranger Things"
  },
  {
    "id": "st100",
    "descricao": "Qual o nome do pequeno forte que Will construiu na floresta?",
    "alternativas": ["Fort Will", "Castle Byers", "Mirkwood Home", "The Bunker", "Will’s Nest"],
    "correctAnswer": "Castle Byers",
    "subject": "Stranger Things"
  }
];

module.exports = {questionsST}