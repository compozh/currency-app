const { app, BrowserWindow } = require('electron');
const axios = require('axios');
const path = require('path');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
  mainWindow.show();
  mainWindow.on('ready-to-show', () => mainWindow.show());
});

axios
.get('http://resources.finance.ua/ru/public/currency-cash.json')
.then(response => getUSDCurrencyExchange(response))
.then(response => getTotalValues(response))
.then(response => global.currencyRate = response)
.catch();

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
  totalValues.ask.average = getAverageValue(USDCurrencyExchange.ask);
  totalValues.bid.max = getMaxValue(USDCurrencyExchange.bid);
  totalValues.bid.min = getMinValue(USDCurrencyExchange.bid);
  totalValues.bid.average = getAverageValue(USDCurrencyExchange.bid);
  
  return totalValues
}

function getMaxValue(valuesArray) {
  return Math.max.apply(null, valuesArray);
}

function getMinValue(valuesArray) {
  return Math.min.apply(null, valuesArray);
}

function getAverageValue(valuesArray) {
 return valuesArray.reduce((sum, current) => sum + current) / valuesArray.length;
}

function writeToDb() {

}
