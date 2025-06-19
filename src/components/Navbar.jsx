"use client"

import { useState, useEffect } from "react"
import { User, LogOut, Settings, ChevronDown, X } from "lucide-react"
import "../css/Navbar.css"
import flogo from "../Images/flogo.png"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const toggleDropdown = (dropdown) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === dropdown ? "" : dropdown)
    }
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
    setActiveDropdown("")
    setShowProfileDropdown(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    setUser(null)
    setShowProfileDropdown(false)
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
    setActiveDropdown("")
    setShowProfileDropdown(false)
  }

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

 const handleLoginOption = (userType) => {
  console.log(`Login as ${userType}`);
  
  setShowProfileDropdown(false);
  closeMobileMenu();

  if (userType === "User") {
    navigate("/signup"); 
  } else if (userType === "Astrologer") {
    navigate("/astrologer-login"); 
  }
};


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="grid-12">
          <div className="grid-12">
            <div className="navbar-content">
              <div className="logo">
                <img src={flogo || "/placeholder.svg"} alt="Astro Logo" />
              </div>

              <div className={`nav-items ${isOpen ? "active" : ""}`}>
                <button className="mobile-close-btn" onClick={closeMobileMenu}>
                  <X size={24} />
                </button>

                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-item${isActive ? " active-link" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/second"
                  className={({ isActive }) => `nav-item${isActive ? " active-link" : ""}`}
                  onClick={closeMobileMenu}
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/Foundation"
                  className={({ isActive }) => `nav-item${isActive ? " active-link" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Free Calculators
                </NavLink>

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
                    <a href="/video-call" onClick={closeMobileMenu}>
                      Chat
                    </a>
                    <a href="/Chat" onClick={closeMobileMenu}>
                      Video Call
                    </a>
                    <a href="/audio-call" onClick={closeMobileMenu}>
                      Audio Call
                    </a>
                    <a href="/E-Pooja" onClick={closeMobileMenu}>
                      E-Pooja
                    </a>
                  </div>
                </div>

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
                    <a href="/appointments" onClick={closeMobileMenu}>
                      Appointments
                    </a>
                    <a href="/services-by-professionals" onClick={closeMobileMenu}>
                      Services by Professionals
                    </a>
                  </div>
                </div>

                <NavLink
                  to="/horoscope"
                  className={({ isActive }) => `nav-item${isActive ? " active-link" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Horoscope
                </NavLink>

                {/* Profile Section - Always visible */}
                <div className="profile-section">
                  {isLoggedIn ? (
                    <div className="profile-dropdown">
                      <button className="profile-btn" onClick={handleProfileClick}>
                        <div className="profile-avatar">
                          <User size={20} />
                        </div>
                        <span className="profile-name">{user?.name}</span>
                        <ChevronDown size={16} className={`profile-arrow ${showProfileDropdown ? "rotated" : ""}`} />
                      </button>

                      <div className={`profile-dropdown-content ${showProfileDropdown ? "active" : ""}`}>
                        <div className="profile-info">
                          <div className="profile-avatar-large">
                            <User size={24} />
                          </div>
                          <div className="profile-details">
                            <span className="profile-name-large">{user?.name}</span>
                            <span className="profile-email">{user?.email}</span>
                          </div>
                        </div>
                        <div className="profile-divider"></div>
                        <a href="/profile" className="profile-menu-item" onClick={closeMobileMenu}>
                          <Settings size={16} />
                          Settings
                        </a>
                        <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-dropdown">
                      <button className="profile-btn profile-login-btn" onClick={handleProfileClick}>
                        <div className="profile-avatar">
                          <User size={20} />
                        </div>
                        <ChevronDown size={16} className={`profile-arrow ${showProfileDropdown ? "rotated" : ""}`} />
                      </button>

                      <div className={`profile-dropdown-content login-dropdown ${showProfileDropdown ? "active" : ""}`}>
                        <div className="login-options">
                          <button className="login-option-btn user-login" onClick={() => handleLoginOption("User")}>
                            <User size={16} />
                            Login as User
                          </button>
                          <button
                            className="login-option-btn astrologer-login"
                            onClick={() => handleLoginOption("Astrologer")}
                          >
                            <Settings size={16} />
                            Login as Astrologer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
    </nav>
  )
}

export default Navbar
