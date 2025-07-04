import CountryDetails from './country'
import { useState} from 'react'

const SearchResult = ({country}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    const selectCountry = (value) => {
        setSelectedCountry(value)
    }

    const message = () => {
        if (selectedCountry) {
            return (
                <CountryDetails country={selectedCountry}/>
            )
        } if (country.length > 10){
            return 'Too many matches...'
        } if (country.length > 1) {
            return (
                <ul>
                {country.map(c => <li key={c}>{c} <button onClick={() => selectCountry(c)}>Show</button></li>) }
                </ul>
            )
        } if (country.length === 1) {
            return (
                <CountryDetails country={country}/>
            )
        } if (country.length === 0) {
            return 'No matches Found'
        } 
    }
    return (
        <div>
            {message()}
        </div>
    )
}

export default SearchResult