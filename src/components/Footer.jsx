import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa"
import "../css/Footer.css"
import flogo from "../Images/flogo.png"

const Footer = () => {
  return (
    <footer className="footer">
      {/* Decorative edge */}
      <div className="footer-edge"></div>

      {/* Background image */}
      <div className="footer-bg"></div>

      {/* Footer content */}
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company info */}
          <div className="footer-column">
            <div className="logo-container">
              <img src={flogo || "/placeholder.svg"} alt="Astro Vastu Logo" className="logo" />
            </div>

            <p className="company-name">Astro Vastu Upay by Aditya Pareek</p>
            <p className="company-tagline">Best Astrologer in India</p>

            <div className="contact-section">
              <div className="contact-item">
                <FaMapMarkerAlt className="icon" />
                <p>
                  AP Group, Plot No. 2, EHTP Urban Estate, Near Hero Honda Chowk, Sector -34, Gurugram - 122001,
                  Haryana, India
                </p>
              </div>

            <div className="contact-item">
  <FaPhone className="icon" />
  <p>+91-9289109203</p>
</div>


              <div className="contact-item">
                <FaPhone className="icon" />
                <p>+91-9289109259</p>
              </div>

              <div className="contact-item">
                <FaPhone className="icon" />
                <p>01244242426</p>
              </div>

              <div className="contact-item">
                <FaEnvelope className="icon" />
                <p>astrovaastupaay@ap.group</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3 className="footer-heading">SERVICES</h3>
            <ul className="footer-links">
              {[
                "Astrology Consultation",
                "Vastu Shastra",
                "Horoscope Reading",
                "Gemstone Recommendation",
                "Numerology",
                "Palmistry",
              ].map((item) => (
                <li key={item} className="footer-link-item">
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <ul className="footer-links">
              {["Home", "About Us", "Services", "Appointments", "Contact", "Horoscope"].map((item) => (
                <li key={item} className="footer-link-item">
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="footer-column">
            <h3 className="footer-heading">LEGAL</h3>
            <ul className="footer-links">
              {["Privacy Policy", "Terms & Conditions", "Cancellation & Refund", "Shipping & Delivery"].map((item) => (
                <li key={item} className="footer-link-item">
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright and Social */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {new Date().getFullYear()} Astro Vastu Upay by Aditya Pareek. All Rights Reserved.</p>
          </div>

          <div className="social-grid">
            {[
              { icon: <FaFacebook className="social-icon" />, href: "#" },
              { icon: <FaInstagram className="social-icon" />, href: "#" },
              { icon: <FaTwitter className="social-icon" />, href: "#" },
              { icon: <FaLinkedin className="social-icon" />, href: "#" },
              { icon: <FaYoutube className="social-icon" />, href: "#" },
              { icon: <FaEnvelope className="social-icon" />, href: "#" },
            ].map((social, index) => (
              <a key={index} href={social.href} className="social-link">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer