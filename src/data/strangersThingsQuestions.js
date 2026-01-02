const questionsST = [
  {
    "id": "st01",
    "descricao": "Qual é o nome real da Eleven (Onze)?",
    "alternativas": ["A. Jane Ives", "B. Sara Hopper", "C. Max Mayfield", "D. Nancy Wheeler", "E. Erica Sinclair"],
    "correctAnswer": "A. Jane Ives",
    "subject": "Stranger Things"
  },
  {
    "id": "st02",
    "descricao": "Qual é a comida favorita da Eleven?",
    "alternativas": ["A. Pizza de Peperoni", "B. Hambúrguer", "C. Batata Frita", "D. Waffles Eggo", "E. Sorvete"],
    "correctAnswer": "D. Waffles Eggo",
    "subject": "Stranger Things"
  },
  {
    "id": "st03",
    "descricao": "Como se chama o jogo de RPG que os garotos jogam no porão?",
    "alternativas": ["A. Magic", "B. Dungeons & Dragons", "C. Warhammer", "D. World of Warcraft", "E. Catan"],
    "correctAnswer": "B. Dungeons & Dragons",
    "subject": "Stranger Things"
  },
  {
    "id": "st04",
    "descricao": "Qual o nome da dimensão paralela e sombria de Hawkins?",
    "alternativas": ["A. O Vazio", "B. Mundo Inferior", "C. Mundo Invertido", "D. Lado Sombrio", "E. O Abismo"],
    "correctAnswer": "C. Mundo Invertido",
    "subject": "Stranger Things"
  },
  {
    "id": "st05",
    "descricao": "Quem desaparece no primeiro episódio da primeira temporada?",
    "alternativas": ["A. Mike Wheeler", "B. Dustin Henderson", "C. Lucas Sinclair", "D. Will Byers", "E. Barb Holland"],
    "correctAnswer": "D. Will Byers",
    "subject": "Stranger Things"
  },
  {
    "id": "st06",
    "descricao": "Qual o nome do monstro sem rosto da primeira temporada?",
    "alternativas": ["A. Devorador de Mentes", "B. Demogorgon", "C. Vecna", "D. Democão", "E. Aranha Gigante"],
    "correctAnswer": "B. Demogorgon",
    "subject": "Stranger Things"
  },
  {
    "id": "st07",
    "descricao": "Joyce comunica-se com Will no Mundo Invertido através de quê?",
    "alternativas": ["A. Rádio Amador", "B. Telefone fixo", "C. Luzes de Natal", "D. Desenhos na parede", "E. Espelhos"],
    "correctAnswer": "C. Luzes de Natal",
    "subject": "Stranger Things"
  },
  {
    "id": "st08",
    "descricao": "Em qual estado americano fica a cidade de Hawkins?",
    "alternativas": ["A. Indiana", "B. Illinois", "C. Ohio", "D. Texas", "E. Califórnia"],
    "correctAnswer": "A. Indiana",
    "subject": "Stranger Things"
  },
  {
    "id": "st09",
    "descricao": "Qual o nome da sorveteria onde Steve e Robin trabalham na 3ª temporada?",
    "alternativas": ["A. Scoops Ahoy", "B. Ice Cream Palace", "C. Baskin Robbins", "D. Sailor Sorvetes", "E. Hawkins Dairy"],
    "correctAnswer": "A. Scoops Ahoy",
    "subject": "Stranger Things"
  },
  {
    "id": "st10",
    "descricao": "Como Eleven chama o Dr. Brenner?",
    "alternativas": ["A. Doutor", "B. Mestre", "C. Senhor", "D. Papai", "E. Criador"],
    "correctAnswer": "D. Papai",
    "subject": "Stranger Things"
  },
  {
    "id": "st11",
    "descricao": "Qual é a profissão de Jim Hopper?",
    "alternativas": ["A. Bombeiro", "B. Xerife", "C. Segurança de Laboratório", "D. Professor", "E. Detetive Particular"],
    "correctAnswer": "B. Xerife",
    "subject": "Stranger Things"
  },
  {
    "id": "st12",
    "descricao": "Qual o apelido que Dustin dá ao seu pequeno animal de estimação (Democão)?",
    "alternativas": ["A. Dart", "B. Rex", "C. Sparky", "D. Buddy", "E. Fang"],
    "correctAnswer": "A. Dart",
    "subject": "Stranger Things"
  },
  {
    "id": "st13",
    "descricao": "Qual o nome da irmã do Lucas que adora provocar os garotos?",
    "alternativas": ["A. Robin", "B. Suzie", "C. Erica", "D. Holly", "E. Barb"],
    "correctAnswer": "C. Erica",
    "subject": "Stranger Things"
  },
  {
    "id": "st14",
    "descricao": "Qual é o nome da música favorita de Max que a salva de Vecna?",
    "alternativas": ["A. Master of Puppets", "B. Should I Stay or Should I Go", "C. Running Up That Hill", "D. Never Surrender", "E. Material Girl"],
    "correctAnswer": "C. Running Up That Hill",
    "subject": "Stranger Things"
  },
  {
    "id": "st15",
    "descricao": "Quem é o vilão principal da 4ª temporada?",
    "alternativas": ["A. Billy Hargrove", "B. Dr. Owens", "C. Vecna", "D. Grigori", "E. Devorador de Mentes"],
    "correctAnswer": "C. Vecna",
    "subject": "Stranger Things"
  },
  {
    "id": "st16",
    "descricao": "Qual o nome do namorado da Joyce na 2ª temporada que morre tragicamente?",
    "alternativas": ["A. Bob Newby", "B. Murray Bauman", "C. Lonnie Byers", "D. Scott Clarke", "E. Benny Hammond"],
    "correctAnswer": "A. Bob Newby",
    "subject": "Stranger Things"
  },
  {
    "id": "st17",
    "descricao": "Onde o grupo de amigos costuma se reunir para conversar via rádio?",
    "alternativas": ["A. Escola Hawkins", "B. Shopping Starcourt", "C. Porão do Mike", "D. Delegacia", "E. Casa do Will"],
    "correctAnswer": "C. Porão do Mike",
    "subject": "Stranger Things"
  },
  {
    "id": "st18",
    "descricao": "Qual o nome da namorada do Dustin que mora em Utah?",
    "alternativas": ["A. Max", "B. Suzie", "C. Robin", "D. Heather", "E. Chrissy"],
    "correctAnswer": "B. Suzie",
    "subject": "Stranger Things"
  },
  {
    "id": "st19",
    "descricao": "Qual personagem se sacrifica tocando Metallica no Mundo Invertido?",
    "alternativas": ["A. Steve Harrington", "B. Jonathan Byers", "C. Eddie Munson", "D. Billy Hargrove", "E. Argyle"],
    "correctAnswer": "C. Eddie Munson",
    "subject": "Stranger Things"
  },
  {
    "id": "st20",
    "descricao": "Qual o nome do shopping que é destaque na 3ª temporada?",
    "alternativas": ["A. Hawkins Mall", "B. Starcourt Mall", "C. Grand Central", "D. Liberty Mall", "E. Town Square"],
    "correctAnswer": "B. Starcourt Mall",
    "subject": "Stranger Things"
  },
  {
    "id": "st21",
    "descricao": "Qual é o número tatuado no braço da Eleven?",
    "alternativas": ["A. 001", "B. 007", "C. 011", "D. 008", "E. 010"],
    "correctAnswer": "C. 011",
    "subject": "Stranger Things"
  },
  {
    "id": "st22",
    "descricao": "Quem é o pai biológico da Eleven?",
    "alternativas": ["A. Jim Hopper", "B. Martin Brenner", "C. Andrew Rich", "D. Sam Owens", "E. Henry Creel"],
    "correctAnswer": "C. Andrew Rich",
    "subject": "Stranger Things"
  },
  {
    "id": "st23",
    "descricao": "Qual o nome do clube de RPG liderado por Eddie Munson?",
    "alternativas": ["A. Hellfire Club", "B. Dragon Club", "C. Hawkins Knights", "D. Fireballers", "E. The Party"],
    "correctAnswer": "A. Hellfire Club",
    "subject": "Stranger Things"
  },
  {
    "id": "st24",
    "descricao": "Em que ano a série começa (1ª temporada)?",
    "alternativas": ["A. 1980", "B. 1983", "C. 1985", "D. 1988", "E. 1990"],
    "correctAnswer": "B. 1983",
    "subject": "Stranger Things"
  },
  {
    "id": "st25",
    "descricao": "Qual é o nome da melhor amiga de Nancy que desaparece na piscina?",
    "alternativas": ["A. Robin", "B. Chrissy", "C. Heather", "D. Barb", "E. Eden"],
    "correctAnswer": "D. Barb",
    "subject": "Stranger Things"
  },
  {
    "id": "st26",
    "descricao": "Qual é o nome da mãe biológica da Eleven?",
    "alternativas": ["A. Joyce Byers", "B. Terry Ives", "C. Karen Wheeler", "D. Claudia Henderson", "E. Virginia Creel"],
    "correctAnswer": "B. Terry Ives",
    "subject": "Stranger Things"
  },
  {
    "id": "st27",
    "descricao": "Qual personagem é conhecido por suas habilidades com o estilingue?",
    "alternativas": ["A. Mike", "B. Dustin", "C. Lucas", "D. Will", "E. Steve"],
    "correctAnswer": "C. Lucas",
    "subject": "Stranger Things"
  },
  {
    "id": "st28",
    "descricao": "Qual o nome da substância que os russos usam para abrir o portal na 3ª temporada?",
    "alternativas": ["A. Ectoplasma", "B. Energon", "C. Líquido Verde", "D. Chave de Prometeu", "E. Ouro de Tiamat"],
    "correctAnswer": "C. Líquido Verde",
    "subject": "Stranger Things"
  },
  {
    "id": "st29",
    "descricao": "Como se chama a 'irmã' de Eleven que aparece na 2ª temporada (Número 008)?",
    "alternativas": ["A. Kali", "B. Sara", "C. Maya", "D. Linnea", "E. Shiela"],
    "correctAnswer": "A. Kali",
    "subject": "Stranger Things"
  },
  {
    "id": "st30",
    "descricao": "Qual é o nome do jornal onde Nancy e Jonathan trabalham na 3ª temporada?",
    "alternativas": ["A. Hawkins Post", "B. Indiana Daily", "C. The Gazette", "D. Hawkins Ledger", "E. Starcourt News"],
    "correctAnswer": "A. Hawkins Post",
    "subject": "Stranger Things"
  },
  {
    "id": "st31",
    "descricao": "Quem é o irmão de Max que se torna hospedeiro do Devorador de Mentes?",
    "alternativas": ["A. Jason Carver", "B. Billy Hargrove", "C. Troy", "D. James", "E. Neil"],
    "correctAnswer": "B. Billy Hargrove",
    "subject": "Stranger Things"
  },
  {
    "id": "st32",
    "descricao": "Qual é o nome da pizzaria onde Argyle trabalha na 4ª temporada?",
    "alternativas": ["A. Pizza Hut", "B. Surfer Boy Pizza", "C. California Crust", "D. Pineapple Express", "E. Domino's"],
    "correctAnswer": "B. Surfer Boy Pizza",
    "subject": "Stranger Things"
  },
  {
    "id": "st33",
    "descricao": "Qual o nome do laboratório onde Eleven foi criada?",
    "alternativas": ["A. Laboratório de Hawkins", "B. Divisão de Energia", "C. Projeto MKUltra", "D. Centro de Pesquisa Indiana", "E. Base Russa"],
    "correctAnswer": "A. Laboratório de Hawkins",
    "subject": "Stranger Things"
  },
  {
    "id": "st34",
    "descricao": "O que o grupo usa para se proteger contra as abelhas/morcegos no Mundo Invertido na 4ª temporada?",
    "alternativas": ["A. Armaduras de metal", "B. Escudos de madeira e pregos", "C. Coquetéis Molotov", "D. Capas de chuva", "E. Lança-chamas"],
    "correctAnswer": "B. Escudos de madeira e pregos",
    "subject": "Stranger Things"
  },
  {
    "id": "st35",
    "descricao": "Qual o nome do apresentador do programa 'The Upside Down' que Murray adora investigar?",
    "alternativas": ["A. Ted Wheeler", "B. Murray Bauman", "C. Yuri", "D. Enzo", "E. Alexei"],
    "correctAnswer": "B. Murray Bauman",
    "subject": "Stranger Things"
  },
  {
    "id": "st36",
    "descricao": "Qual objeto Dustin usa para detectar radiação e encontrar o sinal dos russos?",
    "alternativas": ["A. Cerebro", "B. Walkie-talkie", "C. Bússola", "D. Contador Geiger", "E. Telescópio"],
    "correctAnswer": "A. Cerebro",
    "subject": "Stranger Things"
  },
  {
    "id": "st37",
    "descricao": "Como Eleven perdeu seus poderes no final da 3ª temporada?",
    "alternativas": ["A. Após lutar com Billy", "B. Mordida pelo Devorador de Mentes", "C. Uso excessivo contra o portal", "D. Bloqueio mental de Brenner", "E. Veneno russo"],
    "correctAnswer": "B. Mordida pelo Devorador de Mentes",
    "subject": "Stranger Things"
  },
  {
    "id": "st38",
    "descricao": "Qual o nome do cientista russo que fica amigo de Hopper e Joyce e ama Slurpees de cereja?",
    "alternativas": ["A. Ivan", "B. Boris", "C. Alexei", "D. Dimitri", "E. Vladimir"],
    "correctAnswer": "C. Alexei",
    "subject": "Stranger Things"
  },
  {
    "id": "st39",
    "descricao": "Qual o nome da mansão onde a família Creel morava?",
    "alternativas": ["A. Mansão Creel", "B. Casa do Horror", "C. Residência Victor", "D. Solar Hawkins", "E. Casa das Rosas"],
    "correctAnswer": "A. Mansão Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st40",
    "descricao": "Qual é o nome da música que Dustin e Suzie cantam via rádio?",
    "alternativas": ["A. NeverEnding Story", "B. Total Eclipse of the Heart", "C. Africa", "D. Heroes", "E. Every Breath You Take"],
    "correctAnswer": "A. NeverEnding Story",
    "subject": "Stranger Things"
  },
  {
    "id": "st41",
    "descricao": "O que aconteceu com a perna de Max no final da 4ª temporada?",
    "alternativas": ["A. Foi cortada", "B. Ficou paralisada", "C. Foi quebrada por Vecna", "D. Nada aconteceu", "E. Ela perdeu a perna"],
    "correctAnswer": "C. Foi quebrada por Vecna",
    "subject": "Stranger Things"
  },
  {
    "id": "st42",
    "descricao": "Qual o nome do guarda russo que ajuda Hopper na prisão?",
    "alternativas": ["A. Yuri", "B. Enzo (Dimitri)", "C. Mikhail", "D. Grigori", "E. Stefan"],
    "correctAnswer": "B. Enzo (Dimitri)",
    "subject": "Stranger Things"
  },
  {
    "id": "st43",
    "descricao": "Qual é a cor principal do Devorador de Mentes quando aparece como fumaça?",
    "alternativas": ["A. Vermelho", "B. Azul", "C. Verde", "D. Preto/Cinza Escuro", "E. Roxo"],
    "correctAnswer": "D. Preto/Cinza Escuro",
    "subject": "Stranger Things"
  },
  {
    "id": "st44",
    "descricao": "Quem Mike Wheeler convidou para o Baile de Inverno (Snow Ball)?",
    "alternativas": ["A. Max", "B. Nancy", "C. Eleven", "D. Barb", "E. Robin"],
    "correctAnswer": "C. Eleven",
    "subject": "Stranger Things"
  },
  {
    "id": "st45",
    "descricao": "Qual é o nome do projeto secreto do governo que originou a Eleven?",
    "alternativas": ["A. MKUltra", "B. Projeto Paperclip", "C. Operação Hawkins", "D. Projeto Indigo", "E. Área 51"],
    "correctAnswer": "A. MKUltra",
    "subject": "Stranger Things"
  },
  {
    "id": "st46",
    "descricao": "Como Vecna escolhe suas vítimas?",
    "alternativas": ["A. Pessoas mais ricas", "B. Quem joga D&D", "C. Jovens com traumas e culpa", "D. Quem mora perto da floresta", "E. Aleatoriamente"],
    "correctAnswer": "C. Jovens com traumas e culpa",
    "subject": "Stranger Things"
  },
  {
    "id": "st47",
    "descricao": "Qual o nome da cidade na Califórnia para onde os Byers se mudam?",
    "alternativas": ["A. Los Angeles", "B. Lenora Hills", "C. Santa Monica", "D. Sunnyvale", "E. San Diego"],
    "correctAnswer": "B. Lenora Hills",
    "subject": "Stranger Things"
  },
  {
    "id": "st48",
    "descricao": "Qual é a arma icônica de Steve Harrington?",
    "alternativas": ["A. Um revólver", "B. Um taco de beisebol com pregos", "C. Um canivete", "D. Um machado", "E. Uma funda"],
    "correctAnswer": "B. Um taco de beisebol com pregos",
    "subject": "Stranger Things"
  },
  {
    "id": "st49",
    "descricao": "Qual personagem é o primeiro a morrer por Vecna na 4ª temporada?",
    "alternativas": ["A. Fred Benson", "B. Patrick McKinney", "C. Chrissy Cunningham", "D. Eddie Munson", "E. Max"],
    "correctAnswer": "C. Chrissy Cunningham",
    "subject": "Stranger Things"
  },
  {
    "id": "st50",
    "descricao": "Qual o nome do ator que interpreta o Jim Hopper?",
    "alternativas": ["A. Finn Wolfhard", "B. David Harbour", "C. Gaten Matarazzo", "D. Joe Keery", "E. Noah Schnapp"],
    "correctAnswer": "B. David Harbour",
    "subject": "Stranger Things"
  },
  {
    "id": "st51",
    "descricao": "Qual é o nome do primeiro episódio da primeira temporada da série?",
    "alternativas": ["A. O Mundo Invertido", "B. O Desaparecimento de Will Byers", "C. A Esquisita da Rua Maple", "D. O Laboratório", "E. O Corpo"],
    "correctAnswer": "B. O Desaparecimento de Will Byers",
    "subject": "Stranger Things"
  },
  {
    "id": "st52",
    "descricao": "Qual o nome do personagem que é o 'Número 001' no laboratório de Hawkins?",
    "alternativas": ["A. Henry Creel", "B. Martin Brenner", "C. Andrew Rich", "D. Peter Ballard", "E. Victor Creel"],
    "correctAnswer": "A. Henry Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st53",
    "descricao": "Na 2ª temporada, qual fantasia de Halloween o grupo de amigos usa?",
    "alternativas": ["A. Star Wars", "B. Os Caça-Fantasmas", "C. De Volta para o Futuro", "D. E.T. O Extraterrestre", "E. Indiana Jones"],
    "correctAnswer": "B. Os Caça-Fantasmas",
    "subject": "Stranger Things"
  },
  {
    "id": "st54",
    "descricao": "Qual é a condição médica real de Gaten Matarazzo (Dustin) que foi incorporada ao personagem?",
    "alternativas": ["A. Dislexia", "B. Displasia Cleidocraniana", "C. Daltonismo", "D. Asma Crônica", "E. Escoliose"],
    "correctAnswer": "B. Displasia Cleidocraniana",
    "subject": "Stranger Things"
  },
  {
    "id": "st55",
    "descricao": "Qual o nome da substância que os russos estavam extraindo em Kamchatka na 4ª temporada?",
    "alternativas": ["A. Sangue de Demogorgon", "B. Matéria Escura", "C. Partículas do Devorador", "D. Ferro Fluido", "E. Vapor de Almas"],
    "correctAnswer": "C. Partículas do Devorador",
    "subject": "Stranger Things"
  },
  {
    "id": "st56",
    "descricao": "Quantas badaladas de relógio as vítimas de Vecna ouvem antes de morrer?",
    "alternativas": ["A. Duas", "B. Três", "C. Quatro", "D. Cinco", "E. Seis"],
    "correctAnswer": "C. Quatro",
    "subject": "Stranger Things"
  },
  {
    "id": "st57",
    "descricao": "Qual é o nome do fliperama onde os garotos passam o tempo na 2ª temporada?",
    "alternativas": ["A. Palace Arcade", "B. Hawkins Gaming", "C. Starcourt Games", "D. Joystick Hub", "E. Retro Pixel"],
    "correctAnswer": "A. Palace Arcade",
    "subject": "Stranger Things"
  },
  {
    "id": "st58",
    "descricao": "Quem ensina Eleven sobre 'Promessas' na 1ª temporada?",
    "alternativas": ["A. Hopper", "B. Mike", "C. Dustin", "D. Lucas", "E. Joyce"],
    "correctAnswer": "B. Mike",
    "subject": "Stranger Things"
  },
  {
    "id": "st59",
    "descricao": "Qual o nome da rádio amador que Dustin constrói para falar com Suzie?",
    "alternativas": ["A. Cerebro", "B. Magnon", "C. Apollo", "D. Big Ear", "E. Silver Fox"],
    "correctAnswer": "A. Cerebro",
    "subject": "Stranger Things"
  },
  {
    "id": "st60",
    "descricao": "Qual é o nome do monstro formado por restos humanos e ratos na 3ª temporada?",
    "alternativas": ["A. O Esfolado (The Flayed)", "B. O Carniceiro", "C. Monstro de Flesh", "D. O Amálgama", "E. Rato-Rei"],
    "correctAnswer": "A. O Esfolado (The Flayed)",
    "subject": "Stranger Things"
  },
  {
    "id": "st61",
    "descricao": "O que Steve Harrington usa no cabelo para deixá-lo tão volumoso?",
    "alternativas": ["A. Laquê comum", "B. Spray Fabergé Organics", "C. Gel de babosa", "D. Água e açúcar", "E. Pomada modeladora"],
    "correctAnswer": "B. Spray Fabergé Organics",
    "subject": "Stranger Things"
  },
  {
    "id": "st62",
    "descricao": "Qual o nome do personagem que lidera a 'caça às bruxas' contra o Hellfire Club?",
    "alternativas": ["A. Billy Hargrove", "B. Jason Carver", "C. Troy", "D. James", "E. Andy"],
    "correctAnswer": "B. Jason Carver",
    "subject": "Stranger Things"
  },
  {
    "id": "st63",
    "descricao": "Na 4ª temporada, como Nancy percebe que Vecna está no mundo invertido?",
    "alternativas": ["A. Através de um rádio", "B. Pelos diários dela no passado", "C. Por uma foto da Barb", "D. Por causa de uma aranha", "E. Através das luzes"],
    "correctAnswer": "B. Pelos diários dela no passado",
    "subject": "Stranger Things"
  },
  {
    "id": "st64",
    "descricao": "Qual o nome da técnica que Eleven usa para localizar pessoas no 'Vazio'?",
    "alternativas": ["A. Projeção Astral", "B. Visão Remota", "C. Telepatia Cinética", "D. Mergulho Mental", "E. Psicoscopia"],
    "correctAnswer": "B. Visão Remota",
    "subject": "Stranger Things"
  },
  {
    "id": "st65",
    "descricao": "Qual o nome do xerife que substitui Hopper temporariamente?",
    "alternativas": ["A. Powell", "B. Callahan", "C. Owens", "D. Clarke", "E. Higgins"],
    "correctAnswer": "A. Powell",
    "subject": "Stranger Things"
  },
  {
    "id": "st66",
    "descricao": "Quantos quilos de sal de cozinha são usados para fazer o tanque de privação sensorial na escola?",
    "alternativas": ["A. 100 kg", "B. 250 kg", "C. 500 kg", "D. 680 kg", "E. 800 kg"],
    "correctAnswer": "D. 680 kg",
    "subject": "Stranger Things"
  },
  {
    "id": "st67",
    "descricao": "Qual é o nome da gíria russa que Robin e Steve tentam traduzir na 3ª temporada?",
    "alternativas": ["A. Dlinnaya Neft", "B. Serebryanyy Kit", "C. Krasnaya Zvezda", "D. Podzemka", "E. Matryoshka"],
    "correctAnswer": "B. Serebryanyy Kit (Silver Cat)",
    "subject": "Stranger Things"
  },
  {
    "id": "st68",
    "descricao": "O que significa a sigla MKUltra?",
    "alternativas": ["A. Mind Killer Ultra", "B. Mind Kontrolle Ultra", "C. Military King Ultra", "D. Master Key Ultra", "E. Mental Knowledge Ultra"],
    "correctAnswer": "B. Mind Kontrolle Ultra",
    "subject": "Stranger Things"
  },
  {
    "id": "st69",
    "descricao": "Em qual feriado se passa a maior parte da 3ª temporada?",
    "alternativas": ["A. Natal", "B. Halloween", "C. 4 de Julho", "D. Dia de Ação de Graças", "E. Páscoa"],
    "correctAnswer": "C. 4 de Julho",
    "subject": "Stranger Things"
  },
  {
    "id": "st70",
    "descricao": "Qual é o nome da música que toca no final do baile de inverno na 2ª temporada?",
    "alternativas": ["A. Every Breath You Take", "B. Time After Time", "C. Careless Whisper", "D. Take on Me", "E. True Colors"],
    "correctAnswer": "A. Every Breath You Take",
    "subject": "Stranger Things"
  },
  {
    "id": "st71",
    "descricao": "Qual o nome da lanchonete onde o dono tenta ajudar a Eleven na 1ª temporada?",
    "alternativas": ["A. Benny's Burgers", "B. Hawkins Diner", "C. Hopper's Grill", "D. The Palace", "E. Melvald's"],
    "correctAnswer": "A. Benny's Burgers",
    "subject": "Stranger Things"
  },
  {
    "id": "st72",
    "descricao": "Quem criou a série Stranger Things?",
    "alternativas": ["A. Irmãos Russo", "B. Irmãos Duffer", "C. Shawn Levy", "D. Steven Spielberg", "E. J.J. Abrams"],
    "correctAnswer": "B. Irmãos Duffer",
    "subject": "Stranger Things"
  },
  {
    "id": "st73",
    "descricao": "Qual a cor dos olhos do Demogorgon?",
    "alternativas": ["A. Vermelho", "B. Amarelo", "C. Azul", "D. Ele não tem olhos", "E. Branco"],
    "correctAnswer": "D. Ele não tem olhos",
    "subject": "Stranger Things"
  },
  {
    "id": "st74",
    "descricao": "O que o grupo de amigos chama de 'Caminho das Flores' na 4ª temporada?",
    "alternativas": ["A. Um jardim no mundo invertido", "B. O rastro deixado por Vecna", "C. As fendas no teto do trailer", "D. A estrada para Lenora Hills", "E. O portal na floresta"],
    "correctAnswer": "C. As fendas no teto do trailer",
    "subject": "Stranger Things"
  },
  {
    "id": "st75",
    "descricao": "Qual é o nome do animal de estimação de Will Byers que morre antes da 2ª temporada?",
    "alternativas": ["A. Chester", "B. Buster", "C. Duke", "D. Sparky", "E. Bear"],
    "correctAnswer": "A. Chester",
    "subject": "Stranger Things"
  },
  {
    "id": "st76",
    "descricao": "Qual é o nome da loja de departamentos onde a Joyce Byers trabalha?",
    "alternativas": ["A. JCPenney", "B. Melvald's General Store", "C. Hawkins Square Shop", "D. Bradley's Big Buy", "E. Sears"],
    "correctAnswer": "B. Melvald's General Store",
    "subject": "Stranger Things"
  },
  {
    "id": "st77",
    "descricao": "Qual o nome do personagem 'Número 010' que aparece no flashback da 4ª temporada?",
    "alternativas": ["A. Benny", "B. Peter", "C. Andrew", "D. Christopher", "E. Ele não tem nome, apenas número"],
    "correctAnswer": "E. Ele não tem nome, apenas número",
    "subject": "Stranger Things"
  },
  {
    "id": "st78",
    "descricao": "Qual é o nome do clube de vídeo onde Steve e Robin trabalham na 4ª temporada?",
    "alternativas": ["A. Blockbuster", "B. Family Video", "C. Hawkins Video", "D. Captain Video", "E. Starcourt Video"],
    "correctAnswer": "B. Family Video",
    "subject": "Stranger Things"
  },
  {
    "id": "st79",
    "descricao": "O que o grupo usa para flutuar no portal do lago (Lovers Lake)?",
    "alternativas": ["A. Um barco a motor", "B. Pranchas de surf", "C. Um bote inflável", "D. Colchões de air", "E. Boias de pneu"],
    "correctAnswer": "C. Um bote inflável",
    "subject": "Stranger Things"
  },
  {
    "id": "st80",
    "descricao": "Quantos anos Eleven tinha quando os eventos da 1ª temporada começaram?",
    "alternativas": ["A. 10 anos", "B. 11 anos", "C. 12 anos", "D. 13 anos", "E. 14 anos"],
    "correctAnswer": "C. 12 anos",
    "subject": "Stranger Things"
  },
  {
    "id": "st81",
    "descricao": "Qual é o nome do pai de Henry Creel (Vecna)?",
    "alternativas": ["A. Martin Creel", "B. Victor Creel", "C. Andrew Creel", "D. Peter Creel", "E. Sam Creel"],
    "correctAnswer": "B. Victor Creel",
    "subject": "Stranger Things"
  },
  {
    "id": "st82",
    "descricao": "O que Lucas Sinclair usa para sinalizar o grupo na 1ª temporada?",
    "alternativas": ["A. Um apito", "B. Um binóculo", "C. Um rádio amador", "D. Um espelho", "E. Lanternas"],
    "correctAnswer": "C. Um rádio amador",
    "subject": "Stranger Things"
  },
  {
    "id": "st83",
    "descricao": "Qual o nome da técnica de luta que Hopper usa contra o Demogorgon na prisão russa?",
    "alternativas": ["A. Ele usa um taco", "B. Ele usa uma espada", "C. Ele usa um lança-chamas", "D. Ele usa as próprias mãos", "E. Ele usa uma granada"],
    "correctAnswer": "B. Ele usa uma espada",
    "subject": "Stranger Things"
  },
  {
    "id": "st84",
    "descricao": "Qual é a cor da fita cassete que contém a música favorita de Max?",
    "alternativas": ["A. Vermelha", "B. Azul", "C. Verde", "D. Amarela", "E. Transparente"],
    "correctAnswer": "B. Azul",
    "subject": "Stranger Things"
  },
  {
    "id": "st85",
    "descricao": "Qual o nome do bar onde Hopper costuma ir na 1ª temporada?",
    "alternativas": ["A. The Hideaway", "B. Benny's Place", "C. Hawkins Pub", "D. The Quarry", "E. Roane's"],
    "correctAnswer": "A. The Hideaway",
    "subject": "Stranger Things"
  },
  {
    "id": "st86",
    "descricao": "O que Murray Bauman era antes de se tornar um investigador conspiracionista?",
    "alternativas": ["A. Policial", "B. Jornalista", "C. Professor de História", "D. Agente da CIA", "E. Advogado"],
    "correctAnswer": "B. Jornalista",
    "subject": "Stranger Things"
  },
  {
    "id": "st87",
    "descricao": "Qual o nome da babá da Holly Wheeler que aparece brevemente?",
    "alternativas": ["A. Barb", "B. Vickie", "C. Heather", "D. Stacy", "E. Ela não tem babá"],
    "correctAnswer": "E. Ela não tem babá",
    "subject": "Stranger Things"
  },
  {
    "id": "st88",
    "descricao": "Qual o nome do gato da família Henderson que é comido pelo Dart?",
    "alternativas": ["A. Mews", "B. Whiskers", "C. Tigger", "D. Simba", "E. Oliver"],
    "correctAnswer": "A. Mews",
    "subject": "Stranger Things"
  },
  {
    "id": "st89",
    "descricao": "Em que dia e mês é celebrado o 'Stranger Things Day'?",
    "alternativas": ["A. 15 de julho", "B. 31 de outubro", "C. 6 de novembro", "D. 4 de julho", "E. 25 de dezembro"],
    "correctAnswer": "C. 6 de novembro",
    "subject": "Stranger Things"
  },
  {
    "id": "st90",
    "descricao": "Qual a marca do carro do Steve Harrington?",
    "alternativas": ["A. Chevrolet Camarro", "B. Ford Mustang", "C. BMW 733i", "D. Toyota Corolla", "E. Pontiac Firebird"],
    "correctAnswer": "C. BMW 733i",
    "subject": "Stranger Things"
  },
  {
    "id": "st91",
    "descricao": "Qual personagem diz a famosa frase: 'Friends don't lie' (Amigos não mentem)?",
    "alternativas": ["A. Mike", "B. Eleven", "C. Hopper", "D. Will", "E. Dustin"],
    "correctAnswer": "B. Eleven",
    "subject": "Stranger Things"
  },
  {
    "id": "st92",
    "descricao": "Qual o nome do monstro que Vecna enviou para a Geórgia (Rússia) na 4ª temporada?",
    "alternativas": ["A. Democão", "B. Demobat", "C. Demogorgon", "D. Devorador de Mentes", "E. Aranha"],
    "correctAnswer": "C. Demogorgon",
    "subject": "Stranger Things"
  },
  {
    "id": "st93",
    "descricao": "Qual a cor dos uniformes dos funcionários do Laboratório de Hawkins?",
    "alternativas": ["A. Branco", "B. Azul claro", "C. Cinza", "D. Verde militar", "E. Bege"],
    "correctAnswer": "A. Branco",
    "subject": "Stranger Things"
  },
  {
    "id": "st94",
    "descricao": "Quem Mike Wheeler acha que é o espião no grupo na 2ª temporada?",
    "alternativas": ["A. Max", "B. Eleven", "C. Will", "D. Bob", "E. Dustin"],
    "correctAnswer": "C. Will",
    "subject": "Stranger Things"
  },
  {
    "id": "st95",
    "descricao": "Qual o nome do refrigerante que Eleven experimenta e não gosta na 1ª temporada?",
    "alternativas": ["A. Coca-Cola", "B. Pepsi", "C. Sprite", "D. Dr Pepper", "E. Fanta"],
    "correctAnswer": "A. Coca-Cola",
    "subject": "Stranger Things"
  },
  {
    "id": "st96",
    "descricao": "Qual o nome da vizinha idosa de Nancy que está sendo controlada pelo Devorador?",
    "alternativas": ["A. Sra. Wheeler", "B. Sra. Driscoll", "C. Sra. Henderson", "D. Sra. Creel", "E. Sra. Byers"],
    "correctAnswer": "B. Sra. Driscoll",
    "subject": "Stranger Things"
  },
  {
    "id": "st97",
    "descricao": "Quantas temporadas tem a série (até o final de 2024)?",
    "alternativas": ["A. 3", "B. 4", "C. 5", "D. 6", "E. 2"],
    "correctAnswer": "B. 4",
    "subject": "Stranger Things"
  },
  {
    "id": "st98",
    "descricao": "Qual o nome do local onde Hopper e Joyce encontram a Eleven na 1ª temporada?",
    "alternativas": ["A. Floresta Mirkwood", "B. Biblioteca", "C. Laboratório", "D. Castelo Byers", "E. Escola"],
    "correctAnswer": "C. Laboratório",
    "subject": "Stranger Things"
  },
  {
    "id": "st99",
    "descricao": "Qual personagem é conhecido por amar teorias da conspiração?",
    "alternativas": ["A. Murray Bauman", "B. Jim Hopper", "C. Dr. Owens", "D. Scott Clarke", "E. Ted Wheeler"],
    "correctAnswer": "A. Murray Bauman",
    "subject": "Stranger Things"
  },
  {
    "id": "st100",
    "descricao": "Qual o nome do pequeno forte que Will construiu na floresta?",
    "alternativas": ["A. Fort Will", "B. Castle Byers", "C. Mirkwood Home", "D. The Bunker", "E. Will’s Nest"],
    "correctAnswer": "B. Castle Byers",
    "subject": "Stranger Things"
  }
];

module.exports = {questionsST}