const { BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

module.exports = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(path.join('file://', __dirname, '../index.html'));
  mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })
};
