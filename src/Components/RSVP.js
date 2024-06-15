import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import rsvpPic from '../assets/Arangetram_Invite_RSVP.png';
import Image from 'react-bootstrap/Image';
import { Card, Button, Stack, Container, Col, Row, Modal, Fade, Table, Toast, Badge, Alert } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import RSVP_Form from './RSVP_Form';
import firebase_auth from '../assets/firebase-auth';
import { collection, addDoc, getDocs  } from "firebase/firestore";
import { CookiesProvider, useCookies } from 'react-cookie';
import { FcEditImage, FcRemoveImage, FcCamcorderPro, FcCheckmark, FcMinus } from "react-icons/fc";
import Cookies from 'js-cookie';
import {getAttendeesByNameAndMobile, postAttendee, setAttendee, db } from './db_repository';
import { FiMaximize2, FiMaximize } from "react-icons/fi";

const ATTENDANCE_OPTIONS = [
    "Not Attending",
    "In Person",
    "Livestream"
];

const ATTENDEE_TEMPLATE = {
    name: '',
    email: '',
    attending: 0,
    mobile: null,
    adults: null,
    kids: null,
    comments: '',
    remember: false
};

function RSVP_Modal({dbRef, attendeeInfo, setAttendeeInfo, setSubmit, ...props}) {
    const [showConflictToast, setConflictToast] = useState(false);
    const toggleConflictToast = () => setConflictToast(!showConflictToast);

    const submit = async () => {
        try {
            if(attendeeInfo.name === null || attendeeInfo.mobile === null){
                alert("Please fill in all the required fields!");
                return;
            }
            postAttendee(attendeeInfo).then(response => {
                console.log("Recieved:", response);
                if(response == 200){
                    console.log("Attendee added successfully");
                    setSubmit(true);
                    if(attendeeInfo.remember){
                        Cookies.set('name', attendeeInfo.name, { expires: 7, path: '', secure: true });
                        Cookies.set('mobile', attendeeInfo.mobile, { expires: 7, path: '', secure: true });
                    } else {
                        Cookies.remove('name', { path: '', secure: true });
                        Cookies.remove('mobile', { path: '', secure: true });
                    }
                    props.onHide();
                }
                else if(response == 409) {
                    setConflictToast(true);
                    console.log("Conflict adding attendee");
                }
                else if(response == 400) {
                    console.error("Error adding attendee");
                }
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const updateUserInfo = () => {
        setAttendee(attendeeInfo).then(response => {
            if(response == 200){
                console.log("Attendee updated successfully");
                toggleConflictToast();
                setSubmit(true);
                if(attendeeInfo.remember){
                    Cookies.set('name', attendeeInfo.name, { expires: 7, path: '', secure: true });
                    Cookies.set('mobile', attendeeInfo.mobile, { expires: 7, path: '', secure: true });
                } else {
                    Cookies.remove('name', { path: '', secure: true });
                    Cookies.remove('mobile', { path: '', secure: true });
                }
                props.onHide();
            }
            else if(response == 409) {
                console.error("Conflict updating attendee");
                setConflictToast(true);
            }
            else if(response == 400) {
                console.error("Error updating attendee");
            }
        });
    }
    return (
        
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rsvp_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign Up for Shreeya's Bharatanatyam Arangetram
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RSVP_Form info={attendeeInfo} updateInfo={setAttendeeInfo}/>
        </Modal.Body>
        <Modal.Footer>
            {showConflictToast ? <Alert variant="success">
                Looks like you are already registered with us, we see the following fields are different: 
                Would you like to update your information? &nbsp; <Button variant="outline-primary" onClick={updateUserInfo}>Yes</Button> &nbsp; <Button variant="outline-danger" onClick={toggleConflictToast}>No</Button>
            </Alert> : <></>}
            <Button variant="outline-success" onClick={submit}>{"Submit"}</Button>
            <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

function RSVP({ dbRef }) {
    const firstRender = useRef(true);
    const [open, setOpen] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [attendeeInfo, setAttendeeInfo] = useState(ATTENDEE_TEMPLATE);
    const [attending, setAttending] = useState(0);
    const [mapOpen, setMapOpen] = useState(false);

    useEffect(() => {
        if (firstRender.current) {
            const name = Cookies.get('name');
            const mobile = Cookies.get('mobile');
            console.log("name: ", name, " mobile: ", mobile);
            if(name != undefined && mobile != undefined){
                getAttendeesByNameAndMobile(name, mobile)
                    .then(snapshot => {
                        console.log("snapshot: ", snapshot);
                        const mergedAttendee = { ...ATTENDEE_TEMPLATE, ...snapshot };
                        console.log("Merged Attendee: ", mergedAttendee);
                        setAttendeeInfo(mergedAttendee);
                    })
                    .catch(error => {
                        console.error("Error fetching attendees: ", error);
                    });
                setSubmit(true);
            } else {
                console.log("No user cookies found");
                setSubmit(false);
            }
            firstRender.current = false;
            return;
        }
        // getAttendeesByNameAndMobile("Shreeya Selvam", 8043031984)
        //             .then(snapshot => {
        //                 console.log("snapshot: ", snapshot);
        //                 const mergedAttendee = { ...ATTENDEE_TEMPLATE, ...snapshot };
        //                 console.log("Merged Attendee: ", mergedAttendee);
        //                 setAttendeeInfo(mergedAttendee);
        //                 console.log("Attendee Info: ", attendeeInfo);
        //             })
        //             .catch(error => {
        //                 console.error("Error fetching attendees: ", error);
        //             });
    });

    //const [cookies, setCookie, removeCookie] = useCookies(['name', 'email', 'attending', 'mobile', 'adults', 'kids', 'comments', 'remember'])
    // useEffect(() => {
    //     if(cookies){
    //         attendeeTempl.name = cookies.name;
    //         attendeeTempl.email = cookies.email;
    //         attendeeTempl.attending = cookies.attending;
    //         attendeeTempl.mobile = cookies.mobile;
    //         attendeeTempl.adults = cookies.adults;
    //         attendeeTempl.kids = cookies.kids;
    //         attendeeTempl.comments = cookies.comments;
    //         attendeeTempl.remember = cookies.remember;
    //         setSubmit(true);
    //     }
    // }, [cookies]);
    console.log("attendeeInfo: ", attendeeInfo);
    useEffect(() => {
        setAttendeeInfo((prev) => ({
          ...prev,
          attending: attending,
        }));
        // ATTENDEE_TEMPLATE.attending = attending;
    }, [attending]);

    // const setCookieFields = (name, email, attending, mobile, adults, kids, comments, remember) => {
    //     setCookie('name', name, { path: '/' });
    //     setCookie('email', email, { path: '/' });
    //     setCookie('attending', attending, { path: '/' });
    //     setCookie('mobile', mobile, { path: '/' });
    //     setCookie('adults', adults, { path: '/' });
    //     setCookie('kids', kids, { path: '/' });
    //     setCookie('comments', comments, { path: '/' });
    //     setCookie('remember', remember, { path: '/' });
    // }
    // const deleteCookie = (name, email, attending, mobile, adults, kids, comments, remember) => {
    //     removeCookie(name, '', { path: '/' });
    //     removeCookie(email, '', { path: '/' });
    //     removeCookie(attending, '', { path: '/' });
    //     removeCookie(mobile, '', { path: '/' });
    //     removeCookie(adults, '', { path: '/' });
    //     removeCookie(kids, '', { path: '/' });
    //     removeCookie(comments, '', { path: '/' });
    //     removeCookie(remember, '', { path: '/' });
    // }
    const reset = () => {
        //deleteCookie(attendeeInfo.name, attendeeInfo.email, attendeeInfo.attending, attendeeInfo.mobile, attendeeInfo.adults, attendeeInfo.kids, attendeeInfo.comments, attendeeInfo.remember);
        // ATTENDEE_TEMPLATE.name = ATTENDEE_TEMPLATE.email = ATTENDEE_TEMPLATE.mobile = ATTENDEE_TEMPLATE.adults = ATTENDEE_TEMPLATE.kids = ATTENDEE_TEMPLATE.comments = null;
        // ATTENDEE_TEMPLATE.remember = false;
        setAttendeeInfo(ATTENDEE_TEMPLATE);
        setSubmit(false);
    }
    return (
    <>
        <Container fluid className="d-flex flex-column vh-100">
            <Row className="flex-grow-1">
                <Col sm={12} md={7} className="mb-3 mb-md-0" >
                    <Card>
                        <img src={rsvpPic} alt="RSVP" className='img-fluid rsvp-image'/>
                        {/* <Card.Img variant="top" src={{rsvpPic}} /> */}
                        <RSVP_Modal
                            dbRef={dbRef}
                            attendeeInfo={attendeeInfo}
                            setAttendeeInfo={setAttendeeInfo}
                            setSubmit={setSubmit}
                            show={open}
                            onHide={() => setOpen(false)}
                        />
                    </Card>
                </Col>
                <Col sm={12} md={5}>
                    <Card className='custom-card'>
                    <Card.Body>
                            {!submitted ? (
                                <>
                                    <Card.Title>You Are Invited!</Card.Title>
                                    <Card.Text>
                                        Would you like to attend Shreeya's Bharatanatyam Arangetram 🎉
                                    </Card.Text>
                                    <Stack direction="horizontal" gap={3} className="justify-content-center">
                                        <Button variant="success" onClick={() => {setAttending(1); setOpen(true);}}>Yes &nbsp; 
                                            <Badge pill bg="light" text="dark">
                                                <FcCheckmark />
                                            </Badge>
                                        </Button>{' '}
                                        <Button variant="warning" onClick={() => {setAttending(0); setOpen(true);}}>No &nbsp;
                                            <Badge pill bg="light" text="dark">
                                                    <FcMinus />
                                            </Badge>
                                        </Button>{' '}
                                        <Button variant="primary" onClick={() => {setAttending(2); setOpen(true);}}>Livestream &nbsp;
                                            <Badge pill bg="light" text="dark">
                                                    <FcCamcorderPro />
                                            </Badge>
                                        </Button>{' '}
                                    </Stack>
                                </>) : <></>}
                            {submitted ? <Fade in={submitted}>
                                <div id="example-fade-text" className="justify-content-center">
                                    <h4>Thank you for your response! We look forward to seeing you at the event.</h4>
                                    <br></br>
                                    <h6>Registration Info:</h6>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Cell Number</th>
                                                <th>Adults</th>
                                                <th>Kids</th>
                                                {/* <th>Attendance</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{attendeeInfo.name}</td>
                                                <td>{attendeeInfo.mobile}</td>
                                                <td>{attendeeInfo.adults}</td>
                                                <td>{attendeeInfo.kids}</td>
                                                {/* <td>{ATTENDANCE_OPTIONS[attendeeInfo.attending]}</td> */}
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button type="submit" onClick={() => setOpen(true)}>Edit <FcEditImage /></Button> &nbsp;
                                    <Button variant="warning" type="submit" onClick={reset}>Not You? <FcRemoveImage /></Button>
                                    {/* <Container>
                                        <Row>
                                            <Col><b>Name: </b>{attendeeInfo.name}</Col>
                                            <Col><b>Cell Number: </b>{attendeeInfo.mobile}</Col>
                                        </Row>
                                        <Row>
                                            <Col><b>Email: </b>{attendeeInfo.email}</Col>
                                            {attendeeInfo.attending== 1 ? <><Col><b>Adults Attending: </b>{attendeeInfo.adults}</Col>
                                            <Col><b>Kids Attending: </b>{attendeeInfo.kids}</Col></> : <></>}
                                            {attendeeInfo.attending == 0 ? <Col><b>You cannot attend but we would still like to send you and update of the proceedings</b></Col> : <Col><b>How you are attending: </b>{attendanceOptions[attendeeInfo.attending]}</Col>}
                                        </Row>
                                        <Row>
                                            <Col><b>Comments: </b>{attendeeInfo.comments}</Col>
                                        </Row>
                                    </Container> */}
                                </div>
                            </Fade> : <></>}
                            <br></br>
                        </Card.Body>
                        <hr></hr>
                        <Card.Body className='position-relative'>
                            <Stack gap={3}>
                                <>
                                    <Card.Title>Event Details</Card.Title>
                                    <div class="event-container">
                                        <div class="event">
                                            <div class="event-left">
                                                <div class="event-date">
                                                    <div class="date">21</div>
                                                    <div class="month">July</div>
                                                </div>
                                            </div>

                                            <div class="event-right">
                                            <h3 class="event-title">Shreeya's Arangetram</h3>

                                            <div class="event-description">
                                                <Card.Text className='event-card'>
                                                    <h5>Rasika Ranjani Sabha</h5>
                                                    <h7>3838 Mumford Rd, Halifax, NS B3L 4N9</h7>
                                                    <br></br>
                                                    <Badge pill bg="light" text="dark">
                                                    SUNDAY, July 21
                                                    </Badge> &nbsp;
                                                    <Badge pill bg="light" text="dark">
                                                    Seating @ 5:30 PM
                                                    </Badge> &nbsp;
                                                    <Badge pill bg="light" text="dark">
                                                    Dinner @ 8:00 PM
                                                    </Badge>
                                                </Card.Text>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Alert variant="warning" style={{marginLeft: '51px', marginRight: '51px'}}>
                                        Tea and snacks will be served at 4:45 PM. <b>Doors will close sharply at 6:00 PM.</b>
                                    </Alert>
                                </>
                                <div className='mapouter d-flex justify-content-center'>
                                    <div className='gmap_canvas position-relative' onClick={() => setMapOpen(true)}>
                                        <Badge pill bg="info" text="dark" className="position-absolute" style={{top: '8px', right: '8px'}} onClick={() => setMapOpen(true)}>
                                            Maximize <FiMaximize />
                                        </Badge>
                                        <iframe width='100px' height='100px' id='gmap_canvas' src='https://maps.google.com/maps?q=rasika%20ranjani%20sabha&t=&z=13&ie=UTF8&iwloc=&output=embed' frameBorder='0' scrolling='no' marginHeight='0' marginWidth='0'></iframe>
                                    </div>
                                </div>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={mapOpen} onHide={() => setMapOpen(false)} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Rasika Ranjani Sabbha Location Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='gmap_canvas_modal'>
                    <iframe
                    src='https://maps.google.com/maps?q=rasika%20ranjani%20sabha&t=&z=13&ie=UTF8&iwloc=&output=embed'
                    className='gmap_iframe'
                    frameBorder='0' 
                    scrolling='no' 
                    ></iframe>
                </div>
                </Modal.Body>
            </Modal>

        </Container>
    </>
  );
}

export default RSVP;
