const {getData, onClose, onOpen, lookUp, write} = require("../serial")

const registerMainProcessEventEmitters = (mainWindow, app) => {
  getData(data => {
    mainWindow.webContents.send("data-received", data)
    if(RegExp(/^(ALL@)/).test(data)) {
      const devicesFound = data.replace(/^(ALL@)/, "").split(",")
      mainWindow.webContents.send("devices-found", devicesFound)
      console.log(devicesFound)
      devicesFound.forEach((deviceName, index) => setTimeout(() => write(deviceName + "\0", false), index * 10))
    }
    if(RegExp(/^(ESP+\w{1,}@)/).test(data)) { 
      const deviceName = data.split("@")[0]
      const statesList = data.replace(/^(ESP+\w{1,}@)/, "").split(",").map(state => parseInt(state) === 1)
      console.log({name: deviceName, states: statesList})
      mainWindow.webContents.send("device-info", {name: deviceName, states: statesList})
    }
  })
  
  onClose(port => mainWindow.webContents.send("port-closed", port))
  onOpen(port => mainWindow.webContents.send("port-opened", port))

  lookUp()
    .then(portsAvailable => mainWindow.webContents.send("ports-available", portsAvailable.map(port => port.path)))
    .catch(() => mainWindow.webContents.send("ports-available", null))

}

module.exports = registerMainProcessEventEmitters