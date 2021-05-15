import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState} from 'react'
import { Accordion, Button, Container } from 'react-bootstrap';
import {receiveEvent} from '../../services/electronApi'

export default function Footer() {

  const [debuggerMessage, setDebuggerMessage] = useState([])
  const divRef = useRef(null)

  useEffect(() => {
    receiveEvent("data-received", data => {
      setDebuggerMessage(d => [...d, {datetime: new Date().toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit', second: '2-digit'}), msg: data }])
      divRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  return (
    <Container fluid className="fixed-bottom bg-info">
      <Container fluid style={{ paddingTop: '10px' }}>
        <Accordion>
          <Container fluid>
            <Accordion.Toggle as={Button} eventKey="0" className="bg-primary w-100 text-left">
              <span><FontAwesomeIcon icon="desktop" /> Monitor Serial</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0" className="bg-light">
              <div className="overflow-auto" style={{ height: '100px' }}>
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
      <br />
    </Container>
  );
}