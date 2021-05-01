import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useRef, useState} from 'react'
import {dispatchEvent, receiveEvent} from './services/electronApi'
import {Accordion, Button, Col, Container, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const App = () => {
  const [serialInit, setSerialInit] = useState({})
  const [debuggerMessage, setDebuggerMessage] = useState([])
  const divRef = useRef(null)

  useEffect(() => {
    receiveEvent("data-received", data => {
      setDebuggerMessage(d => [...d, {datetime: new Date().toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit', second: '2-digit'}), msg: data }])
      divRef.current?.scrollIntoView({ behavior: "smooth" })
    })
    receiveEvent("port-opened", portNumber => {
      console.log("Porta foi aberta em " + portNumber)
    })
    receiveEvent("port-closed", portNumber => {
      console.log("Porta " + portNumber + " foi fechada. Você pode ter feito isso ou o dispositivo foi desconectado da comunicação serial. ")
    })
  }, [])

  const openPort = () => {
    dispatchEvent("serial-init")
    .then(openSuccess => {
      if(openSuccess !== null) {
        const {result, message} = openSuccess
        setSerialInit({result, message})
      }
    })
    .catch(openError => {
      const {result, message} = openError
      setSerialInit({result, message})
    })
    .catch(err => {
      console.log(err)
    })
  }

  const closePort = () => {
    dispatchEvent("serial-close")
    .then(closeSuccess => {
      if(closeSuccess !== null) {
        const {result, message} = closeSuccess
        setSerialInit({result, message})
      }
    })
    .catch(closeError => {
      const {result, message} = closeError
      setSerialInit({result, message})
    })
    .catch(err => {
      console.log(err)
    })  
  }

  return (
    <Container fluid className="app">
      <Container fluid className="fixed-bottom bg-info">
        <Container fluid style={{paddingTop: '10px'}}>
          <Accordion defaultActiveKey="0">
            <Container fluid>
              <Accordion.Toggle as={Button} eventKey="0" className="bg-primary w-100 text-left">
                <span><FontAwesomeIcon icon="desktop" /> Monitor Serial</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0" className="bg-light">
                <div className="overflow-auto" style={{height: '100px'}}>
                  {
                    debuggerMessage.map((d, index) => (
                      <p key={index}>{d.datetime} - <strong>{d.msg}</strong></p>
                    ))
                  }
                  <div ref={divRef}></div>
                </div>
              </Accordion.Collapse>
            </Container>
          </Accordion>
        </Container>
        <Container fluid className="status-bar">
          <Row style={{height: '100%'}}>
            <Col sm={3} className="d-flex align-items-center text-center">
              <span className="text-white" style={{padding: '10px'}}><FontAwesomeIcon icon="microchip" className="fa-2x" /></span>
              <Button className="bg-success" onClick={openPort}><FontAwesomeIcon icon="play" /></Button>
              <Button className="bg-danger" onClick={closePort}><FontAwesomeIcon icon="stop" /></Button>
            </Col>
            <Col sm={8} className="d-flex align-items-center">
              <span className="text-white">Status: {serialInit?.message}</span>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
}

export default App;
