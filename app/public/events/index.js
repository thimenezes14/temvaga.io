const {ipcMain} = require("electron")
const {serialPort} = require("../serial")

ipcMain.on("serial-init", async (event, arg) => {
  try {
    await serialPort.open(err => {
      let openResult = {
        result: null,
        message: ``
      }
      if(err) {
        openResult.result = false
        openResult.message = `Não foi possível abrir porta ${serialPort.path} - ${err.message}`
      } else {
        openResult.result = true
        openResult.message = `Porta ${serialPort.path} foi aberta para comunicação.`

        serialPort.on("close", () => {
          console.log("Porta foi fechada. ")
        })
      }
      event.returnValue = openResult
    }) 
  } catch(err) {
    throw new Error(`Erro interno: ${err}`)
  } 
})

ipcMain.on("serial-close", async (event, arg) => {
  try {
    await serialPort.close(err => {
      let closeResult = {
        result: null,
        message: ``
      }
      if(err) {
        closeResult.result = false
        closeResult.message = `Não foi possível fechar porta ${serialPort.path} - ${err.message}`
      } else {
        closeResult.result = true
        closeResult.message = `Porta ${serialPort.path} foi fechada com sucesso.`
      }
      event.returnValue = closeResult
    })
  } catch(err) {
    throw new Error(`Erro interno: ${err}`)
  }
})

module.exports = ipcMain