'using client'
// Styling Imports
import css from "../../css/airportInfoTile.module.css";
import { FaArrowRight } from "react-icons/fa6";
// Component Imports
import AirportInfoTile1 from './AirportInfoTile1';
import AirportInfoTile2 from './AirportInfoTile2';
// React Imports
import { useState, useContext } from 'react';

// This is the parent component to the two child components which display different airport info
const AirportInfoTile = (props) => {

    const [next, setNext] = useState(false); // State is used to render which info tile to show
    return(
      <div className={css.componentContainer}>
          {!next ? <AirportInfoTile1 airportInfo={props.airportInfo} /> : <AirportInfoTile2 airportInfo={props.airportInfo} />}
          <div className={css.footerNav}>
              {next ? 
                    <div className={css.radialSet}>
                        <div className={css.radialDot} style={{ '--status-color': "white"}}></div> 
                        <div className={css.radialDot} style={{ '--status-color': "#D6D045"}}></div>
                    </div>
                    :
                    <div className={css.radialSet}>
                        <div className={css.radialDot} style={{ '--status-color': "#D6D045"}}></div> 
                        <div className={css.radialDot} style={{ '--status-color': "white"}}></div>
                    </div>
                }
                <FaArrowRight className={css.arrowSet} onClick={() => {setNext(!next)}}/>
        </div>
      </div>
    );
}
export default AirportInfoTile;