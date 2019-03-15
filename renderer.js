const { ipcRenderer } = require('electron');
const currentCurrencyRateBtn = document.querySelector('#currentBtn');
const historyCurrencyRateBtn = document.querySelector('#historyBtn');
const currentCurrencyRateTable = document.querySelector('#currentRate > tbody');
const historyCurrencyRateTable = document.querySelector('#historyRate > tbody');

ipcRenderer.send('get-current-data');
ipcRenderer.on('current-data', (event, message) => fillingTable(currentCurrencyRateTable, message));
ipcRenderer.on('history', (event, message) => fillingTable(historyCurrencyRateTable, message));

currentCurrencyRateBtn.onclick = () => ipcRenderer.send('get-current-data');
historyCurrencyRateBtn.onclick = () => ipcRenderer.send('get-history-data');

function  fillingTable(tableBody, data) {
  tableBody.innerHTML = ''; //clear old data
  
  for (let key in data) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = key;
    tr.appendChild(td);
    
    for (let value in data[key]) {
      let td = document.createElement('td');
      td.innerHTML = data[key][value];
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
}
