import React, { useState,useContext, useEffect } from 'react'
import '../App.css'
import {RiSearchFill} from 'react-icons/ri'
import {FaArrowCircleRight} from 'react-icons/fa'
import Day from '../weather-icons/animated/day.svg'
import Night from '../weather-icons/animated/night.svg'
import  {WeatherContext} from '../Context/WeatherContext'
import {LocationContext} from '../Context/LocationContext'
import { Coords } from '../Context/Coords'
import { LocationName } from '../Context/LocationName'
import CurrentWeather from './CurrentWeather'
import {Link} from 'react-router-dom'
import { ThemeContext } from '../Context/ThemeContext'
import AppTheme from '../Colors'
import { AiFillCloseCircle } from 'react-icons/ai'
import { LocArrayContext } from '../Context/LocArrayContext'
import { toast } from 'react-toastify'
import Ripple from '../weather-icons/animated/Ripple-1s-200px.svg'


const WeatherCard = () => {

    const [weather,setWeather] = useContext(WeatherContext)
    const [location,setLocation] = useContext(LocationContext)
    const [name,setName]=useContext(LocationName)
    const [locArray,setLocArray] = useContext(LocArrayContext)
    const [loc,setLoc] = useContext(Coords)
    const [locationInput,setLocationInput] = useState('')
    const [time,setTime] = useState('')
    const [days,setDays] = useState([])
    const [themeMode,setThemeMode] = useContext(ThemeContext);
    const theme= useContext(ThemeContext)[0]
    const currentTheme = AppTheme[theme]


    const [closeCounter,setCloseCounter]= useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
        setName(locationInput)
        } catch (error) {
            console.log('Oops! Something went wrong');
        }
    }

    const toggleSearch = () => {
        setCloseCounter(closeCounter+1)
    }

    const submitLoc = (e,locc) => {
        e.preventDefault()
        if(typeof locc === typeof undefined){
            toast('Not Found')
        }

        try{
            const latlonVal ={
                lat: locc.lat,
                lon: locc.lon
            }
            setLoc(latlonVal)
            setCloseCounter(closeCounter+1)
        } catch(err){
            toast('Something went wrong')
        }
    }



    const getDate = (dayNow) => {
        let dates = []

        weather.daily.map((daily,day)=>{
            let unix_timestamp = daily.dt
            var date = new Date(unix_timestamp);
            var weekDay = date.getDay()
            var month = date.getMonth()
            var data = {
                curDay: weekDay,
                month: month,
            }
            dates.push(data)
        })

        let currentDate ={
            curDay : dates[dayNow].curDay,
            month: dates[dayNow].month
        } 

        return currentDate;
    }



    const getTime = () => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' +ampm
        return strTime
    }

    const getDays = () =>{
        var daysArr = []
        var startingDay = new Date();
        var thisDay = new Date();
        for(var i=0; i<7; i++) {
            thisDay.setDate(startingDay.getDate() + i);
            var day= thisDay.getDate()
            var month = thisDay.getMonth() + 1;
            var daysObj = {
                day: day,
                month: month
            }
            daysArr.push(daysObj)
        }
        setDays(daysArr)
    }

    const switchTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    }

    useEffect(()=>{
        const interval = setInterval(() => setTime(getTime()), 1000);
        return () => {
          clearInterval(interval);
        };
    },[])
    useEffect(()=>{
        getDays()
    },[])

    return(
        weather !== undefined ? (
            <div className='weatherBody' style={{
                background: `${currentTheme.backgroundColor}`
            }}>
                <div className="themeSwitch" onClick={()=>switchTheme()} style={{
                    boxShadow: `${currentTheme.neumorphBS}`,
                    background: `${currentTheme.backgroundColor}`
                }}>
                    <img src={themeMode === 'light' ? Day : Night} className='themeIcon' />
                </div>
                <div className='weatherCard' style={{
                    background: `${currentTheme.backgroundColor}`,
                    color: `${currentTheme.textColor}`,
                    boxShadow: `${currentTheme.wCardBS}`
                }}>
                    <div className="branding">
                        <div className="brandName" style={{color: `${currentTheme.brandName}`}}><h3>Weathering With You</h3></div>
                        <button className="searchCityButton submitNeumorph openSearch" onClick={()=>toggleSearch()}><i><RiSearchFill size="20px" /></i></button>
                    </div>
                    {
                        closeCounter % 2 ===0 ? ('') : (
                            <div className="searchCity">
                            <form className="searchForm">
                                <input type="text" onChange={e=>setLocationInput(e.target.value)} placeholder="Enter city name..." className="searchInput" />
                                <button className="searchCityButton"  onClick={(e)=>handleSubmit(e)}><i><RiSearchFill size="20px" /></i></button>
                            </form>
                            <div className="results raleway">
                            {locArray.length === 0 ? (
                                <div className="locValue"><h3>No Results</h3></div>
                            ) :(
                                locArray.map((locc,index)=>(
                                    <div key={index} className="locValue">
                                    <h3 onClick={(e)=>submitLoc(e,locc)}>{locc.name} , {locc.country}</h3>
                                    </div>
                                ))
                            )}
                            </div>
                            <div className="closeSearch" onClick={(e)=>toggleSearch()}><h3><AiFillCloseCircle size='50px' /></h3></div>
                        </div>
                        )
                    }
    
                    <hr />
                    <div className="weatherInfo">
                        <div className="currentDayInfo " style={{
                            boxShadow: `${currentTheme.neumorphInsetBS}`
                        }}>
                            {location !== undefined ? (<div className="locName" style={{color: `${currentTheme.curWeatherTC}`}}><h3>{location.name}, {location.country}</h3></div>):('')}
                            {weather !== undefined ? (
                                <>
                                <div className="weatherIcon "><img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@4x.png`} className="neumorphismInsetIcon" color="white" style={{
                                    background: `${currentTheme.bColor2}`,
                                    boxShadow: `${currentTheme.neumorphInsetIconBS}`
                                }} /></div>
                                <div className="currenteWeather" style={{color: `${currentTheme.curWeatherTC}`}}>
                                    <h3 className='raleway'>{time}</h3>
                                    <h3>Temp: <span className='raleway'>{weather.current.temp}</span>  &deg;C</h3>
                                    <h3>Feelslike: <span className='raleway'>{weather.current.feels_like}</span> &deg;C</h3>
                                    <h3>Humidity: <span className='raleway'>{weather.current.humidity}</span>%</h3>
                                    {weather.current.weather !== undefined ? (
                                        <h3>Condition: {weather.current.weather.length !== 0 ? (<span className='raleway'>{weather.current.weather[0].main}</span>):('')}</h3>
                                    ): ('')}
                                    <h3 className="moreDetails"><Link to='/current' style={{color: `${currentTheme.brandName}`}}><FaArrowCircleRight size='30px' className='neumorphismDark' /></Link></h3>
                                </div>
                                </>
                            ) : (
                                <div className="currenteWeather neumorphism"> <h3>Loading...</h3> </div>
                            )}
    
                        </div>
                        <div className="weeklyForecast">
                            <div className="minMaxIndi" >
                            </div>
                            {
                                weather !== undefined ? (
                                    weather.daily.map((daily,day)=>(day===7 ? '' :(
                                        <div className="minMax" key={day} style={{
                                            color: `${currentTheme.textColor}`,
                                            background: `${currentTheme.backgroundColor}`,
                                            scrollbarColor: `${currentTheme.textColor}`,
                                            boxShadow: `${currentTheme.neumorphBS}`,
                                            fontWeight: "lighter"
                                        }}>
                                            <h3 className="maxTemp rajdhani">{daily.temp.max} &deg;C</h3>
                                            <div className="tempBar"> </div>
                                            <h3 className="minTemp rajdhani">{daily.temp.min} &deg;C</h3>
                                            {days.length !==0 ? (<h3 className="dayCount">{ days[day].day +  " / " + days[day].month }</h3>) : ('...')} 
                                        </div>
                                    )))
                                ) : (
                                    <div className="minMax">
                                        <h3>Loading...</h3>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="loader"><img src={Ripple} /></div>
        )
    )
    


}

export default WeatherCard;