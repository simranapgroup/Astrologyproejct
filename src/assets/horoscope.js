// horoscopeAPI.js - API service for fetching horoscope data

const RAPIDAPI_KEY = "960308b39bmsh6bcd7f2cf205b2ep176578jsn67be34a1504c"
const RAPIDAPI_HOST = "astropredict-daily-horoscopes-lucky-insights.p.rapidapi.com"
const API_BASE_URL = "https://astropredict-daily-horoscopes-lucky-insights.p.rapidapi.com/horoscope"

export const fetchHoroscopeData = async ({ zodiac, type, lang }) => {
  try {
    if (!zodiac || !type || !lang) {
      throw new Error("Missing required parameters: zodiac, type, and lang are required")
    }

    const queryParams = new URLSearchParams({
      zodiac,
      type,
      lang,
      timezone: "Asia/Kolkata",
    })

    const url = `${API_BASE_URL}?${queryParams}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      data,
      error: null,
    }
  } catch (error) {
    console.error("Error fetching horoscope:", error)

    return {
      success: false,
      data: null,
      error: {
        message: error.message || "Failed to fetch horoscope",
        type: "API_ERROR",
      },
    }
  }
}

// Alternative fetch function for direct API calls from React component
export const getHoroscope = async (zodiac, type, lang) => {
  try {
    const result = await fetchHoroscopeData({ zodiac, type, lang })

    if (result.success) {
      return result.data
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    throw error
  }
}

// Utility function to validate zodiac signs
export const isValidZodiacSign = (sign) => {
  const validSigns = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ]
  return validSigns.includes(sign.toLowerCase())
}

// Utility function to validate horoscope types
export const isValidHoroscopeType = (type) => {
  const validTypes = ["daily", "weekly", "monthly", "yearly"]
  return validTypes.includes(type.toLowerCase())
}

// Utility function to validate language codes
export const isValidLanguageCode = (lang) => {
  const validLanguages = [
    "hi",
    "en",
    "ar",
    "be",
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "es",
    "et",
    "fa",
    "fi",
    "fr",
    "he",
    "hu",
    "hr",
    "id",
    "it",
    "ja",
    "ko",
    "lt",
    "lv",
    "ms",
    "no",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sr",
    "sv",
    "th",
    "tl",
    "tr",
    "uk",
    "vi",
    "zh-rCN",
    "zh-rTW",
  ]
  return validLanguages.includes(lang)
}

// Get zodiac sign emoji
export const getZodiacEmoji = (sign) => {
  const emojiMap = {
    aries: "♈",
    taurus: "♉",
    gemini: "♊",
    cancer: "♋",
    leo: "♌",
    virgo: "♍",
    libra: "♎",
    scorpio: "♏",
    sagittarius: "♐",
    capricorn: "♑",
    aquarius: "♒",
    pisces: "♓",
  }
  return emojiMap[sign.toLowerCase()] || "⭐"
}

// Error handling utility
export const handleHoroscopeError = (error) => {
  if (error.message.includes("HTTP error! status: 429")) {
    return {
      type: "RATE_LIMIT",
      message: "Too many requests. Please try again later.",
      retryAfter: 60000, // 1 minute
    }
  }

  if (error.message.includes("HTTP error! status: 401")) {
    return {
      type: "UNAUTHORIZED",
      message: "API key is invalid or expired.",
      retryAfter: null,
    }
  }

  if (error.message.includes("HTTP error! status: 404")) {
    return {
      type: "NOT_FOUND",
      message: "Horoscope data not found for the requested parameters.",
      retryAfter: null,
    }
  }

  if (error.message.includes("Failed to fetch")) {
    return {
      type: "NETWORK_ERROR",
      message: "Network error. Please check your internet connection.",
      retryAfter: 5000, // 5 seconds
    }
  }

  return {
    type: "UNKNOWN_ERROR",
    message: error.message || "An unknown error occurred.",
    retryAfter: null,
  }
}

// Retry mechanism for failed requests
export const fetchHoroscopeWithRetry = async ({ zodiac, type, lang }, maxRetries = 3, delay = 1000) => {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fetchHoroscopeData({ zodiac, type, lang })

      if (result.success) {
        return result
      }

      lastError = result.error

      // Don't retry on certain error types
      const errorInfo = handleHoroscopeError(new Error(result.error.message))
      if (errorInfo.type === "UNAUTHORIZED" || errorInfo.type === "NOT_FOUND") {
        break
      }

      // Wait before retrying
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay * attempt))
      }
    } catch (error) {
      lastError = { message: error.message, type: "NETWORK_ERROR" }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay * attempt))
      }
    }
  }

  return {
    success: false,
    data: null,
    error: lastError,
  }
}
