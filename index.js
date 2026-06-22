import readline from 'readline-sync';

const bancoPalavras = {
    Tecnologia: [
        { termo: "javascript", dica: "A linguagem da Web e dos navegadores" },
        { termo: "computador", dica: "A maquina fisica que voce usa para programar" },
        { termo: "internet", dica: "A rede mundial de computadores" },
        { termo: "algoritmo", dica: "Uma sequencia de passos para resolver um problema" },
        { termo: "servidor", dica: "Computador central que fornece dados para outros" }
    ],
    Animais: [
        { termo: "cachorro", dica: "O melhor amigo do homem" },
        { termo: "elefante", dica: "O maior mamifero terrestre, tem uma tromba" },
        { termo: "girafa", dica: "Tem um pescoco extremamente longo" },
        { termo: "tartaruga", dica: "Anda bem devagar e tem um casco protetor" },
        { termo: "papagaio", dica: "Uma ave verde conhecida por imitar a fala humana" }
    ],
    Frutas: [
        { termo: "morango", dica: "Fruta pequena, vermelha e cheia de sementinhas por fora" },
        { termo: "melancia", dica: "Grande, verde por fora e vermelha por dentro, com muita agua" },
        { termo: "abacaxi", dica: "Tem uma 'coroa' e a casca cheia de espinhos" },
        { termo: "banana", dica: "Fruta amarela que descasca e os macacos adoram" },
        { termo: "laranja", dica: "Famosa pela vitamina C e por seu suco citrico" }
    ]
};

function jogarRodada(nomeJogador) {
    console.log(`\nOlá, ${nomeJogador}! Escolha uma categoria digitando o numero correspondente:`);
    const categorias = Object.keys(bancoPalavras);
    const index = readline.keyInSelect(categorias, 'Sua escolha: ');
    
    if (index === -1) {
        console.log("Jogo cancelado.");
        return;
    }
    const categoriaEscolhida = categorias[index];
    
    const palavras = bancoPalavras[categoriaEscolhida];
    const objetoSorteado = palavras[Math.floor(Math.random() * palavras.length)];
    
    const palavraSecreta = objetoSorteado.termo.toLowerCase();
    const dicaDaPalavra = objetoSorteado.dica;
    
    let letrasDescobertas = Array(palavraSecreta.length).fill('_');
    let letrasTentadas = [];
    let errosCometidos = 0;
    const maxErros = 6;
    let pontuacao = 0;
    
    let dicaUsada = false;

    while (errosCometidos < maxErros && letrasDescobertas.includes('_')) {
        console.log(`\n-----------------------------------------`);
        console.log(`Palavra: ${letrasDescobertas.join(' ')}`);
        console.log(`Letras ja tentadas: ${letrasTentadas.join(', ')}`);
        console.log(`Erros cometidos: ${errosCometidos}/${maxErros}`);
        
        if (dicaUsada) {
            console.log(`DICA ATIVADA: ${dicaDaPalavra}`);
        } else {
            console.log(`[Digite 'DICA' para revelar a dica. Penalidade: Custa 1 tentativa extra]`);
        }
        
        const entrada = readline.question('Chute uma letra: ').toLowerCase().trim();

        if (entrada === 'dica') {
            if (dicaUsada) {
                console.log("Voce ja pediu a dica para esta palavra!");
            } else {
                dicaUsada = true;
                errosCometidos++; // PENALIDADE: Adiciona um erro (perde uma tentativa)
                console.log(`\nDica liberada! Penalidade aplicada: +1 erro contabilizado.`);
            }
            continue;
        }

        const chute = entrada;

        if (!chute || chute.length !== 1 || !/[a-z]/.test(chute)) {
            console.log("Por favor, digite apenas uma letra valida ou 'DICA'.");
            continue;
        }

        if (letrasTentadas.includes(chute)) {
            console.log("Voce ja tentou essa letra!");
            continue;
        }

        letrasTentadas.push(chute);

        if (palavraSecreta.includes(chute)) {
            console.log(`Boa! A letra "${chute}" existe.`);
            for (let i = 0; i < palavraSecreta.length; i++) {
                if (palavraSecreta[i] === chute) {
                    letrasDescobertas[i] = chute;
                    pontuacao += 10; 
                }
            }
        } else {
            console.log(`Que pena! A letra "${chute}" nao existe.`);
            errosCometidos++;
            pontuacao -= 5;
        }
    }

    console.log('\n=========================================');
    console.log('            FIM DA RODADA                ');
    console.log('=========================================');
    console.log(`Jogador: ${nomeJogador}`);
    
    if (!letrasDescobertas.includes('_')) {
        console.log('Resultado: PARABENS, VOCE VENCEU!');
        pontuacao += 50; 
    } else {
        console.log('Resultado: QUE PENA, VOCE PERDEU!');
        console.log(`A palavra correta era: ${palavraSecreta.toUpperCase()}`);
    }
    
    if (pontuacao < 0) pontuacao = 0;
    console.log(`Pontuacao final da rodada: ${pontuacao} pontos`);
}

function iniciarJogo() {
    console.log("=========================================");
    console.log("       BEM-VINDO AO JOGO DA FORCA        ");
    console.log("=========================================");
    
    const nomeJogador = readline.question('Digite o seu nome para comecar: ');
    
    let jogarNovamente = true;
    while (jogarNovamente) {
        jogarRodada(nomeJogador);
        jogarNovamente = readline.keyInYNStrict('\nDeseja jogar outra rodada? ');
    }
    
    console.log("\nObrigado por jogar! Ate a proxima.");
}

iniciarJogo();