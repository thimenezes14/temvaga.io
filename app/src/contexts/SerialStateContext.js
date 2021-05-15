import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, createContext, useEffect} from 'react'
import styled from 'styled-components'
import {dispatchEvent, receiveEvent} from '../services/electronApi'

const DivOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  opacity: 0;
  background: rgba(39, 42, 43, 0.8);
  transition: opacity 200ms ease-in-out;
  border-radius: 4px;
  margin: -15px 0 0 -15px;
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 1;
  }
`

export const SerialStateContext = createContext()

const SerialStateProvider = ({children}) => {
  const [serialState, setSerialState] = useState(false)
  const [actionMsg, setActionMsg] = useState("")

  useEffect(() => {
    receiveEvent("port-opened", portNumber => {
      console.log("Porta foi aberta em " + portNumber)
      setSerialState(true)
    })
    receiveEvent("port-closed", portNumber => {
      console.log("Porta " + portNumber + " foi fechada. Você pode ter feito isso ou o dispositivo foi desconectado da comunicação serial. ")
      setSerialState(false)
    })
  }, [])

  const startSerialCommunication = () => {
    dispatchEvent("serial-start")
    .then(async onStart => {
      const {result, message} = onStart
      if(result === true) {
        const resultGet = await dispatchEvent("all")
        if(resultGet === true) {
          console.log("Obtenção de dados enviada com sucesso.")
        }
      }
      setActionMsg(message)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const stopSerialCommunication = () => {
    dispatchEvent("serial-stop")
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <SerialStateContext.Provider value={{serialState, actionMsg, startSerialCommunication, stopSerialCommunication}}>
      {
        serialState === false &&
        <DivOverlay>
          <h2 className="text-white"><span><FontAwesomeIcon icon="microchip" /> Comunicação serial não iniciada ou indisponível. </span></h2>
        </DivOverlay>
      }
      {children}
    </SerialStateContext.Provider>
  )

}

export default SerialStateProvider