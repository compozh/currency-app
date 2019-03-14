const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const url = 'http://resources.finance.ua/ru/public/currency-cash.json';
let mainWindow;

app.on('ready', createWindow);

ipcMain.on('get-data', () => {
  axios.get(url)
  .then(response => getUSDCurrencyExchange(response))
  .then(response => getTotalValues(response))
  .then(response => mainWindow.webContents.send('data', response))
  .catch(error => console.log(error));
});

function createWindow() {
  
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });
  
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function request() {
  axios.get(url)
  .then(response => getUSDCurrencyExchange(response))
  .then(response => getTotalValues(response))
  .then(response => mainWindow.webContents.send('data', response))
  .catch(error => console.log(error));
}

function getUSDCurrencyExchange(dataSource) {
  const currencyRate = dataSource.data.organizations;
  const resultValues = { ask: [], bid: [] };
  
  currencyRate.forEach(rateObject => {
    let USDCurrencyExchange = rateObject.currencies.USD;
    if (USDCurrencyExchange) {
      resultValues.ask.push(+USDCurrencyExchange.ask);
      resultValues.bid.push(+USDCurrencyExchange.bid);
    }
  });
  return resultValues;
}

function getTotalValues(USDCurrencyExchange) {
  const totalValues = { ask: {}, bid: {} };
  
  totalValues.ask.max = getMaxValue(USDCurrencyExchange.ask);
  totalValues.ask.min = getMinValue(USDCurrencyExchange.ask);
  totalValues.ask.avr = getAvrValue(USDCurrencyExchange.ask);
  totalValues.bid.max = getMaxValue(USDCurrencyExchange.bid);
  totalValues.bid.min = getMinValue(USDCurrencyExchange.bid);
  totalValues.bid.avr = getAvrValue(USDCurrencyExchange.bid);
  
  return totalValues
}

function getMaxValue(valuesArray) {
  return Math.max.apply(null, valuesArray);
}

function getMinValue(valuesArray) {
  return Math.min.apply(null, valuesArray);
}

function getAvrValue(valuesArray) {
  return valuesArray.reduce((sum, current) => sum + current) / valuesArray.length;
}

function writeToDb() {

}
