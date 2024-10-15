// Styling Import
import css from "../../../css/textscroll.module.css";

// This component is used to render the horizontally scrolling banners on the Homepage
const TextScroll = ({direction, text}) => {
    return (
        <div className={css.scrollContainer}>
            <ul className={direction === 'left' ? css.left : css.right}>
                {text.map((element, index) => (
                    <li key={index}>
                        <span > <span style={{color:"#D6D045"}}>{element.time}</span> {element.location} </span>
                    </li>
                ))}
            </ul>
            <ul className={direction === 'left' ? css.left : css.right}>
                {text.map((element, index) => (
                    <li key={index}>
                        <span> <span style={{color:"#D6D045"}}>{element.time}</span> {element.location} </span>
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default TextScroll;