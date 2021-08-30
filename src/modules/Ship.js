const ship = (length, direction = 'h') => {
  const hitArr = new Array(length).fill(0); //Hit: 1, Not Hit:0
  const hit = (index) => hitArr[index] = 1;
  const isSunk = () => {
    if (hitArr.reduce((a, b) => a + b, 0) === length) return true;
    return false;
  };
  return { length, direction, hitArr, hit, isSunk };
}

module.exports = ship;