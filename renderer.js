const { ipcRenderer } = require('electron');
const currencyRateBtn = document.querySelector('#getBtn');
const currencyRateOutput = document.querySelector('#output');

ipcRenderer.send('get-data');
ipcRenderer.on('data', (event, message) => {

  for (let key in message) {
    let tr = document.createElement('tr');
    tr.innerHTML = key;
    for (let value in message[key]) {
      let td = document.createElement('td');
      console.log(value);
      td.innerHTML = value;
      tr.appendChild(td);
      //console.log(document.querySelector(`.${key}-${value}`));
      //console.log(`.${key}-${value}`);
      
      //.innerHTML = message[key][value];
    }
  }
  currencyRateOutput.innerHTML = JSON.stringify(message);
});

currencyRateBtn.onclick = () => ipcRenderer.send('get-data');



function  createTable() {

}
