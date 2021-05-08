const {ipcMain} = require("electron")
const {serialPort, write} = require("../serial")

const setReturnValue = (result, message) => {
  return {result, message}
}

ipcMain.on("serial-init", async (event, arg) => {
  try {
    if(!serialPort.isOpen) {
      await serialPort.open(err => {
        if(err) {
          event.returnValue = setReturnValue(false, `Não foi possível abrir porta ${serialPort.path} - ${err.message}`)
        } else {
          event.returnValue = setReturnValue(true, `Porta ${serialPort.path} foi aberta para comunicação.`)
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
          event.returnValue = setReturnValue(false, `Não foi possível fechar porta ${serialPort.path} - ${err.message}`)
        } else {
          event.returnValue = setReturnValue(true, `Porta ${serialPort.path} foi fechada com sucesso.`)
        }
      })
    } else {
      event.returnValue = null
    }
  } catch(err) {
    throw new Error(`Erro interno: ${err}`)
  }
})

ipcMain.on("all", async (event, arg) => {
  try {
    await write("ALL", true)
    event.returnValue = true
  } catch(err) {
    console.log(`Erro: ${err}`)
    event.returnValue = false
  }
})

module.exports = ipcMain