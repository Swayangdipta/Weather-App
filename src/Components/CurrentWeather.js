import React, { useState, useContext, useEffect } from 'react';
import {WeatherContext} from '../Context/WeatherContext'
import {LocationContext} from '../Context/LocationContext'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../App.css'
import Day from '../weather-icons/animated/day.svg'
import { ThemeContext } from '../Context/ThemeContext';
import AppTheme from '../Colors'


const CurrentWeather = () =>{
    const [location,setLocation] = useContext(LocationContext)
    const [weather,setWeather] = useContext(WeatherContext)
    const [time,setTime] = useState('')
    const [hourVal,setHourVal] = useState([])
    const [themeMode,setThemeMode] = useContext(ThemeContext);
    const theme= useContext(ThemeContext)[0]
    const currentTheme = AppTheme[theme]

    const formatTime = (dt) =>{
        var timestamp = dt;
        var date = new Date(timestamp)
        return date.getHours() + ':' + date.getMinutes()
    }

    const getHour = () => {
        var hourArr = []
        var startingHour = new Date();
        var thisHour = new Date();
        for(var i=0; i<24; i++) {
            thisHour.setHours(startingHour.getHours() + i);
            var hours= thisHour.getHours()
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            var hourStr = hours + ' ' + ampm
            hourArr.push(hourStr)
            // console.log(hourVal);
        }
        setHourVal(hourArr)
    }

    const getTime = () => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes
        return strTime
    }

    useEffect(()=>{
        const interval = setInterval(() => setTime(getTime()), 1000);
        return () => {
          clearInterval(interval);
        };
    },[])

    useEffect(()=>{
        getHour()
    },[])


    return(
        <div className='weatherBody' style={{
            background: `${currentTheme.backgroundColor}`
        }}>
        <div className='weatherCard cardScroll' style={{
            background: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.textColor}`,
            boxShadow: `${currentTheme.wCardBS}`
        }}>
            <div className="branding">
                <div className="brandName" style={{color: `${currentTheme.brandName}`}}><h3>Weathering With You</h3></div>
                <div className="close"><h3><Link to='/' className='h3link'><AiFillCloseCircle size='30px' /></Link></h3></div>
            </div>
            <hr />

            <div className='detailedInfo'>
                <div className="currentDayInfo" style={{
                    boxShadow: `${currentTheme.neumorphInsetBS}`
                }} >
                    {location !== undefined ? (<div className="locName" style={{color: `${currentTheme.curWeatherTC}`}}><h3>{location.name}, {location.country}</h3></div>):('')}
                    {weather !== undefined ? (
                        <>
                        <div className="weatherIcon"><img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@4x.png`} className="neumorphismInsetIcon" color="white" style={{
                            background: `${currentTheme.bColor2}`,
                            boxShadow: `${currentTheme.neumorphInsetIconBS}`,
                            marginLeft: '15px',
                            marginRight: '15px'
                        }}  /></div>
                        <div className="currenteWeather" style={{color: `${currentTheme.curWeatherTC}`}}>
                            <h3 className="raleway">{time}</h3>
                            <h3>Temp: <span className='raleway'>{weather.current.temp}</span> &deg;C</h3>
                            <h3>Feelslike: <span className='raleway'>{weather.current.feels_like}</span> &deg;C</h3>
                            <h3>Humidity: <span className='raleway'>{weather.current.humidity}</span>%</h3>
                            {weather.current.weather !== undefined ? (
                                <h3>Condition: <span className='raleway'>{weather.current.weather.length !== 0 ? (weather.current.weather[0].main):('')}</span></h3>
                            ): ('')}
                        </div>
                        </>
                    ) : (
                        <div className="currenteWeather"> <h3>Loading...</h3> </div>
                    )}

                </div>
                <div className='hourlyForecast' >
                        {
                            weather !== undefined ? (
                                weather.hourly.map((hourly,hourr)=>(
                                    hourr >= 24 ? '' : (
                                    <div key={hourr} className='perHour ubuntu' style={{
                                        color: `${currentTheme.textColor}`,
                                        background: `${currentTheme.backgroundColor}`,
                                        scrollbarColor: `${currentTheme.textColor}`,
                                        boxShadow: `${currentTheme.neumorphBS}`
                                    }}>
                                        <div className="icon"><h3 className="rajdhani">{hourVal.length !==0 ? (hourVal[hourr]) : ('')}&nbsp;&nbsp;&nbsp;</h3>  <img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`} className="neumorphismInsetIcon" color="white" style={{boxShadow: `${currentTheme.neumorphInsetIconBS}`}} /></div>
                                        <h3>Temp: {hourly.temp}&deg;C</h3>
                                        <h3>Feelslike: {hourly.feels_like}&deg;C</h3>
                                        <h3>Status: {hourly.weather[0].description}</h3>
                                    </div>
                                    )
                                ))
                            ) : (
                                <h3>Loading...</h3>
                            )
                        }
                </div>
            </div>
        </div>
        </div>
    )


}

export default CurrentWeather;