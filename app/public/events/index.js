const { ipcMain, dialog } = require("electron")
const fs = require('fs')
const path = require("path")
require("./serialEvents")

ipcMain.on("about", (event, arg) => {
  dialog.showMessageBox(null,
    {
      type: "info",
      title: "TemVaga.io",
      message: "TemVaga.io - Sistema de Gerenciamento de Vagas de Estacionamento",
      detail: "Projeto experimental desenvolvido para o curso IoT – Sistemas com Engenharia de Software (USP) - v0.1 - Thiago Menezes & Murilo Silva"
    }
  )
  event.returnValue = null
})

ipcMain.on("get-config", (event, arg) => {
  const defaultBaudRates = [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 256000]
  fs.readFile(path.join(__dirname, '../serial/config.json'), 'utf8', (err, jsonString) => {
    if (err) {
      dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Não foi possível carregar configurações:  ${err}`})
      event.returnValue = {result: false, data: err}
    }
    try {
      const loadedConfig = JSON.parse(jsonString)
      event.returnValue = {result: true, data: {...loadedConfig, defaultBaudRates}}
    } catch (err) {
      dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Não foi possível carregar configurações:  ${err}`})
      event.returnValue = {result: false, data: err}
    }
  })
})

ipcMain.on("save-config", (event, arg) => {
  const {devicePath, baudRate} = arg
  fs.writeFile(path.join(__dirname, '../serial/config.json'), JSON.stringify({baudRate, devicePath}, null, 2), err => {
    if (err) {
      dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Não foi possível salvar configurações:  ${err}`})
      event.returnValue = {result: false, data: err}
    } else {
      dialog.showMessageBox(null, {title: "Sucesso!", type: "info", detail: `Configurações salvas com sucesso. `})
      event.returnValue = {result: true, data: "Configurações salvas com sucesso. "}
    }
  })
})

module.exports = ipcMain