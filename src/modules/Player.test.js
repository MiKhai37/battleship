const gameBoard = require('./Gameboard');
const Player = require('./Player');

test('Player 1 shoot and hit', () => {
  const pl1 = Player('Pierre');
  const pl2 = Player('Computer');
  pl1.gb.placeh(3, 5, 5);
  pl1.gb.placev(4, 1, 1);
  pl2.gb.placeh(2, 5, 6);
  pl2.gb.placev(4, 1, 4);
  pl1.fire(5, 6, pl2.gb);
  expect(pl2.gb.ships[0].hitArr).toEqual([1, 0]);
  expect(pl2.gb.hitMatrix[5][6]).toBe(1);
});

test('Player 1 shoots 2 times and sunks a ship', () => {
  const pl1 = Player('Pierre');
  const pl2 = Player('Computer');
  pl1.gb.placeh(3, 5, 5);
  pl1.gb.placev(4, 1, 1);
  pl2.gb.placeh(2, 5, 6);
  pl2.gb.placev(4, 1, 4);
  pl1.fire(5, 6, pl2.gb);
  pl1.fire(6, 6, pl2.gb);
  expect(pl2.gb.ships[0].hitArr).toEqual([1, 1]);
  expect(pl2.gb.hitMatrix[5][6]).toBe(1);
  expect(pl2.gb.ships[0].isSunk()).toBe(true);
});

test('Player 1 shoots and misses', () => {
  const pl1 = Player('Pierre');
  const pl2 = Player('Computer');
  pl1.gb.placeh(3, 5, 5);
  pl1.gb.placev(4, 1, 1);
  pl2.gb.placeh(2, 5, 6);
  pl2.gb.placev(4, 1, 4);
  pl1.fire(5, 5, pl2.gb);
  expect(pl2.gb.ships[0].hitArr).toEqual([0, 0]);
  expect(pl2.gb.hitMatrix[5][5]).toBe(1);
});

test('Random coords shoots', () => {
  const pl1 = Player('David');
  const pl2 = Player('Roger');
  pl2.fireRandom(pl1.gb);
  expect(pl1.gb.hitMatrix.flat().reduce((a, b) => a + b, 0)).toBe(1);
});

test('Random n shoots no duplicates', () => {
  const pl1 = Player('David');
  const pl2 = Player('Roger');
  const n = 20;
  for (let i = 0; i < n; i++) {
    pl2.fireRandom(pl1.gb);
  }
  expect(pl1.gb.hitMatrix.flat().reduce((a, b) => a + b, 0)).toBe(n);
});

test('Random shoot good coords', () => {
  const pl1 = Player('David');
  const pl2 = Player('Roger');
  const [x, y] = [...pl2.fireRandom(pl1.gb)];
  expect(pl1.gb.hitMatrix[x][y]).toBe(1);
});

test('Smart Fire', () => {
  const human = Player('Human');
  const computer = Player('Computer');

});

