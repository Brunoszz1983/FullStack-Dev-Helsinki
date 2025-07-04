import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from '/components/search'

function App() {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
    const countryFiltered = countryList.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()) )
    setCountry(countryFiltered)
  }

  const hook = () => {
    console.log('Getting Names...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then (response => {
        const dataNames = response.data
        const countryNames = dataNames.map(dataNames => dataNames.name.common)
        setCountryList(countryNames)
      })
  }



  useEffect(hook, [])
return (
  <div>
    find countries: <input value={value} onChange={handleChange} />
    <SearchResult country={country}/>
  </div>
)
}

export default App