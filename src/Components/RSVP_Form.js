import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import rsvpPic from '../assets/Arangetram_Invite_RSVP.png';
import Image from 'react-bootstrap/Image';
import { Card, Button, Stack, Container, Col, Row, Form } from 'react-bootstrap';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

const attendanceOptions = [
    "Not Attending",
    "In Person",
    "Livestream"
];

function RSVP_Form({ info, updateInfo }) {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label><b>Name</b></Form.Label>
                <Form.Control type="name" placeholder="Enter full name" value={info.name || ''} onChange={e => 
                    updateInfo({...info, name: e.target.value})} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control type="email" placeholder="Email" value={info.email || ''} onChange={e => 
                    updateInfo({...info, email: e.target.value})} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label><b>Cell Number</b></Form.Label>
                <Form.Control placeholder="9190346789 - you guys got some wierd numbers" value={info.mobile || ''} onChange={e => 
                    updateInfo({...info, mobile: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1" onChange={e => updateInfo({...info, attending: parseInt(e.target.value)})}>
                <Form.Label><b>How are you attending?</b></Form.Label>
                <Form.Select aria-label="Default select example">
                    {info.attending == 0 ? <><option value="1">In Person</option>
                    <option value="2">Livestream</option>
                    <option value="0" selected>Sorry, can't attend</option></> : (info.attending == 1 ? <><option value="1" selected>In Person</option>
                    <option value="2">Livestream</option>
                    <option value="0">Sorry, can't attend</option></> : <><option value="1">In Person</option>
                    <option value="2" selected>Livestream</option>
                    <option value="0">Sorry, can't attend</option></>)}
                </Form.Select>
            </Form.Group>

            {info.attending == 1 ? (<Row className="mb-3">
                <Form.Label><b>Who's Attending?</b></Form.Label>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Adults</Form.Label>
                    <Form.Control type="number" placeholder="Adults Attending" value={info.adults || ''} onChange={e => 
                    updateInfo({...info, adults: parseInt(e.target.value)})}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Kids</Form.Label>
                    <Form.Control type="number" placeholder="Kids Attending" value={info.kids !== undefined ? info.kids : ''} onChange={e => 
                    updateInfo({...info, kids: parseInt(e.target.value)})}/>
                </Form.Group>
            </Row>) : <></>}

            <Form.Label><b>Any Comments?</b> </Form.Label>
            <Form.Control as="textarea" rows={3} value={info.comments || ''} onChange={e => 
                    updateInfo({...info, comments: e.target.value})}/>
            <br></br>
            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember Me" checked={info.remember || false} onChange={e => updateInfo({...info, remember: e.target.checked})}/>
            </Form.Group>
            </Form>
    );
}
export default RSVP_Form;