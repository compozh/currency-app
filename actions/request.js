const axios = require('axios');

module.exports = () => {
  axios.get('http://resources.finance.ua/ru/public/currency-cash.json')
  .then(response => getUSDCurrencyExchange(response))
  .then(response => getTotalValues(response))
  .then(response => console.log(response))
  .catch(error => console.log(error));
};

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
