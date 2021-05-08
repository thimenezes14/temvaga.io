const {baudRate, defaultPort} = require('./config.json').serialconfig1;
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const serialPort = new SerialPort(defaultPort, {baudRate, autoOpen: false, lock: false})
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }))

module.exports.getData = onDataReceived => parser.on('data', onDataReceived)
module.exports.onOpen = onOpen => serialPort.on("open", () => onOpen(serialPort.path))
module.exports.onClose = onClose => serialPort.on("close", () => onClose(serialPort.path))
module.exports.write = (dataToWrite, delay) => setTimeout(() => serialPort.write(dataToWrite), delay === true ? 2000 : 50)
module.exports.lookUp = () => SerialPort.list()
module.exports.serialPort = serialPort