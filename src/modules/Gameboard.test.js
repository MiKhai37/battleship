const gameBoard = require('./Gameboard');
const ship = require('./Ship');

test('ship length 4 placement horizontal to x=3, y=4', () => {
  const gb = gameBoard();
  const x = 3;
  const y = 4;
  const length = 4;
  gb.placeh(length, x, y);
  expect([gb.matrix[x][y], gb.matrix[x+1][y], gb.matrix[x+2][y], gb.matrix[x+3][y]]).toEqual([1, 1, 1, 1]);
});

test('ship length 3 placement vertical to x=3, y=4', () => {
  const gb = gameBoard();
  const x = 3;
  const y = 4;
  const length = 3;
  gb.placev(length, x, y);
  expect([gb.matrix[x][y], gb.matrix[x][y+1], gb.matrix[x][y+2]]).toEqual([1, 1, 1]);
});

test('place ship out of range h', () => {
  const gb = gameBoard();
  expect(gb.placeh(4, 7, 1)).toBe('out of range');
});

test('place ship out of range v', () => {
  const gb = gameBoard();
  expect(gb.placev(4, 7, 7)).toBe('out of range');
});

test('ship coordinates h', () => {
  const gb = gameBoard();
  gb.placeh(3, 3, 3);
  expect(gb.shipPositions[0]).toEqual([[3, 3], [4, 3], [5, 3]]);
});

test('ship coordinates v', () => {
  const gb = gameBoard();
  gb.placev(3, 3, 3);
  expect(gb.shipPositions[0]).toEqual([[3, 3], [3, 4], [3, 5]]);
});

test('ships coordinates 2 ships', () =>{
  const gb = gameBoard()
  gb.placeh(3, 3, 3);
  gb.placeh(4, 5, 4);
  expect(gb.shipPositions[0]).toEqual([[3, 3], [4, 3], [5, 3]]);
  expect(gb.shipPositions[1]).toEqual([[5, 4], [6, 4], [7, 4], [8, 4]]);
  expect(gb.shipPositions).toEqual([[[3, 3], [4, 3], [5, 3]], [[5, 4], [6, 4], [7, 4], [8, 4]]])
});

test('avoid superposition of ship', () => {
  const gb = gameBoard();
  const x1 = 2;
  const x2 = 3;
  const y1 = 4;
  const y2 = 4;
  const length1 = 4;
  const length2 = 3;
  gb.placeh(length1, x1, y1);
  expect(gb.placeh(length2, x2, y2)).toBe('superposition');
});

test('receive missed attack', () => {
  const gb = gameBoard();
  const xShip = 4;
  const yShip = 2;
  const xAttack = 5;
  const yAttack = 3;
  const length = 4;
  gb.placeh(length, xShip ,yShip);
  gb.receiveAttack(xAttack, yAttack);
  expect(gb.missedMatrix[xAttack][yAttack]).toBe(1);
});

test('which ship is here?', () => {
  const gb = gameBoard();
  gb.placeh(3, 3, 3);
  gb.placeh(4, 5, 4);
  gb.placev(2, 1, 2)
  expect(gb.whichShip(4, 3)).toBe(0);
  expect(gb.whichShip(5, 4)).toBe(1);
  expect(gb.whichShip(1, 3)).toBe(2);
  expect(gb.whichShip(4, 4)).toBe('no ship here');
});

test('receive attack hit', () => {
  const gb = gameBoard();
  gb.placeh(4, 4 ,2);
  gb.receiveAttack(5, 2);
  expect(gb.ships[0].hitArr).toEqual([0, 1, 0, 0]);
});

test('all ships down', () => {
  const gb = gameBoard();
  gb.placeh(3, 4, 2);
  gb.placev(2, 1, 1);
  gb.ships[0].hit(0);
  gb.ships[0].hit(1);
  gb.ships[0].hit(2);
  gb.ships[1].hit(0);
  gb.ships[1].hit(1);
  expect(gb.isAllDown()).toBe(true)
});

test('all ships down', () => {
  const gb = gameBoard();
  gb.placeh(3, 4, 2);
  gb.placev(2, 1, 1);
  gb.ships[0].hit(0);
  gb.ships[0].hit(2);
  gb.ships[1].hit(0);
  gb.ships[1].hit(1);
  expect(gb.isAllDown()).toBe(false)
});