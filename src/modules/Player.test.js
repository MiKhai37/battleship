const gameBoard = require('./Gameboard');
const Player = require('./Player');

test('Player 1 shoot and hit', () => {
const gb1 = gameBoard();
const gb2 = gameBoard();
const pl1 = Player('Pierre', gb1, gb2);
const pl2 = Player('Computer', gb2, gb1);
gb1.placeh(3, 5, 5);
gb1.placev(4, 1, 1);
gb2.placeh(2, 5, 6);
gb2.placev(4, 1, 4);
pl1.fire(5, 6, gb2);
expect(gb2.ships[0].hitArr).toEqual([1, 0]);
expect(gb2.hitMatrix[5][6]).toBe(1);
});

test('Player 1 shoots 2 times and sunks a ship', () => {
  const gb1 = gameBoard();
  const gb2 = gameBoard();
  const pl1 = Player('Pierre', gb1, gb2);
  const pl2 = Player('Computer', gb2, gb1);
  gb1.placeh(3, 5, 5);
  gb1.placev(4, 1, 1);
  gb2.placeh(2, 5, 6);
  gb2.placev(4, 1, 4);
  pl1.fire(5, 6, gb2);
  pl1.fire(6, 6, gb2);
  expect(gb2.ships[0].hitArr).toEqual([1, 1]);
  expect(gb2.hitMatrix[5][6]).toBe(1);
  expect(gb2.ships[0].isSunk()).toBe(true);
  });

test('Player 1 shoots and misses', () => {
  const gb1 = gameBoard();
  const gb2 = gameBoard();
  const pl1 = Player('Pierre', gb1, gb2);
  const pl2 = Player('Computer', gb2, gb1);
  gb1.placeh(3, 5, 5);
  gb1.placev(4, 1, 1);
  gb2.placeh(2, 5, 6);
  gb2.placev(4, 1, 4);
  pl1.fire(5, 5, gb2);
  expect(gb2.ships[0].hitArr).toEqual([0, 0]);
  expect(gb2.hitMatrix[5][5]).toBe(1);
  });

  xtest('Computer shoots 5 times', () => {
    const gb1 = gameBoard();
    const gb2 = gameBoard();
    const pl1 = Player('Pierre', gb1, gb2);
    const pl2 = Player('Computer', gb2, gb1);
    gb1.placeh(3, 5, 5);
    gb1.placev(4, 1, 1);
    gb2.placeh(2, 5, 6);
    gb2.placev(4, 1, 4);
    pl2.fireAI();
    pl2.fireAI();
    pl2.fireAI();
    pl2.fireAI();
    pl2.fireAI();
    nbShot = gb1.hitMatrix.flat().reduce((a,b) => a + b, 0);
    expect(nbShot).toBe(5);
    });

    xtest('Computer shoots', () => {
      const gb1 = gameBoard();
      const gb2 = gameBoard();
      const pl1 = Player('Pierre', gb1, gb2);
      const pl2 = Player('Computer', gb2, gb1);
      gb1.placeh(3, 5, 5);
      gb1.placev(4, 1, 1);
      const xy = pl2.fireAI(gb1);
      expect(gb1.hitMatrix[xy[0]][xy[1]]).toBe(1);

    });

