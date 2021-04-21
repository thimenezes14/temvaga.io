import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react'
import {dispatchEvent, receiveEvent} from './services/electronApi'

const App = () => {
  const [serialInit, setSerialInit] = useState(null)
  const [msg, setMsg] = useState("")
  useEffect(() => {
    dispatchEvent("serial-init")
    .then(msgSuccess => {
      setSerialInit(true)
      setMsg(msgSuccess)
    })
    .catch(msgError => {
      setSerialInit(false)
      setMsg(msgError)
    })
    receiveEvent("data-received", data => {
      console.log(data)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {serialInit !== null && <p>Resultado da inicialização: {serialInit.toString()} </p>}
        {msg !== "" && <p>{msg}</p>}
      </header>
    </div>
  );
}

export default App;
