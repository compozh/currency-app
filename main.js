const {app, BrowserWindow, ipcMain} = require('electron');
const createWindow = require('./actions/createWindow');


app.on('ready', createWindow);



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
