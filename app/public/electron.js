const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require("url")
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');
const registerMainProcessEventEmitters = require("./events/registerMainProcessEventEmitters")
require('./events/index.js')

contextMenu({
  labels: {
    copy: 'Copiar',
    cut: 'Recortar',
    paste: 'Colar',
    saveLinkAs: 'Salvar link como...',
    saveImageAs: 'Salvar imagem como...',
    lookUpSelection: 'Consultar “{selection}”',
    inspect: 'Inspecionar elemento'
  },

  prepend: (defaultActions, parameters, browserWindow) => [
    {
      label: 'Rainbow',
      // Only show it when right-clicking images
      visible: parameters.mediaType === 'image'
    },
    {
      label: 'Search Google for “{selection}”',
      // Only show it when right-clicking text
      visible: parameters.selectionText.trim().length > 0,
      click: () => {
        //shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
      }
    }
  ]
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 576,
    minHeight: 384,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "config", "preload.js") // use a preload script
    },
    icon: './images/temvaga-256x256.png'
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : url.format({ pathname: path.join(__dirname, '/index.html'), protocol: 'file:', slashes: true }))
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  registerMainProcessEventEmitters(mainWindow, app) //Obtém referência do programa e registra eventos que devem ser enviados ao renderer.

  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});