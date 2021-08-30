const ship = require('./Ship');

const gameBoard = (size = 10) => {

  const matrix = []
  for(let i = 0; i < size; i++) {
    matrix[i] = new Array(size).fill(0);
  };

  const hitMatrix = []
  for(let i = 0; i < size; i++) {
    hitMatrix[i] = new Array(size).fill(0);
  };

  const ships = [];
  const shipPositions = [];

  const isInRange = (length, x, y, direction) => {
    if (direction === 'h') {
      if (x + length < size) return true;
    };
    if (direction === 'v') {
      if (y + length < size) return true;
    };
    return false;
  };

  const isFree = (shipLen, x, y, direction) => {
    if (direction === 'h') {
      for (let i = 0; i < shipLen; i++) {
        if (matrix[x + i][y] !== 0) return false;
      };
      return true;
    }
    if (direction === 'v') {
      for (let i = 0; i < shipLen; i++) {
        if (matrix[x][y + i] !== 0) return false;
      };
      return true;
    }
  };

  const placeh = (shipLen, x, y) => {
    if (!isInRange(shipLen, x ,y, 'h')) return 'out of range';
    if (!isFree(shipLen, x , y, 'h')) return 'superposition';
    const shipH = ship(shipLen);
    const coords = [];
    ships.push(shipH);
    for (let i = 0; i < shipLen; i++) {
      matrix[x + i][y] = 1;
      coords.push([x + i, y]);
    };
    shipPositions.push(coords);
  };

  const placev = (shipLen, x, y) => {
    if (!isInRange(shipLen, x, y ,'v')) return 'out of range';
    if (!isFree(shipLen, x , y, 'v')) return 'superposition';
    const shipV = ship(shipLen);
    const coords = [];
    ships.push(shipV);
    for (let i = 0; i < shipLen; i++) {
      matrix[x][y + i] = 1;
      coords.push([x, y + i]);
    };
    shipPositions.push(coords);
  };

  const place = (shipLen, x, y, direction) => {
    if (!isInRange(shipLen, x, y ,direction)) return 'out of range';
    if (!isFree(shipLen, x , y, direction)) return 'superposition';
    const ship1 = ship(shipLen, direction);
    const coords = [];
    ships.push(ship1);
    for (let i = 0; i < shipLen; i++) {
      if (direction === 'v') {
        matrix[x][y + i] = 1;
        coords.push([x, y + i]);
      } else {
        matrix[x + i][y] = 1;
        coords.push([x + i, y]);
      };
    };
    shipPositions.push(coords);
    return 1;
  };

  const whichShip = (x, y) => {
    for (let i = 0; i < shipPositions.length; i++) {
      for (let j = 0; j < ships[i].length; j++) {
        if (shipPositions[i][j][0] === x & shipPositions[i][j][1] === y) {
          return i;
        }
      }
    };
    return -1;
   };

  const whichIndex = (x, y, shipIndex) => {
    for (let i = 0; i < ships[shipIndex].length; i++) {
      if (shipPositions[shipIndex][i][0] === x & shipPositions[shipIndex][i][1] === y) {
        return i;
      }
    }
  };

  const receiveAttack = (x, y) => {
    if (hitMatrix[x][y] == 1) return 'Already hit'
    hitMatrix[x][y] = 1;
    if (matrix[x][y] === 0) return 'Nothing here';
    if (matrix[x][y] === 1) {
      const shipID = whichShip(x, y);
      const hitShip = ships[shipID];
      const hitShipIndex = whichIndex(x, y, shipID);
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

  return { size, matrix, hitMatrix, whichShip, ships, shipPositions, placeh, placev, place, receiveAttack, isAllDown }
}

module.exports = gameBoard;