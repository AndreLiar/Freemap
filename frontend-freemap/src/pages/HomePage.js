import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import NavBar from '../components/NavBar';
import { Link, useNavigate } from "react-router-dom";
import logo from './img/logo.png';
import logo2 from './img/logo2.png';
import logo3 from './img/logo3.png';
import './css/HomePage.css';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const { currentUser, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar currentUser={currentUser} onSignOut={handleSignOut} />

      {/* Hero Section */}
      <div >
          <SearchBar setResults={setResults} />
      </div>

      {/* Main Content Section */}
      <Container className="my-5">
        <Row>
          {/* Section 1: Stage de révision */}
          <Col md={12} className="stage-revision-container">
            <img src={logo2} alt="Stage de révision" className="img-fluid stage-revision-image" />
            <div className="stage-revision-text">
              <h2>Stage de révision</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sem, aliquet at commodo sed, varius sed sapien. Nullam scelerisque, augue non scelerisque faucibus, eros justo euismod neque, at sollicitudin orci metus nec ante. Curabitur mattis diam eros, ut sodales leo euismod quis. Nam eu scelerisque turpis.</p>
              <Button variant="outline-primary" className='btn-outline-primary-test'>En savoir plus</Button>
            </div>
          </Col>


          {/* Section 2: Préparation concours */}
          <Col md={12} className="d-flex align-items-center mt-5 p-4 rounded text-white" style={{ backgroundColor: '#238FB7' }}>
            <div>
              <h2>Préparation concours</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sem, aliquet at commodo sed, varius sed sapien. Nullam scelerisque, augue non scelerisque faucibus, eros justo euismod neque, at sollicitudin orci metus nec ante. Curabitur mattis diam eros, ut sodales leo euismod quis. Nam eu scelerisque turpis.</p>
              <Button variant="" className='bg-white btn border text-primary '>En savoir plus</Button>
            </div>
            <img src={logo2} alt="Stage de révision" className="img-fluid stage-revision-image" />

          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <div className="bg-white text-blue py-5">
        <Container>
          <h2 className="text-center mb-4">Questions fréquentes</h2>
          <Accordion className='bg-primanry-btn' defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={3}>
              <img src={logo} alt="FREEMAP logo" className="img-fluid mb-3 w-75" />
              <p className="mt-4">Le contact qu'il vous faut</p>
              <div>
                <a href="#" className="social-icon instagram text-white me-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                <a href="#" className="social-icon facebook text-white me-2"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                <a href="#" className="social-icon linkedin text-white me-2"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
              </div>
            </Col>
            <Col md={3}>
              <h5>Liens utiles</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Trouver mon cours</a></li>
                <li><a href="#" className="text-white">Espace apprenant</a></li>
                <li><a href="#" className="text-white">Espace enseignant</a></li>
                <li><a href="#" className="text-white">Devenir enseignant</a></li>
                <li><a href="#" className="text-white">Contactez-nous</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Nous connaître</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">À propos</a></li>
                <li><a href="#" className="text-white">Mentions légales</a></li>
                <li><a href="#" className="text-white">Politique des cookies</a></li>
                <li><a href="#" className="text-white">FAQ</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Adresse 64 Allée des Champs Elysées, 91080 Évry-Courcouronnes</li>
                <li><FontAwesomeIcon icon={faEnvelope} className="me-2" /> contact@augustinruinardacademie.com</li>
                <li><FontAwesomeIcon icon={faPhone} className="me-2" /> 01 85 78 76 67</li>
              </ul>
            </Col>
          </Row>
          <p className="text-center mt-3">© Freemap. Tous les droits sont réservés</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;