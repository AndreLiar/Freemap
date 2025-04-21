import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faVideo, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import TrackVisibility from "react-on-screen";
import "./CustomCards.css"; // Ajoute ce fichier CSS

export default function FeaturesCards() {
  // Pour la démo, tu peux remplacer les onClick par tes propres handlers/routes
  const handleFreelanceClick = () => alert("Créer mon profil gratuitement");
  const handleVisioClick = () => alert("Tester une démo visio");
  const handleIdfClick = () => alert("Voir les freelances autour de moi");

  return (
    <section className="my-5">
      <TrackVisibility>
        {({ isVisible }) =>
          <Row className="g-4 justify-content-center">
            {/* Carte 1 */}
            <Col md={4}>
              <div
                className={`feature-card text-center bg-white p-4 rounded shadow-sm h-100 ${isVisible ? "animate__animated animate__fadeInLeft" : ""}`}
                onClick={handleFreelanceClick}
                tabIndex={0}
                role="button"
              >
                <h3>
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Vous êtes freelance ?
                </h3>
                <p>Créez un profil et soyez visible instantanément par les clients près de chez vous.</p>
                <Button variant="success">Créer mon profil gratuitement</Button>
              </div>
            </Col>
            {/* Carte 2 */}
            <Col md={4}>
              <div
                className={`feature-card text-center bg-light p-4 rounded shadow-sm h-100 ${isVisible ? "animate__animated animate__fadeInUp" : ""}`}
                onClick={handleVisioClick}
                tabIndex={0}
                role="button"
              >
                <h3>
                  <FontAwesomeIcon icon={faVideo} className="me-2" />
                  Discutez en direct
                </h3>
                <p>Plus besoin d'attendre, démarrez une visio en un clic avec les freelances disponibles.</p>
                <Button variant="primary">Tester une démo visio</Button>
              </div>
            </Col>
            {/* Carte 3 */}
            <Col md={4}>
              <div
                className={`feature-card text-center bg-white p-4 rounded shadow-sm h-100 ${isVisible ? "animate__animated animate__fadeInRight" : ""}`}
                onClick={handleIdfClick}
                tabIndex={0}
                role="button"
              >
                <h3>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  Optimisé pour l'Île-de-France
                </h3>
                <p>FreeMap est pensé pour répondre aux besoins locaux des professionnels et clients en Île-de-France.</p>
                <Button variant="outline-primary">Voir les freelances autour de moi</Button>
              </div>
            </Col>
          </Row>
        }
      </TrackVisibility>
    </section>
  );
}
