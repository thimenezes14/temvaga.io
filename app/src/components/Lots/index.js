import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { receiveEvent } from '../../services/electronApi';

export default function Lots() {
  const [lots, setLots] = useState([])
  useEffect(() => {
    receiveEvent("device-info", data => {
      const {name, states} = data
      setLots(lotArray => {
        if(lotArray.every(lot => lot.name !== name)) {
          return [...lotArray, {name, states}]
        } else {
          const newLotArray = lotArray.map(lot => {
            if(lot.name === name) {
              lot.states = states
            }
            return lot
          })
          return newLotArray
        }
      })
    })
  }, [])
 return (
   <Container fluid>
     {
       lots.map((lot, index) => (
        <Container key={index} className="bg-dark">
          <p className="text-white">{lot.name}</p>
          <Container>
            {
              lot.states.map((state, i) => (
                <span key={i} className={state === true ? "text-success" : "text-danger"}><FontAwesomeIcon icon={state === true ? "check-circle" : "times-circle"} /></span>
              ))
            }
          </Container>
        </Container>
       ))
     }
   </Container>
 );
}