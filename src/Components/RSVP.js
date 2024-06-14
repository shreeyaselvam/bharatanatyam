import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import rsvpPic from '../assets/Arangetram_Invite_RSVP.png';
import Image from 'react-bootstrap/Image';
import { Card, Button, Stack, Container, Col, Row, Modal } from 'react-bootstrap';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import RSVP_Form from './RSVP_Form';

function RSVP_Modal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign Up for Shreeya's Bharatanatyam Arangetram
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RSVP_Form />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
          <Button variant="outline-success" onClick={props.onHide}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }


function RSVP() {
    const [open, setOpen] = useState(false);
    return (
    <>
        <Container>
            <Row>
                <Col sm={8}>
                    <Card style={{ width: '55rem' }}>
                        <img src={rsvpPic} alt="RSVP" height={'500px'}/>
                        {/* <Card.Img variant="top" src={{rsvpPic}} /> */}
                        <Card.Body>
                            <Card.Title>You Are Invited!</Card.Title>
                            <Card.Text>
                                Let us know if you would like to attend Shreeya's Bharatanatyam Arangetram 🎉
                            </Card.Text>
                            <Stack direction="horizontal" gap={3} className="justify-content-center">
                                <Button variant="success" onClick={() => setOpen(true)}>Yes ✔️</Button>{' '}
                                <Button variant="primary" onClick={() => setOpen(true)}>Let's Livestream 🎥</Button>{' '}
                                <Button variant="warning" onClick={() => setOpen(true)}>No ❌</Button>{' '}
                            </Stack>
                        </Card.Body>
                        <RSVP_Modal
                            show={open}
                            onHide={() => setOpen(false)}
                        />
                    </Card>
                </Col>
                <Col sm={4}>
                    <div className='mapouter'>
                        <div className='gmap_canvas'>
                            <iframe width='400' height='500' id='gmap_canvas' src='https://maps.google.com/maps?q=rasika%20ranjani%20sabha&t=&z=13&ie=UTF8&iwloc=&output=embed' frameBorder='0' scrolling='no' marginHeight='0' marginWidth='0'></iframe>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        {/* <Stack direction="horizontal" gap={2}>
        <div className="p-2">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={{rsvpPic}} />
                <Card.Body>
                    <Card.Title>You Are Invited!</Card.Title>
                    <Card.Text>
                        Would you like to attend Shreeya's Bharatanatyam Arangetram?
                    </Card.Text>
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="outline-success">Yes ✔️</Button>{' '}
                        <Button variant="outline-primary">Let's Livestream 🎥</Button>{' '}
                        <Button variant="outline-primary">No ❌</Button>{' '}
                    </Stack>
                </Card.Body>
            </Card>
        </div>
        <div className="p-2 ms-auto">
            <div className='mapouter'>
                <div className='gmap_canvas'>
                    <iframe width='400' height='500' id='gmap_canvas' src='https://maps.google.com/maps?q=rasika%20ranjani%20sabha&t=&z=13&ie=UTF8&iwloc=&output=embed' frameBorder='0' scrolling='no' marginHeight='0' marginWidth='0'></iframe>
                </div>
            </div>
        </div>
        </Stack> */}
    </>
  );
}

export default RSVP;
