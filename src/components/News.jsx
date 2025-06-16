"use client"

import { useState, useEffect } from "react"
import "../css/News.css"

const News = () => {
  // news posts data
  const newsPosts = [
    {
      id: 1,
      title: "6666 Angel Number Meaning: Love, Twin Flame & Career",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 567,
      author: "Nabangi",
      date: "June 11, 2025",
      badge: "Astrotalk",
      overlayTitle: "6666 Angel Number",
      overlayText: "Angels have a message for you!",
    },
    {
      id: 2,
      title: "Saturn in 10th House: Path to Career Success and Recognition",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 654,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Saturn",
      overlayText: "in 10th House",
    },
    {
      id: 3,
      title: "Mars in 7th House: Guide to Love, Marriage & Relationships",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 876,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Mars",
      overlayText: "in 7th House",
    },
    {
      id: 4,
      title: "Venus in 8th House: Transformation in Love & Finance",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 432,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Venus",
      overlayText: "in 8th House",
    },
    {
      id: 5,
      title: "Mercury in 3rd House: Communication & Intellectual Gifts",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 789,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Mercury",
      overlayText: "in 3rd House",
    },
    {
      id: 6,
      title: "Jupiter in 5th House: Luck, Creativity & Children",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 621,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Jupiter",
      overlayText: "in 5th House",
    },
    {
      id: 7,
      title: "Pluto in 12th House: Transformation & Hidden Power",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 543,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Pluto",
      overlayText: "in 12th House",
    },
    {
      id: 8,
      title: "Neptune in 9th House: Spirituality & Higher Learning",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e35d3ae-ed67-41d2-a808-2b8d1b3cbb03-9xQd0j5pOMhmASa4WBH5WGlvlESkH6.png",
      views: 487,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Neptune",
      overlayText: "in 9th House",
    },
  ]

  // State for current page and cards per page
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(4)

  // Update cards per page based on screen size
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 480) {
        setCardsPerPage(1) // Mobile: 1 card
      } else if (window.innerWidth <= 768) {
        setCardsPerPage(2) // Tablet: 2 cards
      } else if (window.innerWidth <= 1024) {
        setCardsPerPage(3) // Small desktop: 3 cards
      } else {
        setCardsPerPage(4) // Large desktop: 4 cards
      }
      setCurrentPage(0) // Reset to first page when screen size changes
    }

    updateCardsPerPage()
    window.addEventListener("resize", updateCardsPerPage)
    return () => window.removeEventListener("resize", updateCardsPerPage)
  }, [])

  const totalPages = Math.ceil(newsPosts.length / cardsPerPage)

  // Navigation handlers
  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Get current page's posts
  const getCurrentPosts = () => {
    const startIndex = currentPage * cardsPerPage
    return newsPosts.slice(startIndex, startIndex + cardsPerPage)
  }

  return (
    <div className="news-section">
      <div className="container">
        <div className="news-header">
          <h2>AstroTalk in AP</h2>
        </div>

        <div className="news-carousel-container">
          {/* Left Arrow */}
          <button className="carousel-arrow prev-arrow" onClick={handlePrev} aria-label="Previous slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* News Cards */}
          <div className="news-carousel">
            <div className="news-cards-wrapper">
              {getCurrentPosts().map((post) => (
                <div className="news-card" key={post.id}>
                  <div className="news-card-image">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} />

                    {/* View count */}
                    <div className="view-count">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>{post.views}</span>
                    </div>

                    {/* Overlay content */}
                    <div className="overlay">
                      {post.badge && (
                        <div className="badge">
                          <div className="badge-icon">✨</div>
                          <span>{post.badge}</span>
                        </div>
                      )}
                      <h3 className="overlay-title">{post.overlayTitle}</h3>
                      <p className="overlay-text">{post.overlayText}</p>
                    </div>
                  </div>

                  <div className="news-card-content">
                    <h3 className="news-card-title">{post.title}</h3>
                    <div className="news-card-meta">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button className="carousel-arrow next-arrow" onClick={handleNext} aria-label="Next slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default News
