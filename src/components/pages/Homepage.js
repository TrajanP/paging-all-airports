"use client"
// Component Imports
import SearchBar from './assets/SearchBar';
import NavBar from './assets/NavBar';
import Dashboard from '../pages/Dashboard';
import TextScroll from './assets/TextScroll';
// Styling Imports
import css from '../../css/homepage.module.css';
// React Imports
import {useState, useEffect, useContext} from 'react';
import { MyContext } from '../../app/context/MyContext';

// This component acts as the Parent for the whole application. Controls the Dashboard render which holds the info tiles 
const Homepage = () => {

    // Data for the horizontal banners
    const text1 = [
        {
            time: "9:15",
            location: "LONDON",
            status: "late"
        },
        {
            time: "8:05",
            location: "BERLIN",
            status: "ontime"
        },
        {
            time: "14:40",
            location: "ROME",
            status: "boarding"
        },
        {
            time: "11:05",
            location: "TOKYO",
            status: "ontime"
        },
        {
            time: "1:30",
            location: "PARIS",
            status: "ontime"
        },
        {
            time: "14:00",
            location: "ZURICH",
            status: "ontime"
        },
        {
            time: "2:25",
            location: "LOS ANGELES",
            status: "ontime"
        },
        {
            time: "16:05",
            location: "SYDNEY",
            status: "ontime"
        },
        {
            time: "14:25",
            location: "COPENHAGEN",
            status: "ontime"
        },

    ];

    // Data for the horizontal banners
    const text2 = [
        {
            time: "12:20",
            location: "VIENNA",
            status: "late"
        },
        {
            time: "18:00",
            location: "ORLANDO",
            status: "ontime"
        },
        {
            time: "2:45",
            location: "DUBROVNIK",
            status: "boarding"
        },
        {
            time: "3:05",
            location: "SHANGHAI",
            status: "ontime"
        },
        {
            time: "21:00",
            location: "LONDON",
            status: "ontime"
        },
        {
            time: "11:30",
            location: "MILAN",
            status: "ontime"
        },
        {
            time: "8:45",
            location: "HOUSTON",
            status: "ontime"
        },
        {
            time: "1:00",
            location: "SAN FRANCISCO",
            status: "ontime"
        },
        {
            time: "18:25",
            location: "MUNICH",
            status: "ontime"
        },

    ];

    // Data for the horizontal banners
    const text3 = [
        {
            time: "2:40",
            location: "NASHVILLE",
            status: "late"
        },
        {
            time: "7:00",
            location: "PRAGUE",
            status: "ontime"
        },
        {
            time: "23:05",
            location: "FLORENCE",
            status: "boarding"
        },
        {
            time: "14:00",
            location: "CHICAGO",
            status: "ontime"
        },
        {
            time: "6:30",
            location: "LAS VEGAS",
            status: "ontime"
        },
        {
            time: "12:00",
            location: "BOSTON",
            status: "ontime"
        },
        {
            time: "4:45",
            location: "MANCHESTER",
            status: "ontime"
        },
        {
            time: "11:05",
            location: "BARCELONA",
            status: "ontime"
        },
        {
            time: "18:25",
            location: "STOCKHOLM",
            status: "ontime"
        },

    ];

    // Component State
    const { airport, setAirport } = useContext(MyContext);
    const [extended, setExtended] = useState(false);
    const [airportInfo, setAirportInfo] = useState({});

    const ExtendWebpage = () => {
        setExtended(!extended);
    }

    useEffect(() => {
        const objectEmpty = Object.values(airportInfo).length;
        // Did user's requested input work?
        if (objectEmpty >= 1)
        {
            setExtended(true);
            // Set Context
            setAirport({
                code: airportInfo.airportInfo.alternate_ident,
                name: airportInfo.airportInfo.name,
                city: airportInfo.airportInfo.city,
                country: airportInfo.airportInfo.country,
                timezone: airportInfo.airportInfo.timezone,
                wiki_url: airportInfo.airportInfo.wiki_url
            });
        }
            
    }, [airportInfo]);

    return (
        <div className={extended ? css.homeBodyExtended : css.homeBody}>
            <NavBar/>
            <SearchBar setExtended={setExtended} setAirportInfo={setAirportInfo}/>
            <video autoPlay="autoPlay" playsinline loop="loop" muted id="timelapseID" className={css.backgroundVideo} >
                <source src="/media/videos/timelapse.mp4" type="video/mp4"/>
            </video>
            <div className={css.bannerBox}>
                <TextScroll direction={'left'} text={text1}/>
                <TextScroll direction={'right'} text={text2}/>
                <TextScroll direction={'left'} text={text3}/>
            </div>
            <div >
                {extended ? <Dashboard id="page1ID" airportInfo={airportInfo}/> : ""}
            </div>
        </div>
    );
}

export default Homepage;