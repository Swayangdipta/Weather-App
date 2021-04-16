import React, { useState,useContext, useEffect } from 'react'

import Axios from 'axios'

import {API_KEY} from './Config'

import  {WeatherContext} from '../Context/WeatherContext'
import {LocationContext} from '../Context/LocationContext'
import { LocationName } from '../Context/LocationName'
import { Coords } from '../Context/Coords'

import { toast } from 'react-toastify'

import WeatherCard from './WeatherCard'
import { LocArrayContext } from '../Context/LocArrayContext'

const Fetchers = () => {
    const [weather,setWeather] = useContext(WeatherContext)
    const [location,setLocation] = useContext(LocationContext)
    const [name,setName] = useContext(LocationName)
    const [loc,setLoc] = useContext(Coords)
    const [locArray,setLocArray] = useContext(LocArrayContext)

    // const coordinates = () => {
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const coords ={
    //                 lat: position.coords.latitude,
    //                 lon: position.coords.longitude
    //             }
    //             setLoc(coords)
    //         })
    //     }else{
    //         toast('No GeoLocation Found',{type: "dark"})
    //     }
    // }

    const currentDetails = () => {
        const API_URL = "https://api.openweathermap.org/data/2.5/onecall?"
        const params= {
            lat: loc.lat,
            lon: loc.lon,
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
            toast(e.message,{type: "error"})
        })
    }

    const cityNameByCoords = () => {
        const API_URI = "http://api.openweathermap.org/geo/1.0/reverse?"
        const parammeter= {
        lat: loc.lat,
        lon: loc.lon,
        limit: 1,
        appid: API_KEY
        }
        Axios.get(API_URI,{params: parammeter}).then(res => {
        const values = {
            name: res.data[0].name,
            country: res.data[0].country
        }
        setLocation(values)
        }).catch(e=> {
            console.log(e)
            toast('Oops! Cant find the location',{type: "error"})
        })
    }

    const coordsByCityName = () => {
        const GEO_CITY_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?'
        const query = name
        const params={
            q: query,
            limit: 5,
            appid: API_KEY
        }
        Axios.get(GEO_CITY_API_URL,{params}).then(
            res => {
                const latLonValue = res.data
                setLocArray(latLonValue)          
            }
        ).catch(
            e=>{
                console.log(e);
                toast('Oops! Cant find the location',{type: "error"})
            }
        )
    }


    useEffect(()=>{
        cityNameByCoords()
    },[loc])

    useEffect(()=>{
        coordsByCityName()
    },[name])

    useEffect(()=>{
        currentDetails()
    },[loc])

    return(
        <WeatherCard />
    )
}

export default Fetchers;

