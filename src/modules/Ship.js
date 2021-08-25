const ship = (length, x, y) => {
  //const length = length;
  const hitArr = new Array(length).fill(0); //Hit: 1, Not Hit:0
  const hit = (index) => hitArr[index] = 1;
  const isSunk = () => {
    if (hitArr.reduce((a, b) => a + b, 0) === length) return true;
    return false;
  };
  return { length, hitArr, hit, isSunk };
}

module.exports = ship;