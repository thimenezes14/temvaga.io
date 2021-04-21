const {
  contextBridge,
  ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld("api", {
  dispatchEvent: async (channel, data) => await ipcRenderer.sendSync(channel, data),
  receiveEvent: async (channel, func) => await ipcRenderer.on(channel, (event, ...args) => func(...args))
})