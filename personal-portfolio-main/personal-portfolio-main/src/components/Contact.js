import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';

export const Contact = () => {
  const form = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ptpyx0o', 'template_pqumcbp', form.current, 'JlZsRsmsauWRw7_zx')
      .then((result) => {
        console.log(result.text);
        setSubmitStatus('success');
        setPopupMessage('Message sent successfully');
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.text);
        setSubmitStatus('error');
        setPopupMessage('Something went wrong, please try again later');
      })
      .finally(() => {
        setIsPopupOpen(true);
        setTimeout(() => {
          setIsPopupOpen(false);
        }, 3000);
      });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="user_name" />
                    <label>Email</label>
                    <input type="email" name="user_email" />
                    <label>Message</label>
                    <textarea name="message" />
                    <input type="submit" value="Send" className={submitStatus} />
                  </form>
                  {isPopupOpen && (
                    <div className={`popup ${submitStatus}`}>
                      <div className="popup-content">
                        <span>{popupMessage}</span>
                        <span
                          className="popup-close"
                          onClick={() => setIsPopupOpen(false)}
                        >
                          &#x2716;
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
