const ship = require('./Ship');

test('ship length', () => {
  expect(ship(4).length).toBe(4);
});

test('shit hit array', () => {
  const ship1 = ship(4);
  expect(ship1.hitArr).toEqual([0, 0, 0, 0]);
});

test('ship hit', () => {
  const ship1 = ship(4);
  ship1.hit(0);
  expect(ship1.hitArr).toEqual([1, 0, 0, 0]);
});

test('ship is not sunk', () => {
  const ship1 = ship(4);
  expect(ship1.isSunk()).toBe(false);
});

test('ship hit but not sunk', () => {
  const ship1 = ship(4);
  ship1.hit(0)
  expect(ship1.isSunk()).toBe(false);
});

test('ship sunk', () => {
  const ship1 = ship(4);
  ship1.hit(0);
  ship1.hit(1);
  ship1.hit(2);
  ship1.hit(3);
  expect(ship1.isSunk()).toBe(true);
});