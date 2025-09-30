import { useState, useEffect } from "react"
import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}api/all`)
    .then(response => {
      setCountries(response.data)
      
    })
  }, [])

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filterTerm.toLowerCase())
  )

//console.log(countries[1].name.common);

  return (
    <div>
      Find countries <input type="text" value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)}/>
      <Countries countries={filteredCountries} setFilterTerm={setFilterTerm}/>
    </div>
  )
}

const Countries = ( {countries, setFilterTerm} ) => {

  const [weather, setWeather] = useState();

  const handleShowClick = (name) => {
    setFilterTerm(name);
  }

  useEffect(() => {
    if (countries.length === 1) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&units=metric&appid=${apiKey}`)
        .then(res => {
          console.log(res.data)
          setWeather(res.data)
        })
        .catch(err => console.error(err))
    }
  }, [countries])

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter!
      </div>
    )
  }
  
  if (countries.length === 1) {

    return (
      <div>
        <h1> {countries[0].name.common} </h1>
        <p> Capital {countries[0].capital} </p>
        <p> Area {countries[0].area} </p>
        <h2> Languages </h2>
        <ul>
        {Object.values(countries[0].languages).map((language, index) => (
        <li key={index}>{language} </li>
        ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        <h2> Weather in {countries[0].name.common} </h2>
        {weather &&
        <div>
        <p> Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
        <p> Wind {weather.wind.speed} m/s </p>
        </div>
        }
      </div>
    )
  }

  return (
    <div>
      {countries.map((country, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
            marginBottom: '5px',
            marginTop: '5px'
          }}
        >
          <span>{country.name.common}</span>
          <button onClick={(e) => handleShowClick(country.name.common)}> Show </button>
        </div>
      ))}
        </div>
      )
  }

export default App