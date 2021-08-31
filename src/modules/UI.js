const UI = () => {

  const renderHeader = () => {
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<h1>BattleShip</h1>';

    return header;
  };

  const renderFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = 'Made by Michael Tanguy';

    return footer;
  };

  const renderFlexContainer = () => {
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');

    return flexContainer;
  };

  const renderGB = (player) => {
    const gbContainer = document.createElement('div');
    gbContainer.classList.add('cg-container');
    gbContainer.classList.add('grid-container');
    for (let i = 0; i < player.gb.size; i++) {
      for (let j = 0; j < player.gb.size; j++) {
        const gbItem = document.createElement('div');
        gbItem.classList.add('grid-item');
        gbItem.classList.add(player.name);
        gbItem.dataset.x = j;
        gbItem.dataset.y = i;
        gbItem.dataset.name = player.name;
        gbItem.textContent = 'A';
        gbContainer.appendChild(gbItem);
      };
    };
    return gbContainer;
  };

  const renderSeparator = () => {
    const separator = document.createElement('div');
    separator.classList.add('separator');
    const high = document.createElement('div');
    high.classList.add('high');
    high.id = 'score-display';
    const middle = document.createElement('div');
    middle.classList.add('middle');
    middle.textContent = 'Select a case to begin';
    const low = document.createElement('div');
    low.classList.add('low');
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('btn');
    restartBtn.id = 'restart-btn';
    restartBtn.textContent = 'Restart';
    low.appendChild(restartBtn);
    separator.appendChild(high);
    separator.appendChild(middle);
    separator.appendChild(low);
    return separator;
  };

  const renderShip = (player) => {
    const gridItems = document.querySelectorAll(`.grid-item.${player.name}`);

    gridItems.forEach(gridItem => {
      const x = parseInt(gridItem.dataset.x);
      const y = parseInt(gridItem.dataset.y);
      const shipID = player.gb.whichShip(x, y);

      if (shipID > -1) {
        gridItem.classList.add('ship');
      };
    });
  };

  const renderScore = (player, computer) => {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Human: ${player.score}, Computer: ${computer.score}`;
  }

  const renderSunkShip = (player) => {
    const ships = player.gb.ships;
    ships.forEach((ship, index) => {
      if (ship.isSunk()) {
        const shipCoords = player.gb.shipPositions[index];
        shipCoords.forEach(coord => {
          const shipItem = document.querySelector(`.${player.name}[data-x="${coord[0].toString()}"][data-y="${coord[1].toString()}"]`);
          shipItem.classList.add('sunk');
        });
      }
    });
  };

  const renderUI = (player, computer) => {

    const main = document.createElement('div');
    main.classList.add('main');

    const header = renderHeader();
    const flexContainer = renderFlexContainer();
    const plGB = renderGB(player);
    const cpGB = renderGB(computer);
    const separator = renderSeparator();

    flexContainer.appendChild(plGB);
    flexContainer.appendChild(separator);
    flexContainer.appendChild(cpGB);

    const footer = renderFooter();
    main.appendChild(header);
    main.appendChild(flexContainer);
    main.appendChild(footer);

    document.body.appendChild(main);

    renderShip(player);
    renderShip(computer);
    renderScore(player, computer);

    return main;
  };

  const refreshUI = (player, computer) => {
    const exMain = document.querySelector('.main');

    const main = renderUI(player, computer);

    document.body.replaceChild(main, exMain);
  };


  return { renderUI, refreshUI, renderShip, renderSunkShip, renderScore };
};

module.exports = UI;