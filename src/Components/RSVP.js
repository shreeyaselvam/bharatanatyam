import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import rsvpPic from '../assets/Arangetram_Invite_RSVP.png';
import Image from 'react-bootstrap/Image';
import { Card, Button, Stack, Container, Col, Row, Modal, Fade, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import RSVP_Form from './RSVP_Form';
import firebase_auth from '../assets/firebase-auth';
import { collection, addDoc, getDocs  } from "firebase/firestore";
import { CookiesProvider, useCookies } from 'react-cookie';
import { FcEditImage, FcRemoveImage } from "react-icons/fc";


const attendanceOptions = [
    "Not Attending",
    "In Person",
    "Livestream"
]

function RSVP_Modal({dbRef, attendStatus, attendeeInfo, setAttendeeInfo, cookies, addCookie, deleteCookie, setSubmit, ...props}) {
    // console.log("dbRefq: ", dbRef);
    // let attendeeTempl = {
    //     name: '',
    //     email: '',
    //     attending: attendStatus,
    //     mobile: 0,
    //     adults: 0,
    //     kids: 0,
    //     comments: '',
    //     remember: false
    // }
    let attendeeTempl = attendStatus;
    // console.log("attendeeInfo: ", attendeeInfo)

    // const fetchPost = async () => {
       
    //     await getDocs(collection(dbRef, "attendees"))
    //         .then((querySnapshot)=>{               
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({...doc.data(), id:doc.id }));            
    //             console.log(newData);
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         });
    // }
    // useEffect(()=>{
    //     fetchPost();
    // }, [])

    const addRecord = async () => {
        try {
            if(attendeeInfo.name === null || attendeeInfo.mobile === null){
                alert("Please fill in all the required fields!");
                return;
            }
            // console.log("type of attendeeInfo: ", attendeeInfo.name);
            const docRef = await addDoc(collection(dbRef, "attendees"), {
                adult: attendeeInfo.adults,
                attending: attendeeInfo.attending,
                comments: attendeeInfo.comments,
                email: attendeeInfo.email,
                kids: attendeeInfo.kids,
                mobile: attendeeInfo.mobile,
                name: attendeeInfo.name
            });
            setSubmit(true);
            console.log("Document written with ID: ", docRef.id);
            if(attendeeInfo.remember) addCookie(attendeeInfo.name, attendeeInfo.email, attendeeInfo.attending, attendeeInfo.mobile, attendeeInfo.adults, attendeeInfo.kids, attendeeInfo.comments, attendeeInfo.remember);
            else deleteCookie(attendeeInfo.name, attendeeInfo.email, attendeeInfo.attending, attendeeInfo.mobile, attendeeInfo.adults, attendeeInfo.kids, attendeeInfo.comments, attendeeInfo.remember);
            // setAttendeeInfo(attendeeTempl);
            props.onHide();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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
            <Button variant="outline-success" onClick={addRecord}>Submit</Button>
            <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


function RSVP({ dbRef }) {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [attending, setAttending] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(['name', 'email', 'attending', 'mobile', 'adults', 'kids', 'comments', 'remember'])
    let attendeeTempl = {
        name: cookies.name || null,
        email: cookies.email || null,
        attending: attending,
        mobile: cookies.mobile || null,
        adults: cookies.adults || null,
        kids: cookies.kids || null,
        comments: cookies.comments || null,
        remember: cookies.remember || false
    }
    const [attendeeInfo, setAttendeeInfo] = useState(attendeeTempl);
    useEffect(() => {
        if(cookies){
            attendeeTempl.name = cookies.name;
            attendeeTempl.email = cookies.email;
            attendeeTempl.attending = cookies.attending;
            attendeeTempl.mobile = cookies.mobile;
            attendeeTempl.adults = cookies.adults;
            attendeeTempl.kids = cookies.kids;
            attendeeTempl.comments = cookies.comments;
            attendeeTempl.remember = cookies.remember;
            setSubmit(true);
        }
    }, [cookies]);
    console.log("attendeeInfo: ", attendeeInfo);
    useEffect(() => {
        setAttendeeInfo((prev) => ({
          ...prev,
          attending: attending,
        }));
        attendeeTempl.attending = attending;
    }, [attending]);

    const setCookieFields = (name, email, attending, mobile, adults, kids, comments, remember) => {
        setCookie('name', name, { path: '/' });
        setCookie('email', email, { path: '/' });
        setCookie('attending', attending, { path: '/' });
        setCookie('mobile', mobile, { path: '/' });
        setCookie('adults', adults, { path: '/' });
        setCookie('kids', kids, { path: '/' });
        setCookie('comments', comments, { path: '/' });
        setCookie('remember', remember, { path: '/' });
    }
    const deleteCookie = (name, email, attending, mobile, adults, kids, comments, remember) => {
        removeCookie(name, '', { path: '/' });
        removeCookie(email, '', { path: '/' });
        removeCookie(attending, '', { path: '/' });
        removeCookie(mobile, '', { path: '/' });
        removeCookie(adults, '', { path: '/' });
        removeCookie(kids, '', { path: '/' });
        removeCookie(comments, '', { path: '/' });
        removeCookie(remember, '', { path: '/' });
    }
    const reset = () => {
        deleteCookie(attendeeInfo.name, attendeeInfo.email, attendeeInfo.attending, attendeeInfo.mobile, attendeeInfo.adults, attendeeInfo.kids, attendeeInfo.comments, attendeeInfo.remember);
        attendeeTempl.name = attendeeTempl.email = attendeeTempl.mobile = attendeeTempl.adults = attendeeTempl.kids = attendeeTempl.comments = null;
        attendeeTempl.remember = false;
        setAttendeeInfo(attendeeTempl);
        setSubmit(false);
    }
    return (
    <>
        <Container>
            <Row>
                <Col sm={8}>
                    <Card style={{ maxWidth: '55rem' }}>
                        <img src={rsvpPic} alt="RSVP" style={{height: '60vh', width: 'auto', 'maxWidth': '100%'}}/>
                        {/* <Card.Img variant="top" src={{rsvpPic}} /> */}
                        <Card.Body>
                            {!submitted ? (
                                <>
                                    <Card.Title>You Are Invited!</Card.Title>
                                    <Card.Text>
                                        Let us know if you would like to attend Shreeya's Bharatanatyam Arangetram 🎉
                                    </Card.Text>
                                    <Stack direction="horizontal" gap={3} className="justify-content-center">
                                        <Button variant="success" onClick={() => {setAttending(1); setOpen(true);}}>Yes ✔️</Button>{' '}
                                        <Button variant="primary" onClick={() => {setAttending(2); setOpen(true);}}>Let's Livestream 🎥</Button>{' '}
                                        <Button variant="warning" onClick={() => {setAttending(0); setOpen(true);}}>No ❌</Button>{' '}
                                    </Stack>
                                </>) : <></>}
                            <Fade in={submitted}>
                                <div id="example-fade-text" className="justify-content-center">
                                    <h4>Thank you for your response! We look forward to seeing you at the event.</h4>
                                    <br></br>
                                    <h6>Registration Info:</h6>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Cell Number</th>
                                                <th>Email</th>
                                                <th>Number of Adults</th>
                                                <th>Number of Kids</th>
                                                <th>Attendance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{attendeeInfo.name}</td>
                                                <td>{attendeeInfo.mobile}</td>
                                                <td>{attendeeInfo.email}</td>
                                                <td>{attendeeInfo.adults}</td>
                                                <td>{attendeeInfo.kids}</td>
                                                <td>{attendanceOptions[attendeeInfo.attending]}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button type="submit" onClick={() => setOpen(true)}>Edit Registration <FcEditImage /></Button> &nbsp;
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
                            </Fade>
                        </Card.Body>
                        <RSVP_Modal
                            dbRef={dbRef}
                            attendStatus={attendeeTempl}
                            attendeeInfo={attendeeInfo}
                            setAttendeeInfo={setAttendeeInfo}
                            cookies={cookies}
                            addCookie={setCookieFields}
                            deleteCookie={deleteCookie}
                            setSubmit={setSubmit}
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
    </>
  );
}

export default RSVP;
