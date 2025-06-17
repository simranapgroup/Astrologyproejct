"use client"

import { useState } from "react"
import "../css/horoscope.css"
import Navbar from "./Navbar"
import Footer from "./Footer"

const zodiacSigns = [
  { id: "aries", english: "Aries", hindi: "मेष", icon: "🐏", description: "March 21 - April 19" },
  { id: "taurus", english: "Taurus", hindi: "वृषभ", icon: "🐂", description: "April 20 - May 20" },
  { id: "gemini", english: "Gemini", hindi: "मिथुन", icon: "👫", description: "May 21 - June 20" },
  { id: "cancer", english: "Cancer", hindi: "कर्क", icon: "🦀", description: "June 21 - July 22" },
  { id: "leo", english: "Leo", hindi: "सिंह", icon: "🦁", description: "July 23 - August 22" },
  { id: "virgo", english: "Virgo", hindi: "कन्या", icon: "👸", description: "August 23 - September 22" },
  { id: "libra", english: "Libra", hindi: "तुला", icon: "⚖️", description: "September 23 - October 22" },
  { id: "scorpio", english: "Scorpio", hindi: "वृश्चिक", icon: "🦂", description: "October 23 - November 21" },
  { id: "sagittarius", english: "Sagittarius", hindi: "धनु", icon: "🏹", description: "November 22 - December 21" },
  { id: "capricorn", english: "Capricorn", hindi: "मकर", icon: "🐐", description: "December 22 - January 19" },
  { id: "aquarius", english: "Aquarius", hindi: "कुंभ", icon: "🏺", description: "January 20 - February 18" },
  { id: "pisces", english: "Pisces", hindi: "मीन", icon: "🐟", description: "February 19 - March 20" },
]

export default function HoroscopeSection() {
  const [selectedLanguage, setSelectedLanguage] = useState("hindi")
  const [selectedSign, setSelectedSign] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState("daily")
  const [horoscopeData, setHoroscopeData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSignClick = async (signId) => {
    if (selectedSign === signId) {
      setSelectedSign(null)
      setHoroscopeData(null)
      return
    }

    setSelectedSign(signId)
    await fetchHoroscope(signId, selectedPeriod)
  }

  const fetchHoroscope = async (zodiac, type) => {
    setLoading(true)

    try {
      const apiLang = selectedLanguage === "hindi" ? "hi" : "en"

      const response = await fetch("https://astrovaastupaay.com/horoscope-proxy.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: apiLang,
          zodiac: zodiac,
          type: type,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setHoroscopeData({ error: true, message: data.message })
      } else {
        setHoroscopeData(data)
      }
    } catch (error) {
      setHoroscopeData({ error: true, message: "Failed to fetch horoscope" })
    } finally {
      setLoading(false)
    }
  }

  const handlePeriodClick = async (period) => {
    if (!selectedSign) return
    setSelectedPeriod(period)
    await fetchHoroscope(selectedSign, period)
  }

  const selectedSignData = zodiacSigns.find((sign) => sign.id === selectedSign)

  const getDisplayTitle = (sign) => {
    switch (selectedLanguage) {
      case "english":
        return sign.english
      case "hindi":
        return `${sign.hindi} (${sign.english})`
      case "both":
        return `${sign.english} - ${sign.hindi}`
      default:
        return `${sign.hindi} (${sign.english})`
    }
  }

  return (
    <>
    <Navbar/> 
    <div className="horoscope-container">
      <div className="content-wrapper">
        <div className="hor-section">
          <div className="decorative-line">
            <div className="line"></div>
            <div className="star-icon">✨</div>
            <div className="line"></div>
          </div>

          <h1 className="main-title">Horoscope Forecasts</h1>

          <p className="subtitle">
            Select your zodiac sign to see predictions in Hindi & English. Now supporting daily, weekly, monthly &
            yearly horoscopes.
          </p>

          <div className="language-selector">
            <div className="select-wrapper">
              <select
                className="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="english">English</option>
                <option value="both">Both Languages</option>
              </select>
            </div>
          </div>
        </div>

        <div className="zodiac-grid">
          {zodiacSigns.map((sign) => (
            <div
              key={sign.id}
              className={`zodiac-card ${selectedSign === sign.id ? "selected" : ""}`}
              onClick={() => handleSignClick(sign.id)}
            >
              <div className="zodiac-icon">{sign.icon}</div>

              <div className="zodiac-names">
                {selectedLanguage === "english" && <h3 className="english-name">{sign.english}</h3>}
                {selectedLanguage === "hindi" && <h3 className="english-name">{sign.hindi}</h3>}
                {selectedLanguage === "both" && (
                  <>
                    <h3 className="english-name">{sign.english}</h3>
                    <p className="hindi-name">{sign.hindi}</p>
                  </>
                )}
                <p className="zodiac-dates">{sign.description}</p>
              </div>

              {selectedSign === sign.id && <div className="selection-indicator"></div>}
            </div>
          ))}
        </div>

        {selectedSign && selectedSignData && (
          <div className="selected-details">
            <div className="details-card">
              <div className="details-icon">{selectedSignData.icon}</div>

              <h2 className="details-title">{getDisplayTitle(selectedSignData)}</h2>

              <p className="details-description">{selectedSignData.description}</p>

              {horoscopeData && !horoscopeData.error && (
                <div className="horoscope-content">
                  {loading ? (
                    <div style={{ textAlign: "center" }}>
                      <div className="loading-spinner"></div>
                      <p>Loading horoscope...</p>
                    </div>
                  ) : (
                    <div className="horoscope-text">
                      {horoscopeData.horoscope || horoscopeData.prediction || "Horoscope data not available"}
                    </div>
                  )}
                </div>
              )}

              {horoscopeData && horoscopeData.error && (
                <div className="horoscope-content">
                  <p style={{ color: "#d32f2f" }}>Error: {horoscopeData.message}</p>
                </div>
              )}

              <div className="period-buttons">
                {["daily", "weekly", "monthly", "yearly"].map((period) => (
                  <button
                    key={period}
                    className={`period-button ${selectedPeriod === period ? "active" : ""}`}
                    onClick={() => handlePeriodClick(period)}
                    disabled={loading}
                  >
                    {loading && selectedPeriod === period ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      period.charAt(0).toUpperCase() + period.slice(1)
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  )
}
