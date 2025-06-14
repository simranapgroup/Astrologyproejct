import { ArrowRight } from "lucide-react"
import "../css/Services.css"
import ap from '../Images/ap.png'
export default function Services() {
  const services = [
    {
      id: 1,
      title: "Kundli Dasha",
      description: "Spot the Flaws, Embrace the Fix",
      icon: "sun",
    },
    {
      id: 2,
      title: "Graha Shanti",
      description: "Harmonize planetary energies to restore cosmic peace.",
      icon: "globe",
    },
    {
      id: 3,
      title: "Match Making",
      description: "Perfect Match Begins with Perfect Stars.",
      icon: "heart",
    },
    {
      id: 4,
      title: "Consultation Call",
      description: "Connect with Clarity, Speak with the Stars.",
      icon: "message-circle",
    },
    {
      id: 5,
      title: "Wellness Upaay",
      description: "Restore mind, body, and spirit with ancient wellness remedies.",
      icon: "leaf",
    },
    {
      id: 6,
      title: "Numerology",
      description: "Discover how numbers influence your destiny and decisions.",
      icon: "arrow-up-down",
    },
    {
      id: 7,
      title: "Face Reading",
      description: "Decode personality and fate through facial features.",
      icon: "eye",
    },
    {
      id: 8,
      title: "Gemstone Consultation",
      description: "Empower your energies with the right astrological gems.",
      icon: "diamond",
    },
  ]

  const featuredServices = [
    {
      id: 9,
      title: "Palmistry",
      description: "Discover Your Destiny in the Lines of Your Palm.",
      icon: "hand",
      featured: true,
    },
    {
      id: 10,
      title: "Book Call",
      description: "One Call Can Change Your Cosmic Path",
      icon: "phone",
    },
    {
      id: 11,
      title: "Life Coach",
      description: "Guiding you to clarity, confidence, and conscious choices.",
      icon: "user",
    },
    {
      id: 12,
      title: "Meditation Upaay",
      description: "Find inner peace through spiritual practices and cosmic alignment.",
      icon: "lotus",
    },
  ]

  return (
    <div className="container">
      {/* Hero section with astrologer image */}
      <div className="hero-section">
        <div className="astrologer-container">
          <div className="astrologer-background">
            <div className="sunburst-circle"></div>
            {/* Sunburst lines */}
            <div className="sunburst-lines">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="sunburst-line" style={{ transform: `rotate(${i * 10}deg)` }}></div>
              ))}
            </div>
            {/* Orbit circles with dots */}
            <div className="orbit-container">
              <div className="orbit orbit-large">
                <div className="orbit-dot orbit-dot-right"></div>
              </div>
              <div className="orbit orbit-medium">
                <div className="orbit-dot orbit-dot-bottom"></div>
              </div>
              <div className="orbit orbit-small">
                <div className="orbit-dot orbit-dot-left"></div>
              </div>
            </div>
          </div>
          <div className="astrologer-image">
        <img
  src={ap}
  alt="Astrologer"
  width={200}
  height={200}
/>

          </div>
        </div>
        <div className="services-grid services-grid-2">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Featured services row */}
      <div className="services-grid services-grid-4">
        {featuredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Regular services row */}
      <div className="services-grid services-grid-4">
        {services.slice(4, 8).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Book appointment button */}
      <div className="book-appointment-container">
        <a href="#book-appointment" className="book-appointment-button">
          Book Appointment
        </a>
      </div>
    </div>
  )
}

function ServiceCard({ service }) {
  // Custom icons mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case "sun":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </div>
        )
      case "globe":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        )
      case "heart":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        )
      case "message-circle":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </div>
        )
      case "leaf":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
        )
      case "arrow-up-down":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="m21 16-4 4-4-4" />
              <path d="M17 20V4" />
              <path d="m3 8 4-4 4 4" />
              <path d="M7 4v16" />
            </svg>
          </div>
        )
      case "eye":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        )
      case "diamond":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
            </svg>
          </div>
        )
      case "hand":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>
        )
      case "phone":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        )
      case "user":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </div>
        )
      case "lotus":
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M12 2a4 4 0 0 0-4 4 7 7 0 0 0 4 6 7 7 0 0 0 4-6 4 4 0 0 0-4-4Z" />
              <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74-1.85 5.36-1.99 7.86-.42" />
              <path d="M12 22a8 8 0 0 0 8-8 12.33 12.33 0 0 0-8-3 12.33 12.33 0 0 0-8 3 8 8 0 0 0 8 8Z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 14.14 14.14" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className={`service-card ${service.featured ? "service-card-featured" : ""}`}>
      <div className="service-icon">{getIcon(service.icon)}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-link">
        <a href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`} className="read-more-link">
          Read More <ArrowRight className="arrow-icon" />
        </a>
      </div>
    </div>
  )
}
