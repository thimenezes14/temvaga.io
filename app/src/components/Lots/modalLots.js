import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';

export default function Lots(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.lotInfo?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4><strong>Mapa de vagas</strong></h4>
        <Row className="d-flex align-items-center justify-content-center">
          {
            props.lotInfo?.states?.map((state, i) => (
              <Col sm={6} md={6} lg={3} xl={3} key={i}>
                <Card style={{ padding: '3px', margin: '5px' }}>
                  <Card.Body>
                    <Card.Title><span key={i} className={state === true ? "text-success" : "text-danger"}><FontAwesomeIcon className="fa-3x" icon={state === true ? "check-circle" : "times-circle"} /></span></Card.Title>
                    <Card.Text>
                      <h4><strong>{i + 1}</strong></h4>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}