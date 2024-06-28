// game.js
document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById('game-area');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const errorsDisplay = document.getElementById('errors');
    const startButton = document.getElementById('start-button');

    const images = [
        'BolaVerde.png',
        'BolaVermelha.png',
        'SetaVerde.png',
        'SetaVermelha.png'
    ]; // Array com os nomes dos arquivos de imagem

    let score = 0; // Variável para armazenar a pontuação
    let errors = 0; // Variável para armazenar os erros
    let time = 0; // Variável para armazenar o tempo
    let gameInterval; // Variável para armazenar o intervalo do jogo
    let currentImage = ''; // Variável para armazenar a imagem atual
    let currentSquare = null; // Variável para armazenar o quadrado atual

    // Função para iniciar o jogo
    const startGame = () => {
        score = 0;
        errors = 0;
        time = 0;
        timeDisplay.textContent = time;
        scoreDisplay.textContent = score;
        errorsDisplay.textContent = errors;
        gameArea.classList.remove('grid-4', 'grid-6');
        gameArea.classList.add('grid-2');
        gameArea.innerHTML = `
            <div id="top-square" class="square" data-square="0"></div>
            <div id="bottom-square" class="square" data-square="1"></div>
        `;

        // Adiciona os eventos de clique para os quadrados iniciais
        document.getElementById('top-square').addEventListener('click', handleSquareClick);
        document.getElementById('bottom-square').addEventListener('click', handleSquareClick);

        updateSquareImages(); // Atualiza as imagens dos quadrados e define `currentSquare`

        // Limpa o intervalo do jogo anterior, se existir
        clearInterval(gameInterval);

        gameInterval = setInterval(updateGame, 1000); // Atualiza o jogo a cada segundo
    };

    // Função para atualizar o tempo do jogo
    const updateGame = () => {
        time++;
        timeDisplay.textContent = time;
    };

    // Função para obter uma imagem aleatória
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    // Função para obter uma rotação válida
    const getValidRotation = (image, squareIndex, totalSquares) => {
        if (image === 'SetaVerde.png' || image === 'SetaVermelha.png') {
            if (totalSquares === 2) {
                // Setas verdes ou vermelhas em um layout de 2 quadrados
                if (squareIndex === 0) return 'rotate-180'; // Quadrado 0 com 180°
                if (squareIndex === 1) return 'rotate-0'; // Quadrado 1 com 0°
            } else if (totalSquares === 4) {
                // Setas verdes ou vermelhas em um layout de 4 quadrados
                if (squareIndex === 0){
                    const rotations = ['rotate-90', 'rotate-180'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 1){
                    const rotations = ['rotate-180', 'rotate-270'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 2){
                    const rotations = ['rotate-0', 'rotate-90'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 3){
                    const rotations = ['rotate-0', 'rotate-270'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
            } else if (totalSquares === 6) {
                // Setas verdes ou vermelhas em um layout de 6 quadrados
                if (squareIndex === 0){
                    const rotations = ['rotate-90', 'rotate-180'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 1){
                    const rotations = ['rotate-180', 'rotate-270'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 2){
                    const rotations = ['rotate-0', 'rotate-90', 'rotate-180'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 3){
                    const rotations = ['rotate-0', 'rotate-180', 'rotate-270'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 4){
                    const rotations = ['rotate-0', 'rotate-90'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
                if (squareIndex === 5){
                    const rotations = ['rotate-0', 'rotate-270'];
                    return rotations[Math.floor(Math.random() * rotations.length)];
                }
            }
        }
        return 'rotate-0'; // Rotação padrão
    };

    // Função para atualizar as imagens dos quadrados
    const updateSquareImages = () => {
        const squares = document.querySelectorAll('.square'); // Seleciona todos os quadrados
        squares.forEach(square => {
            const imgElement = square.querySelector('img'); // Seleciona a imagem dentro do quadrado
            if (imgElement) {
                square.removeChild(imgElement); // Remove a imagem anterior
            }
        });
        const randomSquareIndex = Math.floor(Math.random() * squares.length);
        const randomSquare = squares[randomSquareIndex];
        const newImg = document.createElement('img');
        currentImage = getRandomImage();
        newImg.src = currentImage;

        if (currentImage.includes('Seta')) {
            const rotationClass = getValidRotation(currentImage, randomSquareIndex, squares.length);
            newImg.classList.add(rotationClass);
        }

        console.log(`Imagem gerada: ${currentImage}`);
        console.log(`Quadrado gerado: ${randomSquare.dataset.square}`);

        randomSquare.appendChild(newImg); // Adiciona a nova imagem ao quadrado
        currentSquare = randomSquare; // Define o quadrado atual
    };

    // Função para lidar com o clique nos quadrados
    const handleSquareClick = (event) => {
        if (event.target.classList.contains('square') || event.target.tagName === 'IMG') {
            console.log(`Quadrado clicado: ${event.currentTarget.dataset.square}`);
            validateClick(event.currentTarget); // Valida o clique
            scoreDisplay.textContent = score; // Atualiza a pontuação
            errorsDisplay.textContent = errors; // Atualiza os erros

            if (score + errors === 10) {
                transformToFourSquares(); // Transforma para quatro quadrados após 10 cliques
            } else if (score + errors === 20) {
                transformToSixSquares(); // Transforma para seis quadrados após 20 cliques
            } else if (score + errors === 30) {
                endGame(); // Encerra o jogo após 30 cliques
            } else {
                updateSquareImages(); // Atualiza as imagens dos quadrados
            }
        }
    };

    // Função para validar o clique do jogador
    const validateClick = (clickedSquare) => {
        let result = 'Erro';
        if (currentImage === 'BolaVerde.png') {
            if (clickedSquare === currentSquare) {
                score++;
                result = 'Acerto';
            } else {
                errors++;
            }
        } else if (currentImage === 'BolaVermelha.png') {
            if (clickedSquare !== currentSquare) {
                score++;
                result = 'Acerto';
            } else {
                errors++;
            }
        } else if (currentImage === 'SetaVerde.png' || currentImage === 'SetaVermelha.png') {
            const targetSquare = getTargetSquareForArrow();
            if (currentImage === 'SetaVerde.png' && clickedSquare === targetSquare) {
                score++;
                result = 'Acerto';
            } else if (currentImage === 'SetaVermelha.png' && clickedSquare !== targetSquare) {
                score++;
                result = 'Acerto';
            } else {
                errors++;
            }
        }
        console.log(result);
    };

    // Função para obter o quadrado alvo para a seta
    const getTargetSquareForArrow = () => {
        const squares = Array.from(document.querySelectorAll('.square'));
        const currentIndex = squares.indexOf(currentSquare);

        if (squares.length === 2) {
            return squares[(currentIndex + 1) % 2]; // Aponta para o quadrado oposto
        }

        if (squares.length === 4) {
            // Lógica para 4 quadrados
            const rotation = currentSquare.querySelector('img').classList[0];
            switch (currentIndex) {
                case 0:
                    if (rotation === 'rotate-90') return squares[1];
                    if (rotation === 'rotate-180') return squares[2];
                    break;
                case 1:
                    if (rotation === 'rotate-180') return squares[3];
                    if (rotation === 'rotate-270') return squares[0];
                    break;
                case 2:
                    if (rotation === 'rotate-0') return squares[0];
                    if (rotation === 'rotate-90') return squares[3];
                    break;
                case 3:
                    if (rotation === 'rotate-0') return squares[1];
                    if (rotation === 'rotate-270') return squares[2];
                    break;
            }
        }

        if (squares.length === 6) {
            // Lógica para 6 quadrados
            const rotation = currentSquare.querySelector('img').classList[0];
            switch (currentIndex) {
                case 0:
                    if (rotation === 'rotate-90') return squares[1];
                    if (rotation === 'rotate-180') return squares[2];
                    break;
                case 1:
                    if (rotation === 'rotate-180') return squares[3];
                    if (rotation === 'rotate-270') return squares[0];
                    break;
                case 2:
                    if (rotation === 'rotate-0') return squares[0];
                    if (rotation === 'rotate-90') return squares[3];
                    if (rotation === 'rotate-180') return squares[4];
                    break;
                case 3:
                    if (rotation === 'rotate-0') return squares[1];
                    if (rotation === 'rotate-270') return squares[2];
                    if (rotation === 'rotate-180') return squares[5];
                    break;
                case 4:
                    if (rotation === 'rotate-0') return squares[2];
                    if (rotation === 'rotate-90') return squares[5];
                    break;
                case 5:
                    if (rotation === 'rotate-0') return squares[3];
                    if (rotation === 'rotate-270') return squares[4];
                    break;
            }
        }
    };

    // Função para transformar a área de jogo em quatro quadrados
    const transformToFourSquares = () => {
        gameArea.classList.remove('grid-2', 'grid-6');
        gameArea.classList.add('grid-4');
        gameArea.innerHTML = ''; // Limpa os quadrados atuais

        // Cria quatro novos quadrados
        for (let i = 0; i < 4; i++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.dataset.square = `square-${i}`;
            newSquare.addEventListener('click', handleSquareClick);
            gameArea.appendChild(newSquare);
        }
        updateSquareImages();
    };

    // Função para transformar a área de jogo em seis quadrados
    const transformToSixSquares = () => {
        gameArea.classList.remove('grid-2', 'grid-4');
        gameArea.classList.add('grid-6');
        gameArea.innerHTML = ''; // Limpa os quadrados atuais

        // Cria seis novos quadrados
        for (let i = 0; i < 6; i++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.dataset.square = `square-${i}`;
            newSquare.addEventListener('click', handleSquareClick);
            gameArea.appendChild(newSquare);
        }
        updateSquareImages();
    };

    // Função para encerrar o jogo
    const endGame = () => {
        clearInterval(gameInterval); // Para o intervalo do jogo

        const pontosPorAcerto = 267; // Aumenta os pontos ganhos por acerto
        const penalidadePorErro = 150; // Ajusta os pontos perdidos por erro
        const tempoMaximo = 60; // Tempo máximo em segundos para o bônus de tempo
        const tempoRestante = tempoMaximo - time; // Tempo restante se o tempo máximo é 60 segundos
        const bonusDeTempo = tempoRestante * 40; // Aumenta o bônus de tempo (por exemplo, 50 pontos por segundo restante)


        // Calcula a pontuação total
        let pontuacao = (score * pontosPorAcerto) - (errors * penalidadePorErro) + bonusDeTempo;

        // Limita a pontuação máxima a 9999
        if (pontuacao > 9999) {
            pontuacao = 9999;
        }

        pont_reg = Math.round(pontuacao)

        const result = {
            pont_reg: pont_reg,
            scoreDisplay : score,
            errorsDisplay: errors,
            timeDisplay: time,
            date: new Date().toISOString(),
        };

        console.log('Saving to localStorage:', result);
        let results = JSON.parse(localStorage.getItem('results')) || [];
        // Salva o resultado atual no localStorage
        results.push(result);
        localStorage.setItem('results', JSON.stringify(results));
        console.log('Current results in localStorage:', JSON.parse(localStorage.getItem('results')));

        showCustomAlert(`Jogo Finalizado! <br><br>Pontuação: ${pont_reg}<br><br>Acertos: ${score}     Erros: ${errors}     Tempo: ${time} segundos`); // Mostra a pontuação e os erros
        disableSquares(); // Desativa os quadrados
    };

    const showCustomAlert = (message) => {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.innerHTML = message;
        alertBox.style.display = 'block';

        // Adiciona o evento de clique para fechar o alerta
        const closeButton = document.getElementById('alert-close');
        closeButton.addEventListener('click', closeAlert);
    };

    const closeAlert = () => {
        const alertBox = document.getElementById('custom-alert');
        alertBox.style.display = 'none';
    };

    // Função para desativar os quadrados
    const disableSquares = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.add('disabled'); // Adiciona a classe 'disabled' aos quadrados
        });
    };

    // Adiciona o evento de clique ao botão "Jogar" para iniciar o jogo
    startButton.addEventListener('click', startGame);
});
