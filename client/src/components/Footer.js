import React from "react";
// import faceBookPhoto from "../../public"

const Footer = () => {
  return (
    <div id="footer">
      Ilay Tissona ©
      <a
        href="https://www.facebook.com/ilay.tissona"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="contact-logo"
          id="facebook-link"
          src="../../public/facebook.png"
          alt="FaceBook"
        />
      </a>
      <a href="https://github.com/IlayTissona" target="_blank" rel="noreferrer">
        <img
          className="contact-logo"
          id="github-link"
          src="../../public/github.png"
          alt="gitHub"
        />
      </a>
      <a href="mailto:ilay211@gmail.com" target="_blank" rel="noreferrer">
        <img
          className="contact-logo"
          id="mail-link"
          src="../../public/email.png"
          alt="mail"
        />
      </a>
      <a
        href="https://wa.me/972536204048?text=I%20like%20your%20URL%20Shortener"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="contact-logo"
          id="whatsapp-link"
          src="../../public/whatsapp.png"
          alt="whatsapp"
        />
      </a>
    </div>
  );
};

export default Footer;
