import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import logo from './logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/dashboard"; // Redirect back to the requested page

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};
    try {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
      await signIn(email, password); // Use the signIn function from context
      navigate(from, { replace: true }); // Redirect to the original page
    } catch (error) {
      alert(error.message); // Handle errors
    }
    // Appel API pour la connexion (par exemple, via Redux ou context)
    // dispatch(loginUser(email, password)); // à intégrer selon ton store Redux ou context API
  };

 
  return (
    <Container fluid className="groundback">
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center p-3">
      <Row className="shadow-lg rounded overflow-hidden w-100" style={{maxWidth: '1000px'}}>
        {/* Left side (blue) */}
        <Col xs={12} md={4} className="bg-primary text-white p-4 d-flex flex-column justify-content-center">
        <img src={logo} alt="FREEMAP logo" className="img-fluid mb-3  w-75" />

          <p className="mt-4">
            Bienvenue dans la communauté <strong>Freemap</strong>. <br />
            Candidats, étudiants et professeurs, accédez aux services et outils 
            Augustin Ruinard grâce à votre compte.
          </p>
            <Button variant="light" onClick={() => navigate('/Signup') } className="bg-primary border-2 text-white  fw-bold mt-3">Créer votre compte</Button>
          
        </Col>

        {/* Right side (form) */}
        <Col xs={12} md={8} className="bg-white p-4 p-md-5">
          <h2 className="text-primary fw-bold text-center mb-4">Connexion</h2>
          <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit" className="bg-primary w-100 " disabled={isLoading}>
              {isLoading ? 'Chargement...' : 'Connexion'}
            </Button>

            <p className="text-center mt-3">
              <a href="/forgot-password" className="text-primary fw-bold">Mot de passe oublié ?</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
    </Container>
  );
};

export default Login;

