const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

const url = 'http://resources.finance.ua/ru/public/currency-cash.json';
let mainWindow;

app.on('ready', createWindow);

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

ipcMain.on('get-current-data', () => {
  axios.get(url)
  .then(response => getUSDCurrencyExchange(response))
  .then(response => getTotalValues(response))
  .then(response => mainWindow.webContents.send('current-data', response))
  .catch(error => console.log(error));
});

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
  
  return totalValues;
}

function getMaxValue(valuesArray) {
  return Math.max.apply(null, valuesArray).toFixed(2);
}

function getMinValue(valuesArray) {
  return Math.min.apply(null, valuesArray).toFixed(2);
}

function getAvrValue(valuesArray) {
  return (valuesArray
  .reduce((sum, current) => sum + current) / valuesArray.length).toFixed(2);
}

function writeToDb() {

}

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
//
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
//
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//     console.log(row.id + ": " + row.info);
//   });
// });
//
// db.close();
