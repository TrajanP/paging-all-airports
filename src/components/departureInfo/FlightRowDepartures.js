"use client"
// Styling Imports
import css from '../../css/flightRow.module.css';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdAirlines } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";
import { FaRoad } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
// React Imports
import { useState, useEffect } from 'react';

// This component is used to display a Departure Flight's Info
const FlightRowDepartures = ({flight}) => {

    // Component State
    const [show, setShow] = useState(false); // For DropDown info
    const [color, setColor] = useState("#6B6969"); // For row status color
    const [message, setMessage] = useState("Flight is on time"); // On Hover message
    const [status, setStatus] = useState("ON TIME");

    // Handle time displayed in Airport's Local Time
    const utcTime = new Date(flight.scheduled_out);
    const timeZone = flight.origin.timezone;
    const localTimeAirport = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(utcTime);

    // Determine a flight's departure status
    useEffect(() => {
        if(flight.diverted)
            {
                setColor("#B26B2A");
                setMessage("Flight is Diverted");
                setStatus("DIVERTED")
            }
            else if(flight.cancelled)
            {
                setColor("#D46C5D");
                setMessage("Flight is Cancelled");
                setStatus("CANCELLED");
            }
            else if(flight.actual_out)
            {
                setColor("#5A764D");
                setMessage("Flight has Departed");
                setStatus("DEPARTED");
            }
            else if(flight.departure_delay && flight.departure_delay > 0 && !flight.actual_out )
            {
                setColor("#B26B2A");
                setMessage("Flight is Late");
                setStatus("DELAYED")
            }
    }), [];

    return(
        <div>
            <div className={css.componentContainer} style={{ '--status-color': `${color}` }} title={message}>
                <span className={css.span}> {flight.ident_iata} </span>
                <span className={css.span} style={{color:"#D6D045"}}> {localTimeAirport} </span>
                <span className={css.spanLong}> {flight.destination.city} </span>
                <span className={css.span} style={{color:"#D6D045"}}> {flight.gate_origin ? flight.gate_origin : "N/A"} </span>
                <span className={css.spanStatus} > {status} </span>
                <span className={css.spanShort}> <IoMdArrowDropdownCircle className={css.arrow} onClick={() => setShow(!show)}/> </span>
            </div>
            {show ? 
                <div className={css.dropDownRowContainer} style={{ '--status-color': "#6B6969" }}> 
                    <span className={css.spanBorder} title="Airline"> <MdAirlines /> {flight.operator} </span>
                    <span className={css.spanBorder} title="Aircraft"> <IoAirplane />  {flight.aircraft_type} </span>
                    <span className={css.spanBorder} title="Runway"> <FaRoad /> {flight.actual_runway_on} </span>
                    <span className={css.spanBorder} title="Current Status"> <GrStatusInfo /> {flight.status} </span>
                </div>
            : 
                ""
            }
        </div>
    );
}

export default FlightRowDepartures;