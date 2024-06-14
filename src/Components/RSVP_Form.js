import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import rsvpPic from '../assets/Arangetram_Invite_RSVP.png';
import Image from 'react-bootstrap/Image';
import { Card, Button, Stack, Container, Col, Row, Form } from 'react-bootstrap';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';


function RSVP_Form() {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter full name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
    );
}
export default RSVP_Form;