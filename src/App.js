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

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      <>
        <Navbar key={'sm'} expand={'sm'} className="navbar mb-3 navbar-custom" fixed="top">
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
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 ms-auto">
                  <NavDropdown className='nav-link'
                    title="Arangetram"
                    id={`offcanvasNavbarDropdown-expand-${'sm'}`}
                  >
                    <NavDropdown.Item href="#action3">Invitation</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Brochure</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Livestream</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Guru & Sishya</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Orchestration</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action1">Performances</Nav.Link>
                  <Nav.Link href="#action2">Mission</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
      <Slideshow />
      {/* <RSVP /> */}
    </div>
  );
}

export default App;
