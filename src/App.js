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
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';

// function AppBody({ pageRoute }) {
//   // Initialize Firebase
//   const [page, setPage] = useState(pageRoute);
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   return (
//     <Container fluid className="App" data-bs-theme="dark">
//         <Navbar key={'sm'} expand={'sm'} className="navbar mb-3 navbar-custom" fixed="top" style={{height: "10vh"}}>
//           <Container fluid>
//             <Navbar.Brand href="#"><img
//               src={logo}
//               width="70"
//               height="70"
//               className="d-inline-block align-top"
//               alt="Brand logo"
//             /></Navbar.Brand>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} onClick={() => setShowOffcanvas(true)}/>
//             <Navbar.Offcanvas
//               show={showOffcanvas}
//               onHide={() => setShowOffcanvas(false)}
//               id={`offcanvasNavbar-expand-${'sm'}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
//               placement="end"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>
//                   <Image src={logo} width="70vw" height="70vh" className="d-inline-block align-top" alt="Brand logo" />
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-end flex-grow-2 ms-auto">
//                   <Nav.Link href="?page=home" onClick={() => setPage('home')}><FcHome /></Nav.Link>
//                   <NavDropdown className='nav-link'
//                     title="Arangetram"
//                     id={`offcanvasNavbarDropdown-expand-${'sm'}`}
//                   >
//                     <div style={{top:'10px'}}>
//                       <NavDropdown.Item href="?page=rsvp" onClick={() => {setPage('rsvp'); setShowOffcanvas(false);}}>
//                         Invitation
//                       </NavDropdown.Item>
//                       <NavDropdown.Item href="?page=brochure">Brochure</NavDropdown.Item>
//                       <NavDropdown.Item href="?page=stream">Livestream</NavDropdown.Item>
//                       <NavDropdown.Divider />
//                       <NavDropdown.Item href="?page=sishya">Guru & Sishya</NavDropdown.Item>
//                       <NavDropdown.Item href="?page=orchstration">Orchestration</NavDropdown.Item>
//                     </div>
//                   </NavDropdown>
//                   <Nav.Link href="?page=performances" onClick={() => {setPage('perform'); setShowOffcanvas(false);}}>Performances</Nav.Link>
//                   <Nav.Link href="?page=mission" onClick={() => {setPage('mission'); setShowOffcanvas(false);}}>Mission</Nav.Link>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//         {page=='home' ? <Slideshow/> : <></>}
//         {page=='rsvp' ? 
//           <div style={{paddingTop:'100px'}}><RSVP /></div> : <></>}
//     </Container>
//   );
// }
// function LocationDisplay() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log("Search params: ", searchParams.toString());
//   const params = searchParams.toString().split("=");
//   console.log("Params: ", params);
//   const location = useLocation();
//   console.log("Current location: ", location.pathname); // This will log the current path
//   if (params[1] != undefined) {
//     return(<AppBody pageRoute={params[1]} />);
//   } else {
//     return(<AppBody pageRoute={"home"} />);
//   }
//   // if (location.pathname == "/bharatanatyam") {
//   //   return(<AppBody pageRoute={"home"} />);
//   // } else if (location.pathname == "/bharatanatyam/rsvp") {
//   //   return(<AppBody pageRoute={"rsvp"} />);
//   // } else if (location.pathname == "/bharatanatyam/performances") {
//   //   return(<AppBody pageRoute={"perform"} />);
//   // } else if (location.pathname == "/bharatanatyam/mission") {
//   //   return(<AppBody pageRoute={"mission"} />);
//   // } else if (location.pathname == "/arangetram/guru_sishya") {
//   //   return(<AppBody pageRoute={"sishya"} />);
//   // } else if (location.pathname == "/arangetram/brochure") {
//   //   return(<AppBody pageRoute={"brochure"} />);
//   // } else if (location.pathname == "/arangetram/livestream") {
//   //   return(<AppBody pageRoute={"livestream"} />);
//   // } else if (location.pathname == "/arangetram/orchestration") {
//   //   return(<AppBody pageRoute={"orchestration"} />);
//   // } else {
//   //   return(<AppBody pageRoute={"home"} />);
//   // }
// }
// function App() {
//   return (<div className="App">
//     <BrowserRouter>
//       <LocationDisplay  /> 
//     </BrowserRouter>
//   </div>);
// }

function LocationDisplay() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("Search params: ", searchParams.toString());
    const params = searchParams.toString().split("=");
    console.log("Params: ", params);
    const location = useLocation();
    console.log("Current location: ", location.pathname); // This will log the current path
    window.location.replace(`https://c3fc8b33.shreeya-bharatanatyam.pages.dev/?${searchParams.toString()}`);
    return(
      <div></div>
    );
    
    // if (params[1] != undefined) {
    //   return(<AppBody pageRoute={params[1]} />);
    // } else {
    //   return(<AppBody pageRoute={"home"} />);
    // }
    // if (location.pathname == "/bharatanatyam") {
    //   return(<AppBody pageRoute={"home"} />);
    // } else if (location.pathname == "/bharatanatyam/rsvp") {
    //   return(<AppBody pageRoute={"rsvp"} />);
    // } else if (location.pathname == "/bharatanatyam/performances") {
    //   return(<AppBody pageRoute={"perform"} />);
    // } else if (location.pathname == "/bharatanatyam/mission") {
    //   return(<AppBody pageRoute={"mission"} />);
    // } else if (location.pathname == "/arangetram/guru_sishya") {
    //   return(<AppBody pageRoute={"sishya"} />);
    // } else if (location.pathname == "/arangetram/brochure") {
    //   return(<AppBody pageRoute={"brochure"} />);
    // } else if (location.pathname == "/arangetram/livestream") {
    //   return(<AppBody pageRoute={"livestream"} />);
    // } else if (location.pathname == "/arangetram/orchestration") {
    //   return(<AppBody pageRoute={"orchestration"} />);
    // } else {
    //   return(<AppBody pageRoute={"home"} />);
    // }
}
function App() {
  return (<div className="App">
    <BrowserRouter>
      <LocationDisplay  /> 
    </BrowserRouter>
  </div>);
}
export default App;
