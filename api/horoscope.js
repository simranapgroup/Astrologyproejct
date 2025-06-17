export async function GET(request) {
  try {
    const body = await request.json()

    const lang = body.lang || "en"
    const zodiac = body.zodiac || "aries"
    const type = body.type || "daily"
    const timezone = "Asia/Kolkata"

    const apiUrl = "https://astrovaastupaay.com/horoscope-proxy.php"

    const queryParams = new URLSearchParams({
      lang: lang,
      zodiac: zodiac,
      type: type,
      timezone: timezone,
    })

    const response = await fetch(`${apiUrl}?${queryParams}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "astropredict-daily-horoscopes-lucky-insights.p.rapidapi.com",
        "x-rapidapi-key": "960308b39bmsh6bcd7f2cf205b2ep176578jsn67be34a1504c",
      },
    })

    if (!response.ok) {
      return Response.json(
        {
          error: true,
          message: "API request failed",
          http_code: response.status,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json(
      {
        error: true,
        message: "Server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
