const {ipcRenderer} = require('electron');


console.log(currencyRate);
// const currencyExchangeBtn = document.querySelector('#getBtn');
const currencyExchangeOutput = document.querySelector('#output');
currencyExchangeOutput.innerHTML = currencyRate;
// const url = 'http://resources.finance.ua/ru/public/currency-cash.json';
// currencyExchangeBtn.addEventListener('click', getCurrencyExchange);
//
// function getCurrencyExchange(url) {
//   const xhr = new XMLHttpRequest();
//
//   xhr.open('GET', url);
//   xhr.send();
//
//   if (xhr.status !== 200) {
//     // обработать ошибку
//     alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
//   } else {
//     // вывести результат
//     currencyExchangeOutput.innerText = xhr.responseText;
//   }
// }

