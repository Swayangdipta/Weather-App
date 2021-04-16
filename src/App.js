import React,{useState} from 'react'
import './App.css';
import WeatherCard from './Components/WeatherCard';
import  {WeatherContext} from './Context/WeatherContext'
import {LocationContext} from './Context/LocationContext'
import { Coords } from './Context/Coords'
import {LocationName} from './Context/LocationName'
import Fetchers from './Components/Fetchers'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import CurrentWeather from './Components/CurrentWeather';
import PageNotFound from './Components/PageNotFound';
import {ThemeContext} from './Context/ThemeContext'
import { LocArrayContext } from './Context/LocArrayContext';


function App() {
  const themeHook = useState('light')
  const coords = useState({
    lat: 22.5726,
    lon: 88.3639
  })

  const loc = useState({
    name: 'Kolkata',
    country: 'IN'
  })

  const locArrayHook = useState([])

  const locName = useState('Kolkata')

  const weather = useState(undefined)

  return (
    <Router>
    <ToastContainer />
    <LocArrayContext.Provider value={locArrayHook}>
    <ThemeContext.Provider value={themeHook}>
    <Coords.Provider value={coords}>
      <WeatherContext.Provider value={weather}>
        <LocationContext.Provider value={loc}>
          <LocationName.Provider value={locName}>
            <div className="App">
            <Switch>
              <Route exact path='/' component={Fetchers} />
              <Route exact path='/current' component={CurrentWeather} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
            </div>
          </LocationName.Provider>
        </LocationContext.Provider>
      </WeatherContext.Provider>
    </Coords.Provider>
    </ThemeContext.Provider>
    </LocArrayContext.Provider>
    </Router>
  );
}

export default App;
