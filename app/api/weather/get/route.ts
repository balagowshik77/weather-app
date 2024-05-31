import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_WEATHER_API_KEY}&q=${location}&days=5&aqi=yes&alerts=yes`);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) { // TypeScript type for error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
