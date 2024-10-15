import { NextResponse } from 'next/server';
// API Route for Fetching Airport Weather from AeroAPI
export const GET = async (request: 'Request', context: any) => {
    try {
        const { params } = context;
        const airportWeather = await fetch(`https://aeroapi.flightaware.com/aeroapi/airports/${params.airportID}/weather/observations?max_pages=1&temperature_units=f`, {
            headers: {
                "x-apikey": "key", 
            }
        });
        // Await response and parse it as JSON
        const data = await airportWeather.json();

        // No Date Returned
        if(data.length === 0)
            return NextResponse.json({message: `Failed to retrieve airport weather for ${params.airportID}.`, status: 500});
        else 
            return NextResponse.json({airportWeather: data, status: 200});
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to retrieve Aiport weather." }, { status: 500 });
    }
}