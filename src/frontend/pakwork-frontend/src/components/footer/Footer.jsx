import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PakworkLogo from "../../assets/pakwork_logo_light.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="#">
                      <img src={PakworkLogo} className="img-fluid" alt="logo" />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      A Freelancing platform for Pakistani freelancers. Where
                      freelancers can easily sell their gigs and offer services
                      to potential clients/businesses. We aim to provide a fully
                      featured platform that provides everything necessary for a
                      seamless process of transaction between the two entities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul className="footer-links">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Become a freelancer</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">How does Pakwork actually work?</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; 2022-23, All Right Reserved{" "}
                    <a href="#">Pakwork</a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
