'using client'
// React Imports
import { useContext } from 'react';
import { MyContext } from '../../app/context/MyContext';
// Styling Imports
import css from "../../css/airportInfoTile.module.css";

// This component is used to display the first tile of airport info
const AirportInfoTile1 = ({ airportInfo }) => {

    const { airport, setAirport } = useContext(MyContext);

    return (
        <div className={css.tile1Container}>
            <div className={css.leftCol}>
                <span> Paging <span style={{color:"yellow"}}> {airport.name} </span> <br/> Airport </span>
            </div>
            <div>
                <img src="/media/assets/airport.png" className={css.airportIcon1} alt="Model Airport"/>
            </div>
        </div>
    );
}

export default AirportInfoTile1;