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
  const shipsCoord = [];

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
    const coord = [];
    ships.push(shipH);
    for (let i = 0; i < shipH.length; i++) {
      matrix[x + i][y] = 1;
      coord[i] = [x + i, y];
    };
    shipsCoord.push(coord);
  };

  const placev = (length, x, y) => {
    if (!isInRange(length, x, y ,'v')) return 'out of range';
    if (!isFree(length, x , y, 'v')) return 'superposition';
    const shipV = ship(length);
    const coord = [];
    ships.push(shipV);
    for (let i = 0; i < shipV.length; i++) {
      matrix[x][y + i] = 1;
      coord[i] = [x, y + i];
    };
    shipsCoord.push(coord);
  };

  const whichShip = (x, y) => {
    shipsCoord.forEach(coords => {
      const shipIndex = coords.findIndex(elem => elem[0] == x);
      if (shipIndex > -1) return shipIndex;
    });
    /* for (let i = 0; i < shipsCoord.length; i++) {
      if (shipsCoord[i] === [x, y]) return i;
    } */
    return 'no ship here';
  };

  const whichIndex = (x, y, shipIndex) => {
    const index = shipsCoord[shipIndex].indexOf([x, y]);
    return index;
  };

  const receiveAttack = (x, y) => {
    if (matrix[x][y] === 0) missedMatrix[x][y] = 1;
    if (matrix[x][y] === 1) {
      const shipIndex = whichShip(x, y);
      const hitIndex = whichIndex(x, y, shipIndex);
      ships[shipIndex].hit(hitIndex);
    };
    
  };

  return { matrix, missedMatrix, whichShip, ships, shipsCoord, placeh, placev, receiveAttack }
}

module.exports = gameBoard;