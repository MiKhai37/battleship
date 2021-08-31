const Player = require("./Player");
const UI = require("./UI");

const Game = (mode = 'HvsC') => {
  const human = Player('Human');
  const computer = Player('Computer');
  const ui = UI();
  let gameOver = false;

  const posInit = () => {
    human.gb.place(2, 2, 2, 'h');
    computer.gb.place(2, 4, 5, 'v');
  };

  const posRandom = (player) => {
    for (let i = 2; i < 6; i++) {
      let isCorrect = false;
      while (!isCorrect) {
        const xRandom = Math.floor(Math.random() * 10);
        const yRandom = Math.floor(Math.random() * 10);
        const randomDirection = ['h', 'v'][Math.floor(Math.random() * 2)];
        if (player.gb.place(i, xRandom, yRandom, randomDirection) === 1) isCorrect = true;
      };
    };
  };

  const restart = () => {
    gameOver = false;
    human.gb.resetGB();
    computer.gb.resetGB();

    const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach(gridItem => {
      gridItem.classList.remove('ship');
      gridItem.classList.remove('hit');
      gridItem.classList.remove('sunk');
    });

    posRandom(human);
    posRandom(computer);
    
    ui.renderShip(human);
    ui.renderShip(computer);

    //gameLoopHvsC();
  };

  const gameLoopHvsC = () => {
    const gridItems = document.querySelectorAll('.grid-item');


    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
      restart();
    });

    gridItems.forEach(gridItem => {
      gridItem.addEventListener('click', () => {
        const x = parseInt(gridItem.dataset.x);
        const y = parseInt(gridItem.dataset.y);
        const high = document.querySelector('.high');
        const middle = document.querySelector('.middle');
        const low = document.querySelector('.low');
        

        if (computer.gb.hitMatrix[x][y] === 1 | gridItem.dataset.name === human.name | gameOver) return;

        human.fire(x, y, computer.gb);
        gridItem.classList.add('hit');

        const [xRandom, yRandom] = [...computer.fireRandom(human.gb)];
        //const [xRandom, yRandom] = [...computer.fireSmart(human.gb)];
        const gridRandom = document.querySelector(`.${human.name}[data-x="${xRandom}"][data-y="${yRandom}"]`);
        gridRandom.classList.add('hit');
        middle.textContent = `${human.name} x=${human.last[0]}, y=${human.last[1]},
                              ${computer.name} x=${computer.last[0]}, y=${computer.last[1]}`

        ui.renderSunkShip(human);
        ui.renderSunkShip(computer);

        if (human.gb.isAllDown() | computer.gb.isAllDown()) {
          console.log('GameOver');
          gameOver = true;
          if (human.gb.isAllDown()) {
            computer.score ++;
            middle.textContent = 'Computer Wins';
          };
          if (computer.gb.isAllDown()) {
            human.score ++;
            middle.textContent = 'Human Wins';
          };
        };

        ui.renderScore(human, computer);
      });
    });
  };

  
  return { ui, restart, mode, human, computer, posInit, posRandom, gameLoopHvsC }
};

module.exports = Game;