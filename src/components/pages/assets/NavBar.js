// Import Styling
import css from '../../../css/navbar.module.css';
// This component is the header for the homepage
const NavBar = () => {
    return (
        <div className={css.componentContainer}>
            <img src="/media/assets/airport_symbol.png" className={css.headerImage} alt = "Airport logo"/>
            <span className={css.header}> Paging All Airports </span>
        </div>
    );
}

export default NavBar;