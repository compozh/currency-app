const { ipcRenderer } = require('electron');
const currencyRateBtn = document.querySelector('#getBtn');
const currencyRateOutput = document.querySelector('#output');

ipcRenderer.on('data', (event, message) => {
  currencyRateOutput.innerHTML = JSON.stringify(message);
});

currencyRateBtn.addEventListener('click', () => ipcRenderer.send('getData'));
