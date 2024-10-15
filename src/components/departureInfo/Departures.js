'using client'
// Styling Imports
import css from '../../css/schedule.module.css';
import { FaInfoCircle } from "react-icons/fa";
// Component Imports
import FlightRowDepartures from './FlightRowDepartures';
import DeparturesModal from './DeparturesModal';
// React Imports
import { useContext, useState, useEffect } from 'react'; 
import MyContext from '@/app/context/MyContext';

// This component is used to retrieve and render Departures for the provided airport.
// Both Past and Future Departures will be displayed
const Departures = () => {

    // Component State
    const [departures, setDepartures] = useState([]);
    const { airport, setAirport } = useContext(MyContext);
    const [show, setShow] = useState(false);

    // Cut Off times for window of retrieval, used for filtering unwanted flights
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    // Get an Airport's departures from API
    const getDepartures = async () => {
        const response = await fetch(`api/airportDepartures/${airport.code}`);
        const data = await response.json();
        // console.log("Departures Message: " + data.message + " Past Response " + data.dataPast + " Sched Response " + data.dataSched);
        // console.log(JSON.stringify(data, null, 2)); // Logs the entire object with indentation
        // Request Successful?
        if(data.departureInfo?.length > 0)
        {
            // We don't want flight that don't have identification number, usually implies bad data
            const array = data.departureInfo.filter(flight => flight.ident_iata !== null && flight.ident_iata !== "");

            //Filter thru departures and update the most recent time for departure
            array.map((flight, index) => {
                if (flight.actual_out) //Flight has departed the gate, so use actual time
                    flight.scheduled_out = flight.actual_out;
                flight.scheduled_out = new Date(flight.scheduled_out);
            });

            // Sort the departures from earliest to latest
            array.sort((a,b) => a.scheduled_out - b.scheduled_out);
            setDepartures([...array]); // Cause rerender
            setStartTime(new Date(data.isoStartTime));
            setEndTime(new Date(data.isoEndTime));
        }
    };

    useEffect (() => {
        getDepartures();
    }, []);

    return (
        <div className={css.componentContainer}>
            <div className={css.scheduleHeaderContainer}>
                <span className={css.header}> DEPARTURE TIMES </span>
                <FaInfoCircle className={css.infoIcon} onClick={() => setShow(true)}/>
                <img src="../media/assets/takeoff_symbol.png" className={css.planeIcon} alt="Takeoff Departure Times" />
                <div className={css.subHeader}>
                    <span className={css.colHeader}> FLIGHT </span>
                    <span className={css.colHeader}> TIME </span>
                    <span className={css.colHeaderLong}> DESTINATION </span>
                    <span className={css.colHeader}> GATE </span>
                    <span className={css.colHeader}> STATUS </span>
                </div>
            </div>
            <div>
                {departures.length === 0 ? 
                <div className={css.errorAlert}>
                    Could not retrieve flights at this time.
                </div>
                :
                // Sometimes the API returns stale data which hasn't been cleared
                // So it could be a flight from the night before
                // So we double check by refiltering by times
                departures?.map((flight, index) => {
                    const scheduledTime = new Date(flight.scheduled_out);
                    //console.log(flight.destination.city + "\n" + flight.ident_iata + "\nSTART:     " + startTime + " \nEND:       " + endTime + " \nScheduled: " + scheduledTime);
                    return (scheduledTime.getTime() < startTime.getTime() || scheduledTime.getTime() > endTime.getTime()) ? 
                    ""
                    :
                    <FlightRowDepartures key={index} flight={flight}/>
                })}
          
            </div>
            {show ? <DeparturesModal setShow={setShow}/> : ""}
    </div>
    );
}
export default Departures;