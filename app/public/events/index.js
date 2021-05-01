const {ipcMain} = require("electron")
const {serialPort} = require("../serial")

ipcMain.on("serial-init", async (event, arg) => {
  try {
    if(!serialPort.isOpen) {
      await serialPort.open(err => {
        if(err) {
          event.returnValue = {result: false, message: `Não foi possível abrir porta ${serialPort.path} - ${err.message}`}
        } else {
          event.returnValue = {result: true, message: `Porta ${serialPort.path} foi aberta para comunicação.`}
        } 
      })
    } else {
      event.returnValue = null
    }
  } catch(err) {
    throw new Error(`Erro interno: ${err}`)
  } 
})

ipcMain.on("serial-close", async (event, arg) => {
  try {
    if(serialPort.isOpen) {
      await serialPort.close(err => {
        if(err) {
          event.returnValue = {result: false, message: `Não foi possível fechar porta ${serialPort.path} - ${err.message}`}
        } else {
          event.returnValue = {result: true, message: `Porta ${serialPort.path} foi fechada com sucesso.`}
        }
      })
    } else {
      event.returnValue = null
    }
  } catch(err) {
    throw new Error(`Erro interno: ${err}`)
  }
})

module.exports = ipcMain