import React from "react";
import faceBookPhoto from "./icons/facebook.png";
import whatsAppPhoto from "./icons/whatsapp.png";
import mailPhoto from "./icons/email.png";
import gitHubPhoto from "./icons/github.png";
import linkedInPhoto from "./icons/linkedin-icon.png";

const Footer = () => {
  return (
    <div id="footer">
      <span id="contact-title">Ilay Tissona ©</span>
      <div id="contact-links">
        <a
          href="https://www.facebook.com/ilay.tissona"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="contact-logo"
            id="facebook-link"
            src={faceBookPhoto}
            alt="FaceBook"
          />
        </a>
        <a
          href="https://github.com/IlayTissona"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="contact-logo"
            id="github-link"
            src={gitHubPhoto}
            alt="gitHub"
          />
        </a>
        <a href="mailto:ilay211@gmail.com" target="_blank" rel="noreferrer">
          <img
            className="contact-logo"
            id="mail-link"
            src={mailPhoto}
            alt="mail"
          />
        </a>
        <a
          href="https://wa.me/972536204048?text=I%20like%20your%20Ticket%20Manager"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="contact-logo"
            id="whatsapp-link"
            src={whatsAppPhoto}
            alt="whatsapp"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/ilay-tissona-97ba11209/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="contact-logo"
            id="linkedIn-link"
            src={linkedInPhoto}
            alt="linkedIn"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
