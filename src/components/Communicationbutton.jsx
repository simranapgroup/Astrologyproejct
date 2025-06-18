"use client"
import { MessageCircle, Phone, ShoppingCart, Flame } from "lucide-react"
import { useState, useEffect } from "react"
import "../css/Communicationbutton.css"

export default function Communicationbutton() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const services = [
    {
      icon: MessageCircle,
      title: "Chat with Astrologer",
      containerClass: "green",
    },
    {
      icon: Phone,
      title: "Talk to Astrologer",
      containerClass: "orange",
    },
    {
      icon: ShoppingCart,
      title: "Astromall Shop",
      containerClass: "golden",
    },
    {
      icon: Flame,
      title: "Book A Pooja",
      containerClass: "dark-green",
    },
  ]

  const renderMobileLayout = () => {
    const rows = []
    for (let i = 0; i < services.length; i += 2) {
      const rowServices = services.slice(i, i + 2)
      rows.push(
        <div key={i} className="mobile-row">
          {rowServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={i + index} className="service-card mobile-card">
                <div className={`icon-container ${service.containerClass}`}>
                  <IconComponent className="icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>
            )
          })}
        </div>,
      )
    }
    return rows
  }

  const renderDesktopLayout = () => {
    return services.map((service, index) => {
      const IconComponent = service.icon
      return (
        <div key={index} className="service-card">
          <div className={`icon-container ${service.containerClass}`}>
            <IconComponent className="icon" />
          </div>
          <h3 className="service-title">{service.title}</h3>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="services-container">
        <h2 className="services-heading">Connect With Us</h2>
        <div className="background-decoration">
          <div className="star star-1">✦</div>
          <div className="star star-2">✧</div>
          <div className="star star-3">✦</div>
          <div className="star star-4">✧</div>
          <div className="star star-5">✦</div>
          <div className="star star-6">✧</div>
        </div>

        {isMobile ? (
          <div className="services-wrapper-mobile">{renderMobileLayout()}</div>
        ) : (
          <div className="services-wrapper">{renderDesktopLayout()}</div>
        )}
      </div>
    </div>
  )
}
