export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const registration = searchParams.get("registration")

  if (!registration) {
    return new Response(JSON.stringify({ error: "Missing registration" }), {
      status: 400,
    })
  }

  const res = await fetch(
    `https://aerodatabox.p.rapidapi.com/aircrafts/reg/${registration}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.AERODATABOX_API_KEY,
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    }
  )

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}
