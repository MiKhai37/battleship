const Player = require("./Player");
const UI = require("./UI");

const Game = (mode = 'HvsC') => {
  const human = Player('Human');
  const computer = Player('Computer');
  const ui = UI();

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

  const gameLoopHvsC = () => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
      gridItem.addEventListener('click', () => {
        const x = parseInt(gridItem.dataset.x);
        const y = parseInt(gridItem.dataset.y);

        if (computer.gb.hitMatrix[x][y] === 1 | gridItem.dataset.name === human.name) return;

        human.fire(x, y, computer.gb)
        gridItem.classList.add('hit');

        const [xRandom, yRandom] = [...computer.fireRandom(human.gb)];
        const gridRandom = document.querySelector(`.${human.name}[data-x="${xRandom}"][data-y="${yRandom}"]`);
        gridRandom.classList.add('hit');

        ui.renderSunkShip(human);
        ui.renderSunkShip(computer);

        if (human.gb.isAllDown() | computer.gb.isAllDown()) console.log('GameOver');
      })
    })
  };

  
  return { mode, human, computer, posInit, posRandom, gameLoopHvsC }
};

module.exports = Game;