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
        gbItem.dataset.x = i;
        gbItem.dataset.y = j;
        gbItem.dataset.name = player.name;
        gbItem.textContent = 'A';
        gbContainer.appendChild(gbItem);
      };
    };
    return gbContainer;
  };

  const renderShip = (player) => {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(gridItem => {
      const x = parseInt(gridItem.dataset.x);
      const y = parseInt(gridItem.dataset.y);
      const shipID = player.gb.whichShip(x, y);

      if (shipID > -1) {
        console.log('ship');
        gridItem.classList.add('ship');
      };
    });
  };

  const renderSunkShip = (player) => {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(gridItem => {
      const x = parseInt(gridItem.dataset.x);
      const y = parseInt(gridItem.dataset.y);
      const shipID = player.gb.whichShip(x, y);

      if (player.gb.ships[shipID].isSunk()) {
        gridItem.classList.add('sunk');
      };
    });
  };

  const renderUI = (player, computer) => {
    const header = renderHeader();
    const flexContainer = renderFlexContainer()
    const plGB = renderGB(player);
    const cpGB = renderGB(computer);
    flexContainer.appendChild(plGB);
    flexContainer.appendChild(cpGB);

    const footer = renderFooter();
    document.body.appendChild(header);
    document.body.appendChild(flexContainer);
    document.body.appendChild(footer);

    renderShip(player);
    renderShip(computer);
  };


  return { renderHeader, renderFooter, renderGB, renderUI, renderShip };
};

module.exports = UI;