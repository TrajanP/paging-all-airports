import { NextResponse, NextRequest } from 'next/server';
// API Route for Fetching Airport Departures from AeroAPI
// Both Past and Future
export const GET = async (request: NextRequest, context: any) => {
    try {
        const { params } = context;

        // Calculate Start Time
        const startTime = new Date();
        startTime.setHours(startTime.getHours() - 1); // Subtract 1 hour
        startTime.setMilliseconds(0); // Set milliseconds to 0 
        // Convert to ISO 8601 format with milliseconds as 000
        const isoTimeStart = startTime.toISOString().split('.')[0] + 'Z';

        // Calculate End Time
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 1); // Add 1 hour
        endTime.setMilliseconds(0);
        const isoTimeEnd = endTime.toISOString().split('.')[0] + 'Z';

        // Calculate Current Time
        const currTime = new Date();
        currTime.setHours(currTime.getHours());
        currTime.setMilliseconds(0);
        const isoTimeCurr = currTime.toISOString().split('.')[0] + 'Z';

        // Get Past Departures from Airport
        const pastDeparturesInfo = await fetch(`https://aeroapi.flightaware.com/aeroapi/airports/${params.airportID}/flights/departures?start=${isoTimeStart}&end=${isoTimeCurr}&max_pages=1`, {
            headers: {
                "x-apikey": process.env.API_KEY
            }
        });

        const dataPast = await pastDeparturesInfo.json();

        // Get Future Departures from Airport
        const scheduledDeparturesInfo = await fetch(`https://aeroapi.flightaware.com/aeroapi/airports/${params.airportID}/flights/scheduled_departures?start=${isoTimeCurr}&end=${isoTimeEnd}&max_pages=1`, {
            headers: {
                "x-apikey": process.env.API_KEY
            }
        });

        const dataScheduled = await scheduledDeparturesInfo.json();

        // Check if data sets are empty
        if((!dataPast.departures || dataPast.departures.length === 0) || (!dataScheduled.scheduled_departures || dataScheduled.scheduled_departures.length === 0))
            return NextResponse.json({ message: "Failed to retrieve Departures Flight Information for  " + params.airportID, dataPast: dataPast, dataSched: dataScheduled }, { status: 501 });

        // Combine the two datasets
        const allDepartures = [...(dataPast.departures || []), ...(dataScheduled.scheduled_departures || [])];
        return NextResponse.json({ departureInfo: allDepartures, isoStartTime: isoTimeStart, isoCurrTime: isoTimeCurr, isoEndTime: isoTimeEnd, message: "Start Time " + isoTimeStart + " End Time " + isoTimeEnd }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to retrieve Flight Information" }, { status: 500 });
    }
}
