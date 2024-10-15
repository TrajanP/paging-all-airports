'using client'
// React Imports
import { useContext } from 'react';
import { MyContext } from '../../app/context/MyContext';
// Styling Imports
import css from "../../css/airportInfoTile.module.css";

// This component is used to display the second tile of airport info
const AirportInfoTile2 = ({ airportInfo }) => {

    const { airport, setAirport } = useContext(MyContext);

    return (
        <div>
            <div className={css.headerContainer}>
                <div> Airport </div>
                <div> Info </div>
            </div>
            <div className={css.listContainer}>
                <div> Name : <span style={{color:"#D6D045"}}> {airport.name} </span> </div>
                <div> City : <span style={{color:"#D6D045"}}> {airport.city} </span> </div>
                <div> Timezone : <span style={{color:"#D6D045"}}> {airport.timezone} </span> </div>
                <a className={css.link} href={`${airport.wiki_url}`}> Find More Info </a>
            </div>
            <img src="/media/assets/airportAerial.png" className={css.airportIcon2} alt="Aerial View of a Airport"/>
        </div>
    );
}

export default AirportInfoTile2;