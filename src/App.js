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

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      {/* <nav class="navbar navbar-expand-sm navbar-custom fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={logo} alt="Avatar Logo" class="rounded-pill logo"/> 
          </a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="fa-solid fa-house"></i></a>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <a class="nav-link" data-bs-toggle="dropdown" href="#">Arangatram</a>
                <ul class="dropdown-menu" style={{marginTop: '25px'}}>
                  <li><a class="dropdown-item" href="#">Invitation</a></li>
                  <li><a class="dropdown-item" href="#">Brochure</a></li>
                  <li><a class="dropdown-item" href="#">Livestream</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="#">Guru & Sishya</a></li>
                  <li><a class="dropdown-item" href="#">Orchestra</a></li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Performances</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mission</a>
            </li>
          </ul>
        </div>
      </nav> */}
      <>

        <Navbar key={'sm'} expand={'sm'} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
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
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${'sm'}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
      <Slideshow />
    </div>
  );
}

export default App;
