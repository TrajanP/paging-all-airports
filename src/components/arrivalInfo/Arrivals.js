'using client'
// Styling Imports
import css from '../../css/schedule.module.css';
import { FaInfoCircle } from "react-icons/fa";
// Component Imports
import FlightRowArrivals from './FlightRowArrivals';
import ArrivalsModal from './ArrivalsModal';
// React Imports
import { useContext, useState, useEffect } from 'react'; 
import MyContext from '@/app/context/MyContext';

// This component is used to retrieve and render Arrivals for the provided airport.
// Both Past and Future Arrivals will be displayed
const Arrivals = () => {

    // Component State
    const [arrivals, setArrivals] = useState([]);
    const { airport, setAirport } = useContext(MyContext);
    const [show, setShow] = useState(false); // Render Modal

    // Cut Off times for window of retrieval, used for filtering unwanted flights
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    // Fetch Arrivals for given airport
    const getArrivals = async () => {
        const response = await fetch(`api/airportArrivals/${airport.code}`);
        const data = await response.json();
        // console.log("Arrivals Message: " + data.message + " Past Response " + data.dataPast + " Sched Response " + data.dataSched);
        //console.log(JSON.stringify(data, null, 2)); // Logs the entire object with indentation
        // Did we get arrivals?
        if(data.arrivalInfo?.length > 0)
        {
            // We don't want flight that don't have identification number, usually implies bad data
            const array = data.arrivalInfo.filter(flight => flight.ident_iata !== null && flight.ident_iata !== "");
            //Filter thru arrivals and update the most recent time for arrival
            array.map((flight, index) => {
                if (flight.actual_in) //Flight has arrived at the gate, so use actual time
                    flight.scheduled_in = flight.actual_in;
                flight.scheduled_in = new Date(flight.scheduled_in);
            });

            // Sort the arrivals from earliest to latest
            array.sort((a,b) => a.scheduled_in - b.scheduled_in);
            setArrivals(array);
            setStartTime(new Date(data.isoStartTime));
            setEndTime(new Date(data.isoEndTime));
            // console.log("Start: " + data.isoStartTime + " Curr: " + data.isoCurrTime + " End: " + data.isoEndTime);
        }
    };

    useEffect (() => {
        getArrivals();
    }, []);

    return (
        <div className={css.componentContainer}>
            <div className={css.scheduleHeaderContainer}>
                <span className={css.header}> ARRIVAL TIMES </span>
                <FaInfoCircle className={css.infoIcon} onClick={() => setShow(true)}/>
                <img src="../media/assets/landing_symbol.png" className={css.planeIcon} alt="Landing Arrival Times" />
                <div className={css.subHeader}>
                    <span className={css.colHeader}> FLIGHT </span>
                    <span className={css.colHeader}> TIME </span>
                    <span className={css.colHeaderLong}> ORIGIN </span>
                    <span className={css.colHeader}> GATE </span>
                    <span className={css.colHeader}> STATUS </span>
                </div>
            </div>
            <div>
                {arrivals.length === 0 ? 
                <div className={css.errorAlert}>
                    Could not retrieve flights at this time.
                </div>
                :
                // Sometimes the API returns stale data which hasn't been cleared
                // So it could be a flight from the night before
                // So we double check by refiltering by times
                arrivals?.map((flight, index) => {
                    const scheduledTime = new Date(flight.scheduled_in);
                    // console.log("START: " + startTime + " END: " + endTime + " Scheduled: " + scheduledTime);
                    return (scheduledTime < startTime || scheduledTime > endTime) ? 
                    null 
                    :
                    <FlightRowArrivals key={index} flight={flight}/>
                })}
          
            </div>
            {show ? <ArrivalsModal setShow={setShow}/> : ""}
    </div>
    );
}
export default Arrivals;