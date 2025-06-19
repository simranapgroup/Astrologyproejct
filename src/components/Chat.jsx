"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../css/Chat.css"

const Chat = () => {
  const [astrologers, setAstrologers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/admin/astrologers")
        setAstrologers(data)
      } catch (error) {
        console.error("Error fetching astrologers:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAstrologers()
  }, [])

  const Stars = ({ rating }) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  )

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="container">
      {astrologers.map((astro) => (
        <div key={astro._id} className="card">
          {astro.isVerified && <div className="badge">✓</div>}
          <img src={astro.profilePic || "/placeholder.svg"} alt={astro.fullName} className="avatar" />

          <div className="details">
            <h3 className="name">{astro.fullName}</h3>
            <p className="expertise">{Array.isArray(astro.expertise) ? astro.expertise.join(", ") : astro.expertise}</p>
            <p className="lang-exp">
              {Array.isArray(astro.languages) ? astro.languages.join(", ") : astro.languages} &nbsp;|&nbsp; Exp:{" "}
              {astro.experience} Years
            </p>

            <div className="rating-orders">
              <Stars rating={astro.averageRating || 4} />
              <span className="orders">{Math.floor(Math.random() * 20000)} orders</span>
            </div>

            <div className="actions">
              <button className="btn call">
                Call
                <br />₹{astro.ratePerMinuteCall}/min
              </button>
              <button className="btn video">
                Video
                <br />₹{astro.ratePerMinuteVideo}/min
              </button>
              <button className="btn chat">
                Chat
                <br />₹{astro.ratePerMinuteChat}/min
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chat
