"using client"
//Styling Import
import css from '../../../css/homepage.module.css';
import { MdFlightTakeoff } from "react-icons/md"; 

// This component renders the user input search bar for entering airport code
const SearchBar = ({setExtended, setAirportInfo}) => {

    const getAirportInfo = async () => {
        const airport = document.getElementById('inputID').value;
        const response = await fetch(`api/airportInfo/${airport}`);
        const data = await response.json();
        setAirportInfo(data);
        setExtended(false);
    }
    return (
        <div className={css.searchBody}>
           <span className={css.searchContainer}>Paging</span> <input id="inputID" onInput= {(e) => {e.target.value = e.target.value.toUpperCase()}} className={css.searchInput} placeholder = "Enter an Airport Code"></input> <button className={css.submitButton} onClick={() => getAirportInfo()}> <MdFlightTakeoff style={{scale:"3.5"}}/> </button>
        </div>
    );
}

export default SearchBar;