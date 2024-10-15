'using client'
// Styling Imports
import css from '../../css/weatherTile.module.css';
import { FaInfoCircle } from "react-icons/fa";
// React Imports
import { useEffect, useState, useContext } from 'react';
import MyContext from '@/app/context/MyContext';
// Component Import
import WeatherModal from '../weatherInfo/WeatherModal';

// Component renders the latest METAR Weather Report for chosen airport
const WeatherTile = () => {

    // Component State
    const { airport, setAirport } = useContext(MyContext); 
    const [weather, setWeather] = useState({});
    const [windDirection, setWindDirection] = useState("");
    const [image, setImage] = useState("");
    const [localTime, setLocalTime] = useState("");
    const [show, setShow] = useState(false);

    // Call API for Current Weather Info
    const getWeather = async () => {
        const response = await fetch(`api/airportWeather/${airport.code}`);
        const weatherData = await response.json();
        setWeather(weatherData.airportWeather.observations[0]); //Grab most recent entry from list

        const degrees = weatherData.airportWeather.observations[0].wind_direction;
        const windSpeed = weatherData.airportWeather.observations[0].wind_speed;
        const conditions = weatherData.airportWeather.observations[0].cloud_friendly;

        // Calculate Wind Direction
        if(degrees === 0 && windSpeed === 0)
            setWindDirection("NA")
        else if(degrees === 360 || degrees === 0)
            setWindDirection("North");
        else if (degrees === 90)
            setWindDirection("East");
        else if (degrees === 180)
            setWindDirection("South");
        else if (degrees === 270)
            setWindDirection("West");
        else if (degrees < 90)
            setWindDirection("NE");
        else if (degrees < 180)
            setWindDirection("SE");
        else if (degrees < 270)
            setWindDirection("SW");
        else if (degrees < 360)
            setWindDirection("NW");
        else
            setWindDirection("NA");

        // UTC Time and Local Timezone for provided Airport
        const utcTime = new Date(weatherData.airportWeather.observations[0].time);
        const timeZone = airport.timezone;
        const today = new Date().toISOString().split('T')[0]; //today acts as a benchmark to compare times

        // The Cut Offs are used for determining if Night or Day, when displayin weather
        const eveningCutoff = new Date(today + "T18:30:00"); 
        const midnightCutoff = new Date(today + "T00:00:00"); 
        const endDayCutoff = new Date(today + "T24:00:00")
        const morningCutoff = new Date(today + "T06:30:00");

        // localTimeAiport represents the local time at airport by using provided Timezone
        const localTimeAirportStr = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(utcTime);
        const localTimeAirport = new Date(today + ('T' + localTimeAirportStr));
        setLocalTime(localTimeAirport);

        // Calculate time of day
        var timeOfDay = "";
        if(localTimeAirport >= midnightCutoff && localTimeAirport < morningCutoff)
        {
            timeOfDay = "Morning";
            // console.log("Between 12:00AM and 6:30AM");
        }
        else if(localTimeAirport >= morningCutoff && localTimeAirport < eveningCutoff)
        {
            timeOfDay = "Day";
            // console.log("After 6:30AM and Before 6:30PM");
        }
        else if(localTimeAirport >= eveningCutoff && localTimeAirport < endDayCutoff)
        {
            timeOfDay = "Night";
            // console.log("6:30PM or After and Before 12:00AM");
        }
        else
        {
            timeOfDay = "Error";
            console.log("Weather Time of Day Calculation Error")
        }

        // Choose Weather Image from DAY Catalog
        if(timeOfDay === "Day")
        {
            if(conditions === "Clear skies")
                setImage("media/weatherDay/ClearDay.png");
            else if(conditions === "Overcast skies")
                setImage("media/weatherDay/OvercastDay.png");
            else if(conditions === "Partly cloudy")
                setImage("media/weatherDay/CloudyDay.png")
            else if(conditions === "Raining" || conditions === "Rain")
                setImage("media/weatherDay/RainDay.png");
            else if(conditions === "Thunderstorms" || conditions === "Thunder" || conditions === "Lightning")
                setImage("media/weatherDay/ThunderstormDay.png");
            else if(conditions === "Snow" || conditions === "Snowing" || conditions === "Snowstorm")
                setImage("media/weatherDay/SnowDay.png");
            else if(conditions === "Windy" || conditions === "Wind" || conditions === "Storm")
                setImage("media/weatherDay/WindyDay.png");
            else if(conditions === "Sleet")
                setImage("media/weatherDay/SleetDay.png");
            else
                setImage("media/weatherDay/WeatherDay.png");
        }
        // Choose Weather Image from Night Catalog
        else if(timeOfDay === "Night" || timeOfDay === "Morning")
        {
            if(conditions === "Clear skies")
                setImage("media/weatherNight/ClearNight.png");
            else if(conditions === "Overcast skies")
                setImage("media/weatherNight/OvercastNight.png");
            else if(conditions === "Partly cloudy")
                setImage("media/weatherNight/CloudyNight.png")
            else if(conditions === "Raining" || conditions === "Rain")
                setImage("media/weatherNight/RainNight.png");
            else if(conditions === "Thunderstorms" || conditions === "Thunder" || conditions === "Lightning")
                setImage("media/weatherNight/ThunderstormNight.png");
            else if(conditions === "Snow" || conditions === "Snowing" || conditions === "Snowstorm")
                setImage("media/weatherNight/SnowNight.png");
            else if(conditions === "Windy" || conditions === "Wind" || conditions === "Storm")
                setImage("media/weatherNight/WindyNight.png");
            else if(conditions === "Sleet")
                setImage("media/weatherNight/SleetNight.png");
            else
                setImage("media/weatherNight/WeatherNight.png");
        }
        else
            setImage("media/weatherDay/Weather.png")
    };
    

    useEffect (() => {
        getWeather();
    }, []);
    
    return (
        <div className={css.componentContainer}>
            <FaInfoCircle className={css.infoIcon} onClick={() => setShow(true)}/>
            <div className={css.weatherHeader}>
                <div className={css.left}>
                    <span> Current </span> <br/>
                    <span> Weather </span>
                </div>
                <div className={css.right}>
                    <img src= {image}  alt="Current Weather" className={css.weatherIcon}/>
                </div>
            </div>
            <div className={css.weatherInfoContainer}>
                <div className={css.weatherInfoRow}>
                    <div>
                        Wind Speed: <span style={{color:"#D6D045"}}> {weather.wind_speed} mph </span>
                    </div>
                    <div>
                        Coverage: <span style={{color:"#D6D045"}}> {weather.cloud_friendly} </span>
                    </div>
                </div>
                <div className={css.weatherInfoRow}>
                    <div>
                        Direction: <span style={{color:"#D6D045"}}> {windDirection} </span>
                    </div>
                    <div>
                        Temperature: <span style={{color:"#D6D045"}}> {weather.temp_air} °F </span>
                    </div>
                </div>
            </div>
            {show ? <WeatherModal setShow={setShow}/> : ""}
        </div>
    );
}

export default WeatherTile;