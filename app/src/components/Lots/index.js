import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { receiveEvent } from '../../services/electronApi';
import { CardPulse } from './style'
import ModalLots from './modalLots'
import { SerialStateContext } from '../../contexts/SerialStateContext';

export default function Lots() {
  const state = useContext(SerialStateContext)
  const [lots, setLots] = useState([])
  const [lotSelected, setLotSelected] = useState({})
  const [lastChangeState, setLastChangeState] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const [carouselItems, setCarouselItems] = useState([])
  const [carouselIndex, setCarouselIndex] = useState(0)

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

  useEffect(() => {
    const totalLots = lots.length
    const LOTS_PER_ITEM = 6
    const totalCarouselItems = Math.ceil(totalLots / LOTS_PER_ITEM)
    let items = []
    for (let i = 0; i < totalCarouselItems; i++) {
      items.push(lots.slice(i * LOTS_PER_ITEM, (i + 1) * LOTS_PER_ITEM))
    }
    setCarouselItems(items)
  }, [lots])

  useEffect(() => {
    if (state.serialState === false) {
      setLots([])
      setLotSelected({})
      setLastChangeState({})
      setModalShow(false)
    }
  }, [state.serialState])

  const showDetails = lotInfo => {
    setLotSelected(lotInfo)
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
    setLotSelected({})
  }

  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  return (
    <>
      <ModalLots show={modalShow} onHide={() => closeModal()} lotInfo={lotSelected} />
      
      <Container fluid className="d-flex align-items-center justify-content-center bg-dark" style={{ height: '100vh' }}>
        <Container className="text-center">
          {
            lots.length > 0 &&
            <Carousel interval={null} activeIndex={carouselIndex} onSelect={handleSelect}>
              {
                carouselItems.map((item, itemIndex) => (
                  <Carousel.Item key={itemIndex} style={{padding: '3rem 8rem'}}>
                    <Row className="d-flex align-items-center justify-content-center" >
                      {
                        item.map((lot, index) => (
                          <Col sm={6} md={6} lg={4} xl={4} key={index}>
                            <CardPulse id={lot.name} willAnimate={lastChangeState.name === lot.name} onAnimationEnd={() => setLastChangeState({})}>
                              <Card style={{ padding: '3px', margin: '5px' }}>
                                <Card.Body>
                                  <Card.Title><strong>{lot.name}</strong></Card.Title>
                                  <ProgressBar animated now={lot.states.filter(state => state === true).length} min={0} max={lot.states.length} />
                                  <Card.Text>
                                    {lot.states.filter(state => state === true).length + "/" + lot.states.length + " vaga(s) disp."}
                                  </Card.Text>
                                  <Button variant="primary" onClick={() => showDetails(lot)}><FontAwesomeIcon icon="eye" /> Ver vagas</Button>
                                </Card.Body>
                              </Card>
                            </CardPulse>
                          </Col>
                        ))
                      }
                    </Row>
                  </Carousel.Item>
                ))
              }
            </Carousel>
          }
        </Container>
      </Container>
    </>
  );
}