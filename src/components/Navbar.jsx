"use client"

import { useState } from "react"
import '../css/Navbar.css'
import logo from "../Images/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo || "/placeholder.svg"} alt="Astro Logo" />
        </div>
        <div className={`nav-items ${isOpen ? "active" : ""}`}>
          <a href="/" className="nav-item active">
            Home
          </a>
          <a href="/about" className="nav-item">
            About Us
          </a>
          <a href="/foundation" className="nav-item">
            AP Foundation
          </a>
          <div className="dropdown">
            <a href="/calculators" className="nav-item">
              Free Calculators <span className="dropdown-arrow">▼</span>
            </a>
            <div className="dropdown-content">
              <a href="/calculator1">Calculator 1</a>
              <a href="/calculator2">Calculator 2</a>
              <a href="/calculator3">Calculator 3</a>
            </div>
          </div>
          <a href="/services" className="nav-item">
            Services
          </a>
          <a href="/appointments" className="nav-item">
            Appointments
          </a>
          <a href="/contact" className="nav-item">
            Contact
          </a>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
