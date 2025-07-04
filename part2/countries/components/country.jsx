import axios from 'axios'
import { useState, useEffect } from 'react'
import WeatherDetails from './weather'

const CountryDetails = ({country}) => {
    const [countryInfo, setCountryInfo] = useState({})

    useEffect(() => {
    console.log ('looking for...', country)

    if (country) {
      console.log('Fetching...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setCountryInfo(response.data)
        })
    } 
  }, [country])

    if (!countryInfo.name) {
  return <p>Loading country details...</p>
}

    return (
        <>
    <h1>{countryInfo.name.common}</h1>
    <p>Capital {countryInfo.capital}<br/>Area {countryInfo.area}</p>
    <h1>Languages</h1>
    <ul>
        {Object.values(countryInfo.languages).map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <p>
        <img src={countryInfo.flags.png} />
    </p>
    <WeatherDetails capital={countryInfo.capital}/>
    </>
)
}

export default CountryDetails