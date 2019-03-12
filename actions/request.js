const axios = require('axios');


axios
.get('http://resources.finance.ua/ru/public/currency-cash.json')
.then(response => getUSDCurrencyExchange(response))
.then(response => getTotalValues(response))
.then(response => global.currencyRate = response)
.catch();
