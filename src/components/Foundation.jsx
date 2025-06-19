
import React, { useEffect } from 'react';
import '../css/Foundation.css'

const Foundation = () => {
  useEffect(() => {
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });

    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add parallax effect to banner
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const banner = document.querySelector('.banner-section');
      if (banner) {
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const galleryItems = [
    {
      id: 1,
      title: "Divine Rituals",
      description: "Experience the sacred atmosphere of our daily rituals and special ceremonies dedicated to Lord Hanuman and spiritual awakening.",
      placeholder: "Temple Rituals & Ceremonies"
    },
    {
      id: 2,
      title: "Cosmic Guidance",
      description: "Personalized astrological readings and consultations to help navigate life's challenges and opportunities through ancient wisdom.",
      placeholder: "Astrological Consultations"
    },
    {
      id: 3,
      title: "Sacred Remedies",
      description: "Traditional remedial practices, gemstone therapy, and spiritual healing methods to restore balance and harmony in life.",
      placeholder: "Spiritual Remedies"
    },
    {
      id: 4,
      title: "Divine Gatherings",
      description: "Join our community events, festivals, and spiritual gatherings that bring devotees together in celebration and prayer.",
      placeholder: "Community Events"
    },
    {
      id: 5,
      title: "Inner Peace",
      description: "Guided meditation sessions and prayer meetings that foster inner peace, spiritual growth, and divine connection.",
      placeholder: "Meditation & Prayers"
    },
    {
      id: 6,
      title: "Spiritual Learning",
      description: "Educational workshops and courses on Vedic astrology, spiritual practices, and ancient wisdom for seekers of all levels.",
      placeholder: "Educational Programs"
    }
  ];

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      content: "Anjani Putra Hanuman Mandir\nGurugram, Haryana, India"
    },
    {
      icon: "📞",
      title: "Contact",
      content: "Phone: +91 XXXXX XXXXX\nEmail: info@apfoundation.com"
    },
    {
      icon: "🕐",
      title: "Temple Hours",
      content: "Daily: 6:00 AM - 9:00 PM\nSpecial events as scheduled"
    },
    {
      icon: "🙏",
      title: "Services",
      content: "Astrology Consultations\nSpiritual Guidance & Remedies"
    }
  ];

  return (
    <div className="ap-foundation">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner-content fade-in-up">
          <div className="banner-ornament">॥ ॐ ॥</div>
          <h1 className="banner-title">AP Foundation</h1>
          <p className="banner-subtitle">Anjani Putra Hanuman Mandir Gurugram</p>
          <div className="banner-ornament">✦ ◆ ✦</div>
          <p className="banner-description">
            Welcome to AP Foundation, a sacred space dedicated to spiritual growth, divine wisdom, and the ancient science of astrology. 
            Our foundation serves as a beacon of hope and guidance, offering glimpses into the cosmic patterns that shape our lives 
            through rituals, remedies, events, and profound spiritual moments.
          </p>
          <div className="banner-ornament">🕉</div>
        </div>
      </section>

      {/* Screenshot/Gallery Section */}
      <section className="screenshot-section">
        <div className="container">
          <h2 className="section-title fade-in-up">Sacred Moments & Spiritual Journey</h2>
          <p className="section-description fade-in-up">
            Discover the divine essence of our foundation through these sacred glimpses of our rituals, 
            remedies, events, and spiritual practices that guide souls toward enlightenment.
          </p>
          
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <span>{item.placeholder}</span>
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container fade-in-up">
            <div className="map-header">
              <h2>Visit Our Sacred Space</h2>
              <p>Find us at Anjani Putra Hanuman Mandir, Gurugram</p>
            </div>
            
            <div className="map-embed">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83983411318!2d76.84887773378424!3d28.420890330362933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1703001234567!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="AP Foundation Location"
              />
            </div>
            
            <div className="contact-info">
              {contactInfo.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{contact.icon}</div>
                  <h4>{contact.title}</h4>
                  <p>{contact.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < contact.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Foundation;