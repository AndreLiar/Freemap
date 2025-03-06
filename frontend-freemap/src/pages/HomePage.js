import React from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, Accordion } from 'react-bootstrap'; // Ajouter Accordion ici
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logo from './logo.png';

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand>FREEMAP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#connexion">Connexion</Nav.Link>
              <Button variant="primary">Inscription</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="bg-light py-5" style={{ backgroundImage: 'url("https://via.placeholder.com/1920x400")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container className="text-center text-white">
          <h1>Découvrez les meilleurs freelances sur notre plateforme</h1>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={4}>
              <Form.Control type="text" placeholder="Cherchez un mot-clé, un poste..." className="rounded-pill" />
            </Col>
            <Col xs={12} md={4}>
              <Form.Control type="text" placeholder="Lieu" className="rounded-pill mt-2 mt-md-0" />
            </Col>
            <Col xs={12} md={2} className="mt-2 mt-md-0">
              <Button variant="primary" className="rounded-pill w-100">Rechercher</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="my-5">
        <Row>
          {/* Section 1: Stage de révision */}
          <Col md={12} className="d-flex align-items-center mb-5">
            <img src="https://via.placeholder.com/400x300" alt="Stage de révision" className="img-fluid rounded me-3" />
            <div>
              <h2>Stage de révision</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sem, aliquet at commodo sed, varius sed sapien. Nullam scelerisque, augue non scelerisque faucibus, eros justo euismod neque, at sollicitudin orci metus nec ante. Curabitur mattis diam eros, ut sodales leo euismod quis. Nam eu scelerisque turpis.</p>
              <Button variant="outline-primary">En savoir plus</Button>
            </div>
          </Col>

          {/* Section 2: Préparation concours */}
          <Col md={12} className="d-flex align-items-center mt-5 p-4 rounded" style={{ backgroundColor: '#238FB7' }}>
            <div>
              <h2>Préparation concours</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sem, aliquet at commodo sed, varius sed sapien. Nullam scelerisque, augue non scelerisque faucibus, eros justo euismod neque, at sollicitudin orci metus nec ante. Curabitur mattis diam eros, ut sodales leo euismod quis. Nam eu scelerisque turpis.</p>
              <Button variant="outline-primary">En savoir plus</Button>
            </div>
            <img src="https://via.placeholder.com/400x300" alt="Préparation concours" className="img-fluid rounded ms-3" />
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <div className="bg-white py-5">
        <Container>
          <h2 className="text-center mb-4">Questions fréquentes</h2>
          <Accordion defaultActiveKey="0">
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
      <footer className="bg-primary text-white py-4">
        <Container>
          <Row>
            <Col md={3}>
              {/* <h4>FREEMAP</h4> */}
              <img src={logo} alt="FREEMAP logo" className="img-fluid mb-3  w-75" />
                                     <p className="mt-4"></p>
              <p>Le contact qu'il vous faut</p>
              <div>
                <a href="#" className="social-icon instagram  text-white me-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                <a href="#" className="social-icon facebook ext-white me-2"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
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
