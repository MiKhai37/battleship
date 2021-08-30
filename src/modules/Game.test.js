const Game = require('./Game');

test('Ship Random Position', () => {
  const game = Game();
  game.posRandom(game.computer);
  expect(game.computer.gb.matrix.flat().reduce((a,b) => a + b ,0)).toBe(14);
});