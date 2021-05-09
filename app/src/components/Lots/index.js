import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { receiveEvent } from '../../services/electronApi';
import {CardPulse} from './style'
import ModalLots from './modalLots'

export default function Lots() {
  const [lots, setLots] = useState([])
  const [lotSelected, setLotSelected] = useState({})
  const [lastChangeState, setLastChangeState] = useState({})
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    receiveEvent("device-info", data => {
      const { name, states } = data
      setLots(lotArray => {
        if (lotArray.every(lot => lot.name !== name)) {
          return [...lotArray, { name, states }]
        } else {
          const newLotArray = lotArray.map(lot => {
            if (lot.name === name) {
              lot.states = states
            }
            return lot
          })
          return newLotArray
        }
      })
      setLastChangeState(data)
    })
  }, [])

  const showDetails = lotInfo => {
    setLotSelected(lotInfo)
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
    setLotSelected({})
  }

  return (
    <>
    <ModalLots show={modalShow} onHide={() => closeModal()} lotInfo={lotSelected} />
    <Container fluid className="d-flex align-items-center justify-content-center bg-dark" style={{height: '100vh'}}>
      <Container className="text-center">
        <Row className="d-flex align-items-center justify-content-center">
          {
            lots.map((lot, index) => (
              <Col sm={6} md={6} lg={3} xl={3} key={index}>
              <CardPulse id={lot.name} willAnimate={lastChangeState.name === lot.name} onAnimationEnd={() => setLastChangeState({})}>
                <Card style={{padding: '3px', margin: '5px'}}>
                  <Card.Body>
                    <Card.Title><strong>{lot.name}</strong></Card.Title>
                    <Card.Text>
                      {lot.states.filter(state => state === true).length + " de " + lot.states.length + " vaga(s) disponível(is)"}
                    </Card.Text>
                    <Button variant="primary" onClick={() => showDetails(lot)}><FontAwesomeIcon icon="eye" /> Ver vagas</Button>
                  </Card.Body>
                </Card>
                </CardPulse>
              </Col>
            ))
          }
        </Row>
      </Container>
    </Container>
    </>
  );
}

/*
        <Container key={index} className="bg-dark">
          <h2 className="text-white">{lot.name}</h2>
          <hr />
          <Container>
            {
              lot.states.map((state, i) => (
                <span key={i} className={state === true ? "text-success" : "text-danger"}><FontAwesomeIcon icon={state === true ? "check-circle" : "times-circle"} /></span>
              ))
            }
          </Container>
        </Container>

*/