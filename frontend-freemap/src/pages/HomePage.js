import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt, faEnvelope, faPhone, faLightbulb, faRocket,
    faUsers, faVideo
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import NavBar from '../components/NavBar';
import logo from './img/logo.png';
import logo2 from './img/Location_tracking-bro.png';
import './css/HomePage.css';
import SearchBar from '../components/SearchBar';
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import FeaturesCards from '../components/FeaturesCards';

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
            <div>
                <SearchBar setResults={setResults} />
            </div>

            {/* Section À propos FreeMap */}
            <Container className="my-5">
                <Row className="align-items-center">
                    <Col md={5} className="text-center mb-4 mb-md-0">
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeInLeft" : ""}>
                                    <img
                                        src={require('./img/Location_tracking-amico.png')}
                                        alt="Illustration FreeMap"
                                        className="img-fluid"
                                        style={{ maxHeight: '320px', width: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                            }
                        </TrackVisibility>
                    </Col>
                    <Col md={7}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeInRight" : ""}>
                                    <h3 className="fw-bold mb-3 text-primary">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                        FreeMap : Trouvez le freelance idéal près de chez vous
                                    </h3>
                                    <p>
                                        FreeMap est une plateforme innovante de mise en relation entre freelances et clients grâce à une carte interactive. Visualisez en un coup d'œil les profils, les spécialités, les avis et les tarifs des professionnels autour de vous.
                                    </p>
                                    <Button variant="outline-primary" className="mt-2">En savoir plus</Button>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>

            {/* Main Content Section */}
            <Container className="my-5">
                <Row>
                    {/* 🚀 Nouvelle Section : Pourquoi choisir FreeMap */}
                    <Col md={12} className="d-flex align-items-center mt-5 p-5 rounded text-white" style={{ backgroundColor: '#238FB7', minHeight: '400px' }}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeInRight" : ""} style={{ width: "100%" }}>
                                    <Row className="align-items-center">
                                        <Col md={7}>
                                            <h2 className="mb-4">
                                                <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                                                Pourquoi rejoindre FreeMap ?
                                            </h2>
                                            <ul className="fs-5">
                                                <li><b>Simplicité</b> : Trouvez rapidement des freelances disponibles.</li>
                                                <li><b>Proximité</b> : Entrez en contact avec des professionnels près de chez vous.</li>
                                                <li><b>Confiance</b> : Consultez les profils et échangez en visioconférence.</li>
                                                <li><b>Gratuit</b> : L'inscription et la recherche de freelances sont gratuites.</li>
                                            </ul>
                                        </Col>
                                        <Col md={5} className="text-center">
                                            <img
                                                src={logo2}
                                                alt="Pourquoi rejoindre FreeMap ?"
                                                className="img-fluid"
                                                style={{ maxHeight: '320px', width: '100%', objectFit: 'contain' }}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>

                    <Col md={12} className="mt-5">
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={`p-5 rounded shadow-sm bg-light ${isVisible ? "animate__animated animate__fadeInRight" : ""}`}>
                                    <Row className="align-items-center">

                                        <Col md={5} className="text-center">
                                            <img
                                                src={require('./img/Location_tracking-rafiki.png')}
                                                alt="Illustration FreeMap choix"
                                                className="img-fluid"
                                                style={{ maxHeight: '320px', width: '100%', objectFit: 'contain' }}
                                            />
                                        </Col>
                                        <Col md={7} className="mt-4">
                                            <TrackVisibility>
                                                {({ isVisible }) =>
                                                    <div className={`p-4 rounded shadow-sm bg-light bounce-hover ${isVisible ? "animate__animated animate__pulse" : ""}`}>
                                                        <h3><FontAwesomeIcon icon={faRocket} className="me-2" />Comment ça marche ?</h3>
                                                        <ol>
                                                            <li><b>Recherche</b> : Indiquez votre besoin (spécialisation) et votre localisation.</li>
                                                            <li><b>Découvrez</b> : Explorez les profils des freelances disponibles sur la carte.</li>
                                                            <li><b>Contactez</b> : Démarrez une vidéoconférence pour échanger sur votre projet.</li>
                                                        </ol>
                                                    </div>
                                                }
                                            </TrackVisibility>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>

                    {/* 🔥 Nouvelle Section : Trouvez le freelance qu’il vous faut */}

                <FeaturesCards />
                    
                    
                    
                    <Col md={12} className="mt-4">
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={`p-4 rounded shadow-sm bg-light text-center bounce-hover ${isVisible ? "animate__animated animate__pulse" : ""}`}>
                                    <h3><FontAwesomeIcon icon={faUsers} className="me-2" />Rejoignez-nous !</h3>
                                    <p>Que vous soyez un client à la recherche d'un freelance ou un professionnel souhaitant proposer vos services, FreeMap est fait pour vous !</p>
                                    <Button variant="primary" onClick={() => navigate('/Signup')}>Inscrivez-vous gratuitement</Button>

                                </div>
                            }
                        </TrackVisibility>
                    </Col>
                </Row>


            </Container>

            {/* FAQ Section */}
            <div className="bg-white text-blue py-5">
                <Container>
                    <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <h2 className="text-center mb-4">Questions fréquentes</h2>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
                                        <Accordion.Body>Lorem ipsum dolor sit amet...</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Comment suivre nos cours proposés ?</Accordion.Header>
                                        <Accordion.Body>Lorem ipsum dolor sit amet...</Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        }
                    </TrackVisibility>
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
                                {/* <li><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> 64 Allée des Champs Elysées, 91080 Évry-Courcouronnes</li> */}
                                {/* <li><FontAwesomeIcon icon={faEnvelope} className="me-2" /> contact@augustinruinardacademie.com</li> */}
                                {/* <li><FontAwesomeIcon icon={faPhone} className="me-2" /> 01 85 78 76 67</li> */}
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
