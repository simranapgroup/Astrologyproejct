"use client"

import { useState, useEffect } from "react"
import '../css/horoscope.css'
import { getZodiacEmoji, handleHoroscopeError, fetchHoroscopeWithRetry } from '../assets/horoscope.js'
import Footer from "./Footer.jsx"
import Navbar from "./Navbar.jsx"

export default function HoroscopePage() {
  const [signs] = useState([
    { id: "aries", en: "Aries", hi: "मेष" },
    { id: "taurus", en: "Taurus", hi: "वृषभ" },
    { id: "gemini", en: "Gemini", hi: "मिथुन" },
    { id: "cancer", en: "Cancer", hi: "कर्क" },
    { id: "leo", en: "Leo", hi: "सिंह" },
    { id: "virgo", en: "Virgo", hi: "कन्या" },
    { id: "libra", en: "Libra", hi: "तुला" },
    { id: "scorpio", en: "Scorpio", hi: "वृश्चिक" },
    { id: "sagittarius", en: "Sagittarius", hi: "धनु" },
    { id: "capricorn", en: "Capricorn", hi: "मकर" },
    { id: "aquarius", en: "Aquarius", hi: "कुंभ" },
    { id: "pisces", en: "Pisces", hi: "मीन" },
  ])

  const [selectedSign, setSelectedSign] = useState("")
  const [selectedLang, setSelectedLang] = useState("hi")
  const [currentType, setCurrentType] = useState("daily")
  const [horoscopeContent, setHoroscopeContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const languages = [
    { value: "hi", label: "Hindi" },
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
    { value: "be", label: "Belarusian" },
    { value: "bg", label: "Bulgarian" },
    { value: "cs", label: "Czech" },
    { value: "da", label: "Danish" },
    { value: "de", label: "German" },
    { value: "el", label: "Greek" },
    { value: "es", label: "Spanish" },
    { value: "et", label: "Estonian" },
    { value: "fa", label: "Persian" },
    { value: "fi", label: "Finnish" },
    { value: "fr", label: "French" },
    { value: "he", label: "Hebrew" },
    { value: "hu", label: "Hungarian" },
    { value: "hr", label: "Croatian" },
    { value: "id", label: "Indonesian" },
    { value: "it", label: "Italian" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "lt", label: "Lithuanian" },
    { value: "lv", label: "Latvian" },
    { value: "ms", label: "Malay" },
    { value: "no", label: "Norwegian" },
    { value: "nl", label: "Dutch" },
    { value: "pl", label: "Polish" },
    { value: "pt", label: "Portuguese" },
    { value: "ro", label: "Romanian" },
    { value: "ru", label: "Russian" },
    { value: "sk", label: "Slovak" },
    { value: "sl", label: "Slovenian" },
    { value: "sr", label: "Serbian" },
    { value: "sv", label: "Swedish" },
    { value: "th", label: "Thai" },
    { value: "tl", label: "Tagalog" },
    { value: "tr", label: "Turkish" },
    { value: "uk", label: "Ukrainian" },
    { value: "vi", label: "Vietnamese" },
    { value: "zh-rCN", label: "Chinese (Simplified)" },
    { value: "zh-rTW", label: "Chinese (Traditional)" },
  ]

  const fetchHoroscope = async (type) => {
    if (!selectedSign) return

    setIsLoading(true)
    setHoroscopeContent(`Loading ${type} horoscope for ${selectedSign}...`)

    try {
     
      const result = await fetchHoroscopeWithRetry(
        {
          zodiac: selectedSign,
          type: type,
          lang: selectedLang,
        },
        3,
        
        1000,
      )

      if (result.success && result.data) {
       
        const horoscopeText =
          result.data.horoscope || result.data.prediction || result.data.text || "Horoscope data received successfully."
        setHoroscopeContent(horoscopeText)
      } else {
      
        const errorInfo = handleHoroscopeError(new Error(result.error?.message || "Unknown error"))
        setHoroscopeContent(`Error: ${errorInfo.message}`)
      }
    } catch (error) {
      console.error("Error fetching horoscope:", error)
      const errorInfo = handleHoroscopeError(error)
      setHoroscopeContent(`Error: ${errorInfo.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignClick = (signId) => {
    setSelectedSign(signId)
    setCurrentType("daily")
    setIsModalOpen(true)
    setHoroscopeContent("Select a category to view horoscope.")
  }

  const handleTypeClick = (type) => {
    setCurrentType(type)
  }

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSign("")
    setHoroscopeContent("")
  }

  useEffect(() => {
    if (selectedSign && currentType) {
      fetchHoroscope(currentType)
    }
  }, [selectedSign, currentType, selectedLang])

  const getZodiacIcon = (signId) => {
    return getZodiacEmoji(signId)
  }

  const getCurrentLanguageLabel = () => {
    const currentLang = languages.find((lang) => lang.value === selectedLang)
    return currentLang ? currentLang.label : "Hindi"
  }

  return (
    <>
    <Navbar/>
    <div className="astro-main-wrapper">
     
      {isLoading && (
        <div className="cosmic-loader-overlay">
          <div className="cosmic-spinner-ring"></div>
        </div>
      )}

    
      <div className="horoscope-container">
        {/* <Navbar/> */}
  
        <div className="horoscope-header">
          <h1 className="main-title">Horoscope Forecasts</h1>
          <div className="decorative-stars">✨</div>
        </div>

  
        <div className="language-dropdown-section">
          <select
            className="language-dropdown"
            value={selectedLang}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

      
        <div className="description-section">
          <p className="description-text">
            Select your zodiac sign to see predictions in Hindi & English. Now supporting daily, weekly, monthly &
            yearly horoscopes.
          </p>
        </div>

        
        <div className="zodiac-signs-grid">
          {signs.map((sign) => (
            <div key={sign.id} className="zodiac-card" onClick={() => handleSignClick(sign.id)}>
              <div className="zodiac-icon">
                <span className="zodiac-symbol">{getZodiacIcon(sign.id)}</span>
              </div>
              <h3 className="zodiac-name-en">{sign.en}</h3>
              <h4 className="zodiac-name-hi">{sign.hi}</h4>
            </div>
          ))}
        </div>
      </div>

    
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="horoscope-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSign.charAt(0).toUpperCase() + selectedSign.slice(1)} Details</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="horoscope-type-tabs">
              <button
                className={`type-tab ${currentType === "daily" ? "active" : ""}`}
                onClick={() => handleTypeClick("daily")}
              >
                Daily
              </button>
              <button
                className={`type-tab ${currentType === "weekly" ? "active" : ""}`}
                onClick={() => handleTypeClick("weekly")}
              >
                Weekly
              </button>
              <button
                className={`type-tab ${currentType === "monthly" ? "active" : ""}`}
                onClick={() => handleTypeClick("monthly")}
              >
                Monthly
              </button>
              <button
                className={`type-tab ${currentType === "yearly" ? "active" : ""}`}
                onClick={() => handleTypeClick("yearly")}
              >
                Yearly
              </button>
            </div>

            <div className="horoscope-content">
              {isLoading ? (
                <div className="loading-content">
                  <div className="mini-spinner"></div>
                  <p>Loading your cosmic insights...</p>
                </div>
              ) : (
                <div className="horoscope-text">{horoscopeContent}</div>
              )}
            </div>

            <div className="modal-footer">
              <div className="language-info">
                Current Language: <span>{getCurrentLanguageLabel()}</span>
              </div>
              {/* <button className="share-btn" onClick={() => alert("Share functionality coming soon!")}>
                Share Reading
              </button> */}
                <button className="share-btn" >
                Share Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  )
}
