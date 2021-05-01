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
    mainWindow.webContents.send("port-opened", port)
  })
}

module.exports = registerMainProcessEventEmitters