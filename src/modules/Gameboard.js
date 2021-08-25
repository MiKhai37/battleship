const ship = require('./Ship');

const gameBoard = () => {
  const matrix = []
  for(let i = 0; i < 9; i++) {
    matrix[i] = new Array(10).fill(0);
  };

  const missedMatrix = []
  for(let i = 0; i < 9; i++) {
    missedMatrix[i] = new Array(10).fill(0);
  };

  const ships = [];
  const shipPositions = [];

  const isInRange = (length, x, y, direction) => {
    if (direction === 'h') {
      if (x + length <= 9) return true;
    };
    if (direction === 'v') {
      if (y + length <= 9) return true;
    };
    return false;
  };

  const isFree = (length, x, y, direction) => {
    if (direction === 'h') {
      for (let i = 0; i < length; i++) {
        if (matrix[x + i][y] !== 0) return false;
      };
      return true;
    }
    if (direction === 'v') {
      for (let i = 0; i < length; i++) {
        if (matrix[x][y + i] !== 0) return false;
      };
      return true;
    }
  };

  const placeh = (length, x, y) => {
    if (!isInRange(length, x ,y, 'h')) return 'out of range';
    if (!isFree(length, x , y, 'h')) return 'superposition';
    const shipH = ship(length);
    const coords = [];
    ships.push(shipH);
    for (let i = 0; i < shipH.length; i++) {
      matrix[x + i][y] = 1;
      coords.push([x + i, y]);
    };
    shipPositions.push(coords);
  };

  const placev = (length, x, y) => {
    if (!isInRange(length, x, y ,'v')) return 'out of range';
    if (!isFree(length, x , y, 'v')) return 'superposition';
    const shipV = ship(length);
    const coords = [];
    ships.push(shipV);
    for (let i = 0; i < shipV.length; i++) {
      matrix[x][y + i] = 1;
      coords.push([x, y + i]);
    };
    shipPositions.push(coords);
  };

  const whichShip = (x, y) => {
    for (let i = 0; i < shipPositions.length; i++) {
      for (let j = 0; j < ships[i].length; j++) {
        if (shipPositions[i][j][0] === x & shipPositions[i][j][1] === y) {
          return i;
        }
      }
    };
    return 'no ship here';
   };

  const whichIndex = (x, y, shipIndex) => {
    for (let i = 0; i < ships[shipIndex].length; i++) {
      if (shipPositions[shipIndex][i][0] === x & shipPositions[shipIndex][i][1] === y) {
        return i;
      }
    }
  };

  const receiveAttack = (x, y) => {
    if (matrix[x][y] === 0) missedMatrix[x][y] = 1;
    if (matrix[x][y] === 1) {
      const shipIndex = whichShip(x, y);
      const hitShip = ships[shipIndex];
      const hitShipIndex = whichIndex(x, y, shipIndex);
      hitShip.hit(hitShipIndex);
    };
  };

  const isAllDown = () => {
    const nbShips = ships.length;
    let nbSunkShips = 0;
    ships.forEach(ship => {
      if (ship.isSunk()) nbSunkShips++;
    })
    if (nbSunkShips === nbShips) return true;
    return false;
  }

  return { matrix, missedMatrix, whichShip, ships, shipPositions, placeh, placev, receiveAttack, isAllDown }
}

module.exports = gameBoard;