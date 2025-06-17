"use client"
import { MessageCircle, Phone, ShoppingCart, Flame } from "lucide-react"
import "../css/Communicationbutton.css"

export default function Communicationbutton() {
  return (
    <div>
      <h2 className="services-heading">Connect With Us</h2>

      <div className="services-container">
        <div className="background-decoration">
          <div className="star star-1">✦</div>
          <div className="star star-2">✧</div>
          <div className="star star-3">✦</div>
          <div className="star star-4">✧</div>
          <div className="star star-5">✦</div>
          <div className="star star-6">✧</div>
        </div>

        <div className="services-wrapper">
          <div className="service-card">
            <div className="icon-container green">
              <MessageCircle className="icon" />
            </div>
            <h3 className="service-title">Chat with Astrologer</h3>
          </div>

          <div className="service-card">
            <div className="icon-container orange">
              <Phone className="icon" />
            </div>
            <h3 className="service-title">Talk to Astrologer</h3>
          </div>

          <div className="service-card">
            <div className="icon-container golden">
              <ShoppingCart className="icon" />
            </div>
            <h3 className="service-title">Astromall Shop</h3>
          </div>

          <div className="service-card">
            <div className="icon-container dark-green">
              <Flame className="icon" />
            </div>
            <h3 className="service-title">Book A Pooja</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
