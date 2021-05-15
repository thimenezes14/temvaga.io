const fs = require("fs")
const filePath = require("path")
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

let config = JSON.parse(fs.readFileSync(filePath.join(__dirname, "config.json"), "utf-8")) || null
let serialPort = new SerialPort(config?.devicePath, {baudRate: Number(config?.baudRate), autoOpen: false, lock: false})
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }))

const reloadConfig = (devicePath, baudRate) => {
  serialPort = new SerialPort(devicePath, {baudRate: Number(baudRate), autoOpen: false, lock: false})
  console.log(serialPort.path)
}

module.exports.getData = onDataReceived => parser.on('data', onDataReceived)
module.exports.onOpen = onOpen => serialPort.on("open", () => onOpen(serialPort.path))
module.exports.onClose = onClose => serialPort.on("close", () => onClose(serialPort.path))
module.exports.write = (dataToWrite, delay) => {
  console.log(serialPort.path)
  try {
    setTimeout(() => serialPort.write(dataToWrite), delay === true ? 2000 : 50)
  } catch(err) {
    throw new Error(err)
  }
}
module.exports.lookUp = () => SerialPort.list()
module.exports.reloadConfig = reloadConfig
module.exports.serialPort = serialPort