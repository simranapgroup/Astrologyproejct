"use client"
import { MessageCircle, Phone, ShoppingCart, Flame } from "lucide-react"
import '../css/Communicationbutton.css'

export default function Communicationbutton() {
  return (
<div>
  <h2 className="services-heading">Connect With Us</h2>


    <div className="services-container">
         
      <div className="services-wrapper">
       
        <div className="service-card">
          <div className="icon-container pink">
            <MessageCircle className="icon" />
          </div>
          <h3 className="service-title">Chat with Astrologer</h3>
        </div>

      
        <div className="service-card">
          <div className="icon-container teal">
            <Phone className="icon" />
          </div>
          <h3 className="service-title">Talk to Astrologer</h3>
        </div>

       
        <div className="service-card">
          <div className="icon-container blue">
            <ShoppingCart className="icon" />
          </div>
          <h3 className="service-title">Astromall Shop</h3>
        </div>

       
        <div className="service-card">
          <div className="icon-container orange">
            <Flame className="icon" />
          </div>
          <h3 className="service-title">Book A Pooja</h3>
        </div>
      </div>
    </div>
    </div>
  )
}
