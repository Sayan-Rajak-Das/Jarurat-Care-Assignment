import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import './footer.css'; 

const Footer = () => {
  const location = useLocation();
  const isFixedPosition = location.pathname === "/" || location.pathname === "/login"; 

  return (
    <footer className={`footer ${isFixedPosition ? "fixed-footer" : "sticky-footer"}`}>
      <Container fluid>
        <Row className="py-2">
          <Col md={6} className="footer-text">
            <p className="text-white m-0">
              &copy; 2025 Jarurat Care. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-white"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-white"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
