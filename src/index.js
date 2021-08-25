import  './style.css';
import { ship } from './modules/Ship'

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = '<h1>Title</h1>'

  return element;
}

document.body.appendChild(component());