import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/png/logo-no-background.png";
import navIcon1 from "../assets/img/linkedin3.png";
import navIcon2 from "../assets/img/twitter8.png";
import navIcon3 from "../assets/img/linkTree1.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/surya-singh-08aa49224/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://twitter.com/3suryasingh"><img src={navIcon2} alt="Icon" /></a>
              <a href="https://linktr.ee/suryasingh_30"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>Copyright 2023. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
