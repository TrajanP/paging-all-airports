import { NextResponse, NextRequest } from 'next/server';
// API Route for Fetching Airport Info from AeroAPI
export const GET = async (request: NextRequest, context: any) => {
  try {
      //We need to fetch the airport information from the public API
      const { params } = context;
      const airportInfo = await fetch(`https://aeroapi.flightaware.com/aeroapi/airports/${params.airportID}`, {
        headers: {
          "x-apikey": process.env.API_KEY
        }
      });
      //Await response and parse it as JSON
      const data = await airportInfo.json();
      // No Data Returned
      if(data.length == 0)
        return NextResponse.json({ message: "Failed to retrieve airport information for " +  params.airportID}, { status: 500 });
      else 
        return NextResponse.json({ airportInfo: data}, { status: 200 });
  } catch (error) {
      return NextResponse.json({error: "Failed to retrieve Airport's informations"}, { status: 500 });
  }
}
