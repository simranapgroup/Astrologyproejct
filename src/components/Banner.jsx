"use client"

import { useState, useEffect } from "react"
import '../css/Banner.css'

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Balance Your Space, Align Your Destiny",
      subtitle: "Vastu. Astrology. Energy.",
      description:
        "With powerful Vaastu remedies and astrological solutions, we help bring harmony to your home, workplace, and spirit.",
      buttonText: "Explore Services",
    },
    {
      title: "Transform Your Environment",
      subtitle: "Vastu. Astrology. Energy.",
      description: "Discover how ancient wisdom can create positive energy flow in your modern spaces.",
      buttonText: "Learn More",
    },
    {
      title: "Unlock Your Potential",
      subtitle: "Vastu. Astrology. Energy.",
      description: "Align your surroundings with cosmic energies to manifest success and well-being.",
      buttonText: "Get Started",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Create array of 24 elements for radial lines
  const radialLines = Array.from({ length: 24 }, (_, i) => i)

  return (
    <section className="hero-section">
      <div className="container-12">
        <div className="container-10">
          <div className="grid-row">
            {/* Left side - Text content (6 columns) */}
            <div className="grid-col-6 text-content">
              <div className="slider-container">
                {slides.map((slide, index) => (
                  <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="slide-content">
                      <p className="subtitle">{slide.subtitle}</p>
                      <h1 className="title">{slide.title}</h1>
                      <p className="description">{slide.description}</p>
                      <button className="cta-button">{slide.buttonText}</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider controls */}
              <div className="slider-controls">
                <button onClick={prevSlide} className="arrow-button prev-button">
                  ‹<span className="sr-only">Previous slide</span>
                </button>

                <div className="dots-container">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`dot ${index === currentSlide ? "active" : ""}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button onClick={nextSlide} className="arrow-button next-button">
                  ›<span className="sr-only">Next slide</span>
                </button>
              </div>
            </div>

            {/* Right side - Image with spinning circle (6 columns) */}
            <div className="grid-col-6 image-grid">
              <div className="spinning-circle-container">
                <div className="spinning-circle">
                  {/* Radial lines */}
                  {radialLines.map((i) => (
                    <div key={i} className="radial-line" style={{ transform: `rotate(${i * 15}deg)` }}></div>
                  ))}

                  {/* Circle dots */}
                  <div className="circle-dot dot-top"></div>
                  <div className="circle-dot dot-right"></div>
                  <div className="circle-dot dot-bottom-right"></div>
                  <div className="circle-dot dot-bottom"></div>
                  <div className="circle-dot dot-top-left"></div>
                  <div className="circle-dot dot-left"></div>
                </div>

                {/* Person image */}
                <div className="person-image">
                  <img src="/placeholder.svg" alt="Astrologer" className="person-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
