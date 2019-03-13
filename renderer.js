const { ipcRenderer } = require('electron');
const currencyRateBtn = document.querySelector('#getBtn');
const currencyRateOutput = document.querySelector('#output');

ipcRenderer.send('get-data');
ipcRenderer.on('data', (event, message) => {
  currencyRateOutput.innerHTML = JSON.stringify(message);
});

currencyRateBtn.onclick = () => ipcRenderer.send('get-data');
