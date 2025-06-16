"use client"

import { useState, useRef } from "react"
import "../css/Blog.css"

const Blog = () => {
  // Blog posts data with the astrology image
  const blogPosts = [
    {
      id: 1,
      title: "6666 Angel Number Meaning: Love, Twin Flame & Career",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
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
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%2016%2C%202025%2C%2002_15_02%20PM-tlkeeGG4lXX9IVmw9twEEeGiFt456Z.png",
      views: 487,
      author: "Nabangi",
      date: "June 11, 2025",
      overlayTitle: "Neptune",
      overlayText: "in 9th House",
    },
  ]

  // State for current page (desktop)
  const [currentPage, setCurrentPage] = useState(0)
  const scrollContainerRef = useRef(null)

  const cardsPerPage = 4
  const totalPages = Math.ceil(blogPosts.length / cardsPerPage)

  // Desktop navigation handlers
  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Get current page's posts for desktop
  const getCurrentPosts = () => {
    const startIndex = currentPage * cardsPerPage
    return blogPosts.slice(startIndex, startIndex + cardsPerPage)
  }

  // Mobile scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  return (
    <div className="blog-section">
      <div className="container">
        <div className="blog-header">
          <h2>Latest From Blog</h2>
          <p>Top Astrologers. 24 * 7 customer support. Happy to help</p>
        </div>

        <div className="blog-carousel-container">
          {/* Desktop Layout */}
          <div className="desktop-layout">
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

            {/* Desktop Blog Cards */}
            <div className="blog-carousel">
              <div className="blog-cards-wrapper">
                {getCurrentPosts().map((post) => (
                  <BlogCard key={post.id} post={post} />
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

          {/* Mobile Layout with Horizontal Scroll */}
          <div className="mobile-layout">
            <div className="mobile-container">
              <button className="mobile-arrow mobile-left-arrow" onClick={scrollLeft} aria-label="Scroll left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

              <div ref={scrollContainerRef} className="mobile-scroll-container">
                <div className="mobile-cards-wrapper">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="mobile-card-container">
                      <BlogCard post={post} isMobile={true} />
                    </div>
                  ))}
                </div>
              </div>

              <button className="mobile-arrow mobile-right-arrow" onClick={scrollRight} aria-label="Scroll right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
      </div>
    </div>
  )
}

// Blog Card Component
const BlogCard = ({ post, isMobile = false }) => {
  return (
    <div className={isMobile ? "mobile-blog-card" : "blog-card"}>
      <div className="blog-card-image">
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

      <div className="blog-card-content">
        <h3 className="blog-card-title">{post.title}</h3>
        <div className="blog-card-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  )
}

export default Blog
