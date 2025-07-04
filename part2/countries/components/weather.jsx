import axios from 'axios'
import { useState, useEffect} from 'react'

const WeatherDetails = ({capital}) => {
    const [countryWeather, setcountryWeather] = useState({})

    useEffect(() => {
        console.log ('Checking weather...', capital)
 
        if (countryWeather) {
        axios
        .get(`http://api.weatherapi.com/v1/current.json?key=d9885eb179634bc08b1173842250407&q=${capital}`)
        .then(response => {
          setcountryWeather(response.data)
        })
    }
    }, [capital])

    if (!countryWeather.current) {
  return <p>Loading Weather...</p>
    } 
    
    
     
    return (
        <>
        <h1>Weather in {capital}</h1>
        <p>Temperature {countryWeather.current.temp_c} Celsius</p>
        <p><img src={`https:${countryWeather.current.condition.icon}`}/></p>
        <p>Wind {countryWeather.current.wind_kph} m/s</p>
        </>
    )
} 

export default WeatherDetails