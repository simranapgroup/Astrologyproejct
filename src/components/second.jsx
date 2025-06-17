import "../css/second.css"
// Import mobile-specific styles
import aboutImage from "../Images/about.png"
import Footer from "./Footer"
import Navbar from "./Navbar"

const SecondSection = () => {
  return (
    <>
       <Navbar /> 
      <section className="second-section">
        <div className="container">
          <h1 className="main-heading">Astro Vastu Upay By Aditya Pareek: Best Astrologer In India</h1>

          <div className="about-text">
            <p>
              Mr. Aditya Pareek is the visionary leader and driving force behind AP Group since its founding in 2011.
              His unique blend of expertise in IT, Electronics and Telecommunication, and Civil Engineering, coupled
              with a profound understanding of astrology, palmistry, and Vastu has empowered him to navigate the path of
              success. His strategic foresight and innovative approach have propelled the company to global acclaim.
            </p>
          </div>

          <div className="serv-container">
            <div className="image-container">
              <img src={aboutImage || "/placeholder.svg"} alt="Palmistry Device" />
            </div>

            <div className="services-content">
              <h2 className="services-heading">What Do We Do ?</h2>

              <div className="services-description">
                <p>
                  We help people align their lives with the energy of the universe. At Astro VaastUpaay, we combine the
                  power of Vedic Astrology, Vastu Shastra, and Spiritual Guidance to help individuals:
                </p>

                <ul className="services-list">
                  <li>Understand life patterns and challenges</li>
                  <li>Remove negative planetary influences</li>
                  <li>Attract peace, success, and harmony</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SecondSection
