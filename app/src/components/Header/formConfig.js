import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { dispatchEvent } from '../../services/electronApi';

export default function FormConfig() {
  const [defaultBaudRates, setDefaultBaudRates] = useState([])
  const [devicePath, setDevicePath] = useState("")
  const [baudRate, setBaudRate] = useState("")
  useEffect(() => {
    dispatchEvent("get-config")
    .then(data => {
      if(data.result === true) {
        setDefaultBaudRates(data.data.defaultBaudRates)
        setBaudRate(data.data.baudRate)
        setDevicePath(data.data.devicePath)
      }
    })
    .catch(err => {
      throw new Error(err)
    })
  }, [])

  const handleSaveConfig = evt => {
    evt.preventDefault()
    dispatchEvent("save-config", {devicePath, baudRate})
  }
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Caminho da porta serial
         <Form.Control type="text" placeholder="Ex.: COM3, /dev/ttyUSB0 etc." value={devicePath || ''} onChange={e => setDevicePath(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          BaudRate (bits por segundo)
         <Form.Control as="select" value={baudRate} onChange={e => setBaudRate(e.target.value)}>
            {
              defaultBaudRates.map((bd, i) => (
                <option key={i} value={bd}>{bd}</option>
              ))
            }
          </Form.Control>
        </Form.Label>
      </Form.Group>
      <Form.Label>
        <Alert variant="info"><strong>PARA QUE AS ALTERAÇÕES SURTAM EFEITO, POR FAVOR, REINICIE O PROGRAMA</strong></Alert>
      </Form.Label>
      <Form.Group>
        <Button variant="success" onClick={handleSaveConfig}>Salvar configurações</Button>
      </Form.Group>
    </Form>
  );
}