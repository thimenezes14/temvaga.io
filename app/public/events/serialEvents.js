const {ipcMain, dialog} = require("electron")

function setReturnValue(result, message) {
  return {result, message}
}

ipcMain.on("serial-start", (event, arg) => {
  try {
    const {serialPort} = require("../serial")
    if(!serialPort.isOpen) {
      serialPort.open(err => {
        if(err) {
          dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Não foi possível abrir porta ${serialPort.path} - ${err.message}`})
          event.returnValue = setReturnValue(false, `Não foi possível abrir porta ${serialPort.path} - ${err.message}`)
        } else {
          dialog.showMessageBox(null, {title: "Sucesso!", type: "info", detail: `Porta ${serialPort.path} foi aberta para comunicação.`})
          event.returnValue = setReturnValue(true, `Porta ${serialPort.path} foi aberta para comunicação.`)
        } 
      })
    } else {
      dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Porta já está aberta para comunicação. Verificar ${serialPort.path}`})
      event.returnValue = setReturnValue(false, `Porta já está aberta para comunicação. Verificar ${serialPort.path}`)
    }
  } catch(err) {
    dialog.showErrorBox("Erro Interno", `Ocorreu um erro: ${err}`)
    throw new Error(`Erro interno: ${err}`)
  } 
})

ipcMain.on("serial-stop", async (event, arg) => {
  try {
    const {serialPort} = require("../serial")
    if(serialPort.isOpen) {
      await serialPort.close(err => {
        if(err) {
          dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Não foi possível fechar porta ${serialPort.path} - ${err.message}`})
          event.returnValue = setReturnValue(false, `Não foi possível fechar porta ${serialPort.path} - ${err.message}`)
        } else {
          dialog.showMessageBox(null, {title: "Sucesso!", type: "info", detail: `Porta ${serialPort.path} foi fechada com sucesso.`})
          event.returnValue = setReturnValue(true, `Porta ${serialPort.path} foi fechada com sucesso.`)
        }
      })
    } else {
      dialog.showMessageBox(null, {title: "Atenção!", type: "error", detail: `Nenhuma porta aberta foi encontrada. `})
      event.returnValue = setReturnValue(false, `Nenhuma porta aberta foi encontrada. `)
    }
  } catch(err) {
    dialog.showErrorBox("Erro Interno", `Ocorreu um erro: ${err}`)
    throw new Error(`Erro interno: ${err}`)
  }
})

ipcMain.on("all", async (event, arg) => {
  try {
    const {write} = require("../serial")
    await write("ALL", true)
    event.returnValue = true
  } catch(err) {
    console.log(`Erro: ${err}`)
    event.returnValue = false
  }
})