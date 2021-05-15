import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import FormConfig from './formConfig';

export default function ModalConfig({onHide, show}) {
 return (
  <Modal
  onHide={onHide}
  show={show}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Configurações
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <FormConfig />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={onHide}>Fechar</Button>
  </Modal.Footer>
</Modal>
 );
}