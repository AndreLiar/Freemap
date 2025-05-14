import React, { useContext, useState, lazy, Suspense } from 'react';
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faLightbulb, faRocket, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import TrackVisibility from 'react-on-screen';
import 'animate.css';

import logo from './img/logo.png';
import logo2 from './img/Location_tracking-bro.png';

// 📦 Lazy load non-crucial components
const FeaturesCards = lazy(() => import('../components/FeaturesCards'));

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
      alert("Échec de la déconnexion.");
    }
  };

  return (
    <div>
      {/* 🔹 Navbar */}
      <NavBar currentUser={currentUser} onSignOut={handleSignOut} />

      {/* 🔍 Hero Search Section */}
      <SearchBar setResults={setResults} />

      {/* 🔸 À propos de FreeMap */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <TrackVisibility once>
              {({ isVisible }) => (
                <img
                  src={require('./img/Location_tracking-amico.png')}
                  alt="Illustration FreeMap"
                  className={`img-fluid ${isVisible ? 'animate__animated animate__fadeInLeft' : ''}`}
                  loading="lazy"
                  style={{ maxHeight: '320px', objectFit: 'contain' }}
                />
              )}
            </TrackVisibility>
          </Col>
          <Col md={7}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeInRight' : ''}>
                  <h3 className="fw-bold mb-3 text-primary">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    FreeMap : Trouvez le freelance idéal près de chez vous
                  </h3>
                  <p>
                    Plateforme innovante de mise en relation entre freelances et clients à travers une carte interactive. Visualisez les profils, avis et tarifs autour de vous.
                  </p>
                  <Button variant="outline-primary">En savoir plus</Button>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* 🔹 Pourquoi FreeMap */}
      <Container className="my-5">
        <Row>
          <Col md={12} className="d-flex align-items-center p-5 rounded text-white" style={{ backgroundColor: '#238FB7' }}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={`w-100 ${isVisible ? 'animate__animated animate__fadeInRight' : ''}`}>
                  <Row className="align-items-center">
                    <Col md={7} className="order-2 order-md-1">
                      <h2>
                        <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                        Pourquoi rejoindre FreeMap ?
                      </h2>
                      <ul>
                        <li><strong>Simplicité</strong> : Trouvez rapidement un freelance.</li>
                        <li><strong>Proximité</strong> : Des professionnels autour de vous.</li>
                        <li><strong>Confiance</strong> : Échangez en visio.</li>
                        <li><strong>Gratuit</strong> : Inscription gratuite.</li>
                      </ul>
                    </Col>
                    <Col md={5} className="text-center order-1 order-md-2">
                      <img src={logo2} alt="Pourquoi FreeMap" className="img-fluid" loading="lazy" />
                    </Col>
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>

          {/* 🛠️ Comment ça marche ? */}
          <Col md={12} className="mt-5">
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={`p-5 bg-light rounded shadow-sm ${isVisible ? 'animate__animated animate__fadeInUp' : ''}`}>
                  <Row className="align-items-center">
                    <Col md={5} className="text-center">
                      <img
                        src={require('./img/Location_tracking-rafiki.png')}
                        alt="Fonctionnement"
                        className="img-fluid"
                        style={{ maxHeight: '320px', objectFit: 'contain' }}
                        loading="lazy"
                      />
                    </Col>
                    <Col md={7}>
                      <h3>
                        <FontAwesomeIcon icon={faRocket} className="me-2" />
                        Comment ça marche ?
                      </h3>
                      <ol>
                        <li><b>Recherche :</b> Indiquez votre besoin et lieu.</li>
                        <li><b>Découvrez :</b> Parcourez les profils sur la carte.</li>
                        <li><b>Contactez :</b> Lancez une visio pour discuter.</li>
                      </ol>
                    </Col>
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>

          {/* 🔥 Cartes des fonctionnalités */}
          <Suspense fallback={<div className="text-center my-5">Chargement des fonctionnalités...</div>}>
            <FeaturesCards />
          </Suspense>

          {/* 🙌 Appel à l'action */}
          <Col md={12} className="mt-4">
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={`p-4 bg-light rounded text-center ${isVisible ? 'animate__animated animate__pulse' : ''}`}>
                  <h3><FontAwesomeIcon icon={faUsers} className="me-2" />Rejoignez-nous !</h3>
                  <p>Client ou freelance, FreeMap est votre solution !</p>
                  <Button variant="primary" onClick={() => navigate('/Signup')}>
                    Inscrivez-vous gratuitement
                  </Button>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* ❓ FAQ */}
      <div className="bg-white py-5">
        <Container>
          <TrackVisibility once>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2 className="text-center mb-4">Questions fréquentes</h2>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
                    <Accordion.Body>Vous pouvez accéder aux cours depuis votre espace personnel.</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Quels sont les coûts ?</Accordion.Header>
                    <Accordion.Body>L’utilisation de FreeMap est gratuite pour les clients.</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </TrackVisibility>
        </Container>
      </div>

      {/* 🔻 Footer */}
      <footer className="bg-primary text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={3}>
              <img src={logo} alt="FreeMap logo" className="img-fluid mb-3 w-75" loading="lazy" />
              <p>Le contact qu’il vous faut</p>
              <div>
                <a href="#" className="text-white me-2"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="text-white me-2"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#" className="text-white me-2"><FontAwesomeIcon icon={faLinkedin} /></a>
              </div>
            </Col>
            <Col md={3}>
              <h5>Liens utiles</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Trouver un freelance</a></li>
                <li><a href="#" className="text-white">Espace client</a></li>
                <li><a href="#" className="text-white">Proposer mes services</a></li>
                <li><a href="#" className="text-white">Nous contacter</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>À propos</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Notre mission</a></li>
                <li><a href="#" className="text-white">Mentions légales</a></li>
                <li><a href="#" className="text-white">Politique de confidentialité</a></li>
                <li><a href="#" className="text-white">FAQ</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Contact</h5>
              <ul className="list-unstyled">
                {/* Coordonnées disponibles à l’ajout */}
              </ul>
            </Col>
          </Row>
          <p className="text-center mt-3">© {new Date().getFullYear()} FreeMap. Tous droits réservés.</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
