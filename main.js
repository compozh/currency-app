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
.then(response => global.sharedObject = response);
