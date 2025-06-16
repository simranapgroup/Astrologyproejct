"use client"

import { useState } from "react"
import "../css/Navbar.css"
import logo from "../Images/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState("")

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Grid 12 -> 10 -> margin auto */}
        <div className="grid-12">
          <div className="grid-12">
            <div className="navbar-content">
              {/* Logo */}
              <div className="logo">
                <img src={logo || "/placeholder.svg"} alt="Astro Logo" />
              </div>

              {/* Navigation Items */}
              <div className={`nav-items ${isOpen ? "active" : ""}`}>
                {/* Home */}
                <a href="/" className="nav-item active">
                  Home
                </a>

                {/* Services with Dropdown */}
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-item"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleDropdown("services")
                    }}
                  >
                    Services <span className="dropdown-arrow">▼</span>
                  </a>
                  <div className={`dropdown-content ${activeDropdown === "services" ? "mobile-active" : ""}`}>
                    <a href="/free-calculators">Free Calculators</a>
                    <a href="/video-call">Video Call</a>
                  </div>
                </div>

                {/* Contact with Dropdown */}
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-item"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleDropdown("contact")
                    }}
                  >
                    Contact <span className="dropdown-arrow">▼</span>
                  </a>
                  <div className={`dropdown-content ${activeDropdown === "contact" ? "mobile-active" : ""}`}>
                    <a href="/appointments">Appointments</a>
                    <a href="/services-by-professionals">Services by Professionals</a>
                  </div>
                </div>

                {/* About Us */}
                <a href="/about" className="nav-item">
                  About Us
                </a>

                {/* Login Register Buttons */}
                <div className="auth-buttons">
                  <a href="/login" className="login-btn">
                    Login
                  </a>
                  <a href="/register" className="register-btn">
                    Register
                  </a>
                </div>
              </div>

              {/* Hamburger Menu */}
              <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
