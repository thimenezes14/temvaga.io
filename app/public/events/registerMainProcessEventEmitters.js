const {getData, onClose, onOpen} = require("../serial")

const registerMainProcessEventEmitters = mainWindow => {
  getData(data => {
    console.log(data)
    mainWindow.webContents.send("data-received", data)
  })
  
  onClose(port => {
    mainWindow.webContents.send("port-closed", port)
  })
  
  onOpen(port => {
    console.log(`Porta ${port} aberta. `)
  })
}

module.exports = registerMainProcessEventEmitters