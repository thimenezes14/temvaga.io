import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../assets/images/logo.png'
import { SerialStateContext } from '../../contexts/SerialStateContext';
import {dispatchEvent} from '../../services/electronApi'
import ModalConfig from './modalConfig';

export default function Header() {
  const serialInfo = useContext(SerialStateContext)
  const [modalConfigShow, setModalConfigShow] = useState(false)

  const openPort = () => serialInfo.startSerialCommunication()
  const closePort = () => serialInfo.stopSerialCommunication()
  const seeAbout = () => dispatchEvent("about")
  const openConfig = () => setModalConfigShow(true)

  const closeModalConfig = () => {
    setModalConfigShow(false)
  }

  return (
    <>
    {<ModalConfig show={modalConfigShow} onHide={() => closeModalConfig()} />}
    <Navbar expand="sm" variant="light" bg="light" fixed="top">
      <Navbar.Brand><img src={Logo} alt="Logotipo" /></Navbar.Brand>
      <Navbar.Brand><strong>TemVaga.io</strong></Navbar.Brand>
      <Navbar.Toggle /> 
      <Navbar.Collapse className="justify-content-end">
        <Nav >
          <Nav.Link href="#" title="Iniciar comunicação serial" onClick={openPort}><span><FontAwesomeIcon icon="play"/> Iniciar</span></Nav.Link>
          <Nav.Link href="#" title="Parar comunicação serial" onClick={closePort}><span><FontAwesomeIcon icon="stop"/> Parar</span></Nav.Link>
          <Nav.Link href="#" title="Configurações serial" onClick={openConfig}><span><FontAwesomeIcon icon="cog"/> Configurações</span></Nav.Link>
          <Nav.Link href="#" title="Sobre o TemVaga.io" onClick={seeAbout}><span><FontAwesomeIcon icon="info-circle"/> Sobre</span></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}