const gameBoard = require("./Gameboard");

const Player = (name) => {
  const gb = gameBoard()
  let score = 0;
  let last = [-1, -1];
  let lastHit = '';

  const fire = (x, y, enemyGB) => {
    enemyGB.receiveAttack(x, y);
    last[0] = x;
    last[1] = y;
    return [x, y];
  };

  const fireRandom = (enemyGB) => {
    let xRandom = -1;
    let yRandom = -1;
    let isCorrect = false;

    while (!isCorrect) {
      xRandom = Math.floor(Math.random() * 10);
      yRandom = Math.floor(Math.random() * 10);
      if (enemyGB.hitMatrix[xRandom][yRandom] === 0) isCorrect = true;
    };

    fire(xRandom, yRandom, enemyGB);
    last[0] = xRandom;
    last[1] = yRandom;
    return [xRandom, yRandom];
  };

  const fireSmart = (enemyGB) => {
    let xSmart = -1;
    let ySmart = -1;
    let isCorrect = false;

    if (last[0] === -1 & last[1] === -1) return fireRandom(enemyGB);

    const smartPos = [[last[0] + 1, last[1]], [last[0] - 1, last[1]], [last[0], last[1] + 1], [last[0], last[1] - 1]];
    
    const smartPosFilter = smartPos.filter(elem => {
      elem[0] < 10 | elem[1] > 10;
    });

    const i = Math.floor(Math.random() * smartPosFilter.length);
    xSmart = smartPosFilter[i][0];
    ySmart = smartPosFilter[i][1];

    last[0] = xSmart;
    last[1] = ySmart;
    return fire(xSmart, ySmart);
  };

  return { name, score, gb, fire, fireRandom, fireSmart, last };
};

module.exports = Player;