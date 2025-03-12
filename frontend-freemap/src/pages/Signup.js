
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from "./img/logo.png"
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Le nom est requis';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Le mot de passe doit avoir au moins 6 caractères';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Appel API pour l'inscription (par exemple, via Redux ou context)
    // dispatch(registerUser(name, email, password)); // à intégrer selon ton store Redux ou context API
  };

  return (
    <Container fluid className="groundback">
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center p-3">
        <Row className="shadow-lg rounded overflow-hidden w-100" style={{maxWidth: '1000px'}}>
          {/* Left side (blue) */}
          <Col xs={12} md={4} className="bg-primary text-white p-4 d-flex flex-column justify-content-center">
           
            <img src={logo} alt="FREEMAP logo" className="img-fluid mb-3  w-75" />
                       <p className="mt-4">
              Rejoignez la communauté <strong>Freemap</strong>. <br />
              Créez votre compte pour accéder à tous nos services et outils.
            </p>
        <Link to="/login" className="bg-color-white">
            <Button variant="light" className="bg-primary-btn1 border-2 text-white fw-bold mt-3">
              Se connecter
            </Button>
        </Link>

          </Col>
  
          {/* Right side (form) */}
          <Col xs={12} md={8} className="bg-white p-4 p-md-5">
            <h2 className="text-primary fw-bold text-center mb-4">Créer un compte</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nom</Form.Label>
                <Form.Control 
                  className="bg-custom" style={{ '--bs-bg-opacity': 0.17 }}
                  type="text"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  className="bg-custom" style={{ '--bs-bg-opacity': 0.17 }}
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control 
                  className="bg-custom" style={{ '--bs-bg-opacity': 0.17 }}
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirmer le mot de passe</Form.Label>
                <Form.Control 
                  className="bg-custom" style={{ '--bs-bg-opacity': 0.17 }}
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
        <Link to="" className="bg-color-white">
              <Button variant="primary" type="submit" className="bg-primary-btn w-100" disabled={isLoading}>
                {isLoading ? 'Chargement...' : 'Créer un compte'}
                </Button>
          </Link>
          
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SignUpPage;
