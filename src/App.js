// import logo from './logo.svg';
import './App.css';
import logo from './assets/logofile.png';
import Slideshow from './Components/Slideshow';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image } from 'react-bootstrap';
import RSVP from './Components/RSVP';
import { useState } from 'react';
import { FcHome } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './assets/firebase-auth';
import { DiBingSmall } from 'react-icons/di';

function App() {
  // Initialize Firebase
  const [page, setPage] = useState('home');
  return (
    <Container fluid className="App" data-bs-theme="dark">
        <Navbar key={'sm'} expand={'sm'} className="navbar mb-3 navbar-custom" fixed="top" style={{height: "10vh"}}>
          <Container fluid>
            <Navbar.Brand href="#"><img
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Brand logo"
            /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'sm'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>
                  Offcanvas Navigation
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-2 ms-auto">
                  <Nav.Link href="" onClick={() => setPage('home')}><FcHome /></Nav.Link>
                  <NavDropdown className='nav-link'
                    title="Arangetram"
                    id={`offcanvasNavbarDropdown-expand-${'sm'}`}
                  >
                    <NavDropdown.Item href="#action3" onClick={() => setPage('rsvp')}>Invitation</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Brochure</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Livestream</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Guru & Sishya</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Orchestration</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action1" onClick={() => setPage('perform')}>Performances</Nav.Link>
                  <Nav.Link href="#action2" onClick={() => setPage('mission')}>Mission</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        {page=='home' ? <Slideshow/> : <></>}
        {page=='rsvp' ? 
          <div style={{paddingTop:'100px'}}><RSVP /></div> : <></>}
    </Container>
  );
}
export default App;
