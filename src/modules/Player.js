const Player = (name, pGB, eGB) => {
  const fire = (x, y) => {
    eGB.receiveAttack(x, y);
  };
  const fireAI = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    fire(x, y);
  };
  return { name, fire, fireAI };
};

module.exports = Player;