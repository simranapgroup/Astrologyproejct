"use client"

import { useEffect, useState, useRef } from "react"
import { getAllAstrologers, getWalletBalance } from "../assets/signup"
import { getProfile } from "../assets/signup"

import "../css/Live.css"

const SOCKET_URL = "http://localhost:3000"

export default function Live() {
  const [astrologers, setAstrologers] = useState([])
  const [liveAstrologers, setLiveAstrologers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [joinedChannel, setJoinedChannel] = useState(null)
  const [currentAstrologer, setCurrentAstrologer] = useState(null)
  const [watchingCount, setWatchingCount] = useState(0)
  const [liveChatMessages, setLiveChatMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [tipAmount, setTipAmount] = useState(50)
  const [tipSending, setTipSending] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0)

  const socketRef = useRef(null)
  const clientRef = useRef(null)
  const localVideoRef = useRef(null)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("token")
      if (!token) {
        setError("Please login to continue")
        setLoading(false)
        return
      }

      const profileResult = await getProfile()
      if (profileResult.success) {
        setUserProfile(profileResult.user || profileResult.data)
      }

      const walletResult = await getWalletBalance()
      if (walletResult.success) {
        setWalletBalance(walletResult.data.balance || 0)
      }

      await fetchAstrologers()

      //   await fetchLiveAstrologers()

      setLoading(false)
    } catch (err) {
      console.error("Error initializing app:", err)
      setError("Failed to initialize application")
      setLoading(false)
    }
  }

  const fetchAstrologers = async () => {
    try {
      console.log("Fetching all astrologers...")
      const result = await getAllAstrologers()

      if (result.success) {
        console.log("Fetched astrologers:", result.data)
        setAstrologers(result.data)
      } else {
        console.error("Failed to fetch astrologers:", result.message)
        setError(result.message)
      }
    } catch (err) {
      console.error("Error fetching astrologers:", err)
      setError("Failed to fetch astrologers")
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !joinedChannel || !socketRef.current) return

    const fullName = userProfile?.fullName || localStorage.getItem("fullName") || "User"

    socketRef.current.emit("liveChatMessage", {
      channelName: joinedChannel,
      userId: localStorage.getItem("userId"),
      fullName: fullName,
      message: messageInput.trim(),
    })

    setMessageInput("")
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating || 0)
    const hasHalfStar = (rating || 0) % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star">
          ☆
        </span>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating || 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star">
          ☆
        </span>,
      )
    }

    return stars
  }

  const formatPrice = (price) => {
    return price ? `₹ ${price}` : "Price not available"
  }

  const formatExperience = (exp) => {
    return exp ? `${exp} Years` : "Experience not specified"
  }

//   const formatOrders = (orders) => {
//     return orders ? `${orders} orders` : "No orders yet"
//   }

  const handleStartCall = (astrologer) => {
    console.log("Starting call with:", astrologer.fullName, "Rate:", astrologer.ratePerMinuteCall)
    // Add your call logic here
  }

  const handleStartChat = (astrologer) => {
    console.log("Starting chat with:", astrologer.fullName, "Rate:", astrologer.ratePerMinuteChat)
    // Add your chat logic here
  }

  const handleStartVideo = (astrologer) => {
    console.log("Starting video with:", astrologer.fullName, "Rate:", astrologer.ratePerMinuteVideo)
    // Add your video logic here
  }

  if (loading) {
    return (
      <div className="astrologer-container">
        {/* <div className="loading">
          <h3>Loading astrologers...</h3>
          <p>Please wait while we fetch the latest data</p>
        </div> */}
      </div>
    )
  }

  if (error) {
    return (
      <div className="astrologer-container">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={initializeApp} className="call-button" style={{ marginTop: "10px" }}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="astrologer-container">
      {!joinedChannel ? (
        <>
          <div className="astrologer-header">
            <h1>Connect with Expert Astrologers</h1>
            <p>Get personalized guidance from certified astrology experts</p>
            {userProfile && (
              <div style={{ marginTop: "10px", color: "#6c757d" }}>
                Welcome, {userProfile.fullName} | Wallet Balance: ₹{walletBalance}
              </div>
            )}
          </div>

          {liveAstrologers.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>🔴 Live Now</h2>
              <div className="astrologer-grid">
                {liveAstrologers.map((astrologer) => (
                  <div key={astrologer._id} className="astrologer-card">
                    <div className="astrologer-card-header">
                      <img
                        src={astrologer.profilePic || "/placeholder.svg?height=60&width=60"}
                        alt={astrologer.fullName || "Astrologer"}
                        className="astrologer-avatar"
                      />
                      <div className="astrologer-info">
                        <h3 className="astrologer-name">{astrologer.fullName || "Name not available"}</h3>
                     <p className="astrologer-specialization">
  <strong>Expertise:</strong> {astrologer.specialization || astrologer.expertise || "Specialization not specified"}
</p>

                        <p className="astrologer-languages">  <strong>Languages:</strong> 
                          {astrologer.languages || astrologer.language || "Languages not specified"}
                        </p>
                      </div>
                      <div className="online-indicator"></div>
                    </div>

                    <div className="astrologer-stats">
                      <div className="rating-section">
                        <div className="stars">{renderStars(astrologer.
ratings

)}</div>
                        <span className="experience">Exp: {formatExperience(astrologer.experience)}</span>
                      </div>
                      {/* <div className="orders-count">{formatOrders(astrologer.orders || astrologer.totalOrders)}</div> */}
                    </div>

                    <div className="pricing-section">
                      <div className="price">
                        <span className="current-price">
                          {formatPrice(astrologer.ratePerMinuteCall || astrologer.price)}
                        </span>
                        {astrologer.originalPrice && astrologer.originalPrice > astrologer.currentPrice && (
                          <span className="original-price">{formatPrice(astrologer.originalPrice)}</span>
                        )}
                        <span className="per-minute">/min</span>
                      </div>
                      {/* <button
                        className="call-button"
                        onClick={() => handleJoinLiveStream(astrologer.liveChannelName, astrologer)}
                        style={{ background: "linear-gradient(135deg, #dc3545, #c82333)" }}
                      >
                        Join Live
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {astrologers.length === 0 ? (
            <div className="no-astrologers">
              <h3>No astrologers available</h3>
              <p>Please check back later or try refreshing the page</p>
              <button onClick={fetchAstrologers} className="call-button" style={{ marginTop: "10px" }}>
                Refresh
              </button>
            </div>
          ) : (
            <>
              {/* <h2 style={{ marginBottom: "20px" }}>All Astrologers</h2> */}
              <div className="astrologer-grid">
                {astrologers.map((astrologer) => (
                  <div key={astrologer._id} className="astrologer-card">
                    <div className="astrologer-card-header">
                      <img
                        src={astrologer.profilePic || "/placeholder.svg?height=60&width=60"}
                        alt={astrologer.fullName || "Astrologer"}
                        className="astrologer-avatar"
                      />
                      <div className="astrologer-info">
                        <h3 className="astrologer-name">{astrologer.fullName || "Name not available"}</h3>
                      <p className="astrologer-specialization">
  <strong>Expertise:</strong> {astrologer.specialization || astrologer.expertise || "Specialization not specified"}
</p>

                        <p className="astrologer-languages">  <strong>Languages:</strong> 
                          {astrologer.languages || astrologer.language || "Languages not specified"}
                        </p>
                      </div>
                      {astrologer.isOnline && <div className="online-indicator"></div>}
                    </div>

                    <div className="astrologer-stats">
                      <div className="rating-section">
                        <div className="stars">{renderStars(astrologer.
ratings

)}</div>
{/* <span className="rating-text">({astrologer.ratings })</span> */}
                        <span className="experience">Exp: {formatExperience(astrologer.experience)}</span>
                      </div>
                      {/* <div className="orders-count">{formatOrders(astrologer.orders || astrologer.totalOrders)}</div> */}
                    </div>

                    <div className="pricing-section">
                      {/* <div className="price">
                        <span className="current-price">{formatPrice(astrologer.ratePerMinuteCall)}</span>
                        <span className="per-minute">/min</span>
                      </div> */}
                      <div className="action-buttons">
                      <button className="action-btn call-btn">
  <div className="btn-content">
    <span>Call</span>
    <span className="btn-rate"> ₹{astrologer.ratePerMinuteCall}/min</span>
  </div>
</button>
                      <button className="action-btn call-btn">
  <div className="btn-content">
    <span>Chat </span>
    <span className="btn-rate"> ₹ {astrologer.ratePerMinuteChat
}/min</span>
  </div>
</button>
                      <button className="action-btn call-btn">
  <div className="btn-content">
    <span>Video </span>
    <span className="btn-rate"> ₹ {astrologer.ratePerMinuteVideo
}/min</span>
  </div>
</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="live-stream-section">
          <div className="live-stream-header">
            <h2 className="live-stream-title">Live Session: {currentAstrologer?.fullName || joinedChannel}</h2>
            <span className="live-indicator">● LIVE</span>
          </div>

          <div ref={localVideoRef} className="video-container" />

          <div className="watching-count">
            <span>👥 {watchingCount} people watching</span>
          </div>

          <div className="chat-container">
            {liveChatMessages.length === 0 ? (
              <p style={{ color: "#999", textAlign: "center" }}>No messages yet. Start the conversation!</p>
            ) : (
              liveChatMessages.map((msg, idx) => (
                <div key={idx} className="chat-message">
                  <div className="chat-sender">{msg.fullName}</div>
                  <div className="chat-text">{msg.message}</div>
                  <div className="chat-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                </div>
              ))
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="chat-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage()
              }}
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>

          <div className="tip-section">
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(Number.parseInt(e.target.value) || 0)}
              placeholder="Enter tip amount"
              className="tip-input"
              min="1"
            />
            {/* <button onClick={handleSendTip} disabled={tipSending || tipAmount <= 0} className="tip-button">
              {tipSending ? "Sending..." : `Send Tip ₹${tipAmount}`}
            </button> */}
            <span style={{ marginLeft: "10px", fontSize: "0.9rem", color: "#6c757d" }}>Balance: ₹{walletBalance}</span>
          </div>
          {/* 
          <button onClick={handleLeaveLiveStream} className="leave-button">
            Leave Live Stream
          </button> */}
        </div>
      )}
    </div>
  )
}
