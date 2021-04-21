const {ipcMain} = require("electron")
const {serialPort} = require("../serial")

ipcMain.on("serial-init", async (event, arg) => {
  await serialPort.open(err => {
    if(err) {
      throw new Error("ERRO: Não foi possível abrir porta " + serialPort.path + " - " + err.message)
    }
    event.returnValue = "INFO: Porta " + serialPort.path + " foi aberta para comunicação. "
    //event.returnValue = getData
  })  
})

module.exports = ipcMain