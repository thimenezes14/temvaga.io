const {
  contextBridge,
  ipcRenderer,
  remote
} = require("electron");

contextBridge.exposeInMainWorld("api", {
  dispatchEvent: async (channel, data) => await ipcRenderer.sendSync(channel, data),
  receiveEvent: async (channel, func) => await ipcRenderer.on(channel, (event, ...args) => func(...args)),
  relaunch: () => remote.app.quit()
})