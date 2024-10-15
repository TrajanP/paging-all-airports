// Styling Imports
import css from '../../css/dashboard.module.css';
// Component Imports
import WeatherTile from '../weatherInfo/WeatherTile';
import AirportInfoTile from '../airportInfo/AirportInfoTile';
import Departures from '../departureInfo/Departures';
import Arrivals from '../arrivalInfo/Arrivals';
// React Imports
import { useEffect } from 'react';

// This component contains the four info tiles for the airport information.
const Dashboard = (props) => {

    //Handle changing view when dashboard renders
    const windowHeight = window.innerHeight;
    const jumpHeight = windowHeight * 1.0;
    useEffect(() => window.scrollTo({ top: jumpHeight, behavior: "smooth" }), []);

    return (
        <div className={css.componentContainer}>
            <div className={css.upperContainer}>
                <div className={css.airportInfoTile}>
                    <AirportInfoTile airportInfo={props.airportInfo} />
                </div>
                <div className={css.weatherInfoTile}>
                    <WeatherTile/>
                </div>
            </div>
            <div className={css.lowerContainer}>
                <div className={css.departuresTile}>
                    <Departures/>
                </div>
                <div className={css.arrivalsTile}>
                    <Arrivals/>
                </div>  
            </div>
        </div>

    );
}

export default Dashboard;