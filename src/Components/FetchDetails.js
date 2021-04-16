import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import {API_KEY} from './Config'
import WeatherCard from './WeatherCard'
import {LocationContext} from '../Context/LocationContext'
    
const FetchDetails = () => {
    const initialWeatherValue = {
        current: {
          weather: [{
            main: 'Clear',
            description: 'Clear Sky',
            id: '800'
          }]
        },
        hourly: [],
        daily: []
    }
    const [weather,setWeather] = useState(initialWeatherValue)
    const [latLon,setLatLon] = useState({
        lat: '28.6896',
        lon: '77.1025',
    })

    const [isDocLoaded,setIsDocLoaded] = useState(false)
    const [locationName,setLocationName] = useContext(LocationContext)

    let count = 0

    const fetchCityByName = () => {
        const GEO_CITY_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?'
        const query = locationName.name
        const params={
            q: query,
            limit: 1,
            appid: API_KEY
        }
        Axios.get(GEO_CITY_API_URL,{params}).then(
            res => {
                const latLonValue = {
                     city: res.data[0].name,
                     lat: res.data[0].lat,
                     lon: res.data[0].lon,
                     country: res.data[0].country
                }
                setLatLon(latLonValue)
                console.log(latLonValue);
                console.log(locationName);
                // count = count+1
            }
        ).catch(
            e=>{
                console.log(e);
            }
        )

    } 

    const fetchCityName = () => {
      const API_URI = "http://api.openweathermap.org/geo/1.0/reverse?"
      const parammeter= {
        lat: latLon.lat,
        lon: latLon.lon,
        limit: 1,
        appid: API_KEY
      }
      Axios.get(API_URI,{params: parammeter}).then(res => {
        const values = {
          name: res.data[0].name,
          country: res.data[0].country
        }
        setLocationName(values)
      }).catch(e=>console.log(e))
    }

    const fetchCurrentDetails =  () => {
        const API_URL = "https://api.openweathermap.org/data/2.5/onecall?"
        const params= {
            lat: latLon.lat,
            lon: latLon.lon,
            units: 'metric',
            appid: API_KEY
        }
        Axios.get(API_URL,{params}).then(
            res => {
                const data = res.data
                setWeather(data)
            }
        ).catch(e=>{
            console.log(e);
        })

    }

    const fetchLatLon = ()=> {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
           setLatLon({lat,lon})
         })
       }
    }



    useEffect(()=>{
      if(isDocLoaded){
        fetchLatLon()
      }
    })

    useEffect(()=>{
        fetchCurrentDetails()
    })

    useEffect(()=>{
      fetchCityName()
    })

    useEffect(()=>{
      document.onload = e => setIsDocLoaded(true)
    })

    // FIXME: Have to use Context
    useEffect(()=>{
      fetchCityByName()
    },[locationName])



    return(
        <div>
          <WeatherCard weatherr={weather}/>
        </div>
    )

}

export default FetchDetails