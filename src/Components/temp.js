<div className='weatherBody'>
<div className='weatherCard'>
    <div className="branding">
        <div className="brandName"><h3>Weathering With You</h3></div>
        <div className="searchCity">
            <form className="searchForm">
                <input type="text" onChange={e=>setLocationInput(e.target.value)} placeholder="Enter city name..." className="searchInput" />
                <button className="searchCityButton" onClick={handleSubmit}><i><RiSearchFill size="20px" /></i></button>
            </form>
        </div>
    </div>
    <hr />
    <div className="weatherInfo">
        <div className="currentDayInfo">
            {location !== undefined ? (<div className="locName"><h3>{location.name}</h3></div>):('')}
            <div className="weatherIcon"><img alt="Weather Icon" src={Day} color="white" /></div>
            {weather !== undefined ? (
                <div className="currenteWeather">
                    <h3>Temp: {weather.current.temp} &deg;C</h3>
                    <h3>Humidity: {weather.current.humidity}%</h3>
                    {weather.current.weather !== undefined ? (
                        <h3>Condition: {weather.current.weather.length !== 0 ? (weather.current.weather[0].main):('')}</h3>
                    ): ('')}
                    <h3 className="moreDetails"> <FaArrowCircleRight /></h3>
                </div>
            ) : (
                <div className="currenteWeather"> <h3>Loading...</h3> </div>
            )}

        </div>
        <div className="weeklyForecast">
            <div className="minMax">
                <h3 className="maxTemp">Max</h3>
                <hr className="bar minMaxBar" />
                <h3 className="minTemp">Min</h3>
            </div>

        
        </div>
    </div>
</div>
</div>

ef3c78c0
c80e4dc0