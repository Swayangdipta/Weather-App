import React,{useState} from 'react'
import {LocationContext} from './LocationContext'

const LocationProvider = (props) => {
    const [locName,setLocName] = useState('Delhi')
    return(
        <LocationContext.Provider value={{
            data: locName,
            changeLocName: (loc) => setLocName(loc)
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationProvider