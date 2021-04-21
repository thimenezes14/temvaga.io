const {baudRate, defaultPort} = require('./config.json').serialconfig1;
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const serialPort = new SerialPort(defaultPort, {baudRate, autoOpen: false, lock: false})
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }))

module.exports.getData = onDataReceived => parser.on('data', onDataReceived)
module.exports.serialPort = serialPort