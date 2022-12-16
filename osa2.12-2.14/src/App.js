import { useState, useEffect} from 'react'
import axios from 'axios'

const Show = ({country}) => {
  return (
    <div>
      <h1>{country.name['common']}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <br></br>
      <h3>Languages</h3>
      <Languages country={country}/>
      <br></br>
      <img src={country.flags['png']} alt='Flag of the country'/>
      <h2>Weather in {country.name['common']}</h2>
    </div>
  )
}
const Language = ({language}) => <li>{language}</li> 
const Languages = ({country}) => {
  return (
    <ul>
      {Object.values(country.languages).map(language => <Language key={language} language={language} />)}
    </ul>
  )
}

const Result = ({country, handleClick, index}) => {
  return (
    <div>
    {country.name['common']}
    <button onClick={() => handleClick(index)}>show</button>
    </div>
  )
}
const Results = ({presentable, display, handleDisplay}) => {

  if (display.display) {
    return (
    <div>
      {presentable.map(country => <Result key={country.ccn3} country={country} handleClick={handleDisplay} index={presentable.indexOf(country)}/>)}
      <Show country={presentable[display.index]}/> 
    </div>
    )
  }

  if (1 < presentable.length && presentable.length <= 10){
    return (
      <div>
        {presentable.map(country => <Result key={country.ccn3} country={country} handleClick={handleDisplay} index={presentable.indexOf(country)}/>)}
      </div>
    )
  } else if (presentable.length < 1) {
    return <p>No matches</p>
  } else if (presentable.length === 1){
    return <Show country={presentable[0]}/>
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState({display: false, index: null})

  const handleDisplay = (index) => {
    setDisplay({display: true, index: index})
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setDisplay({display: false, index: null})
  }
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const presentable = countries.filter(country => country.name['common'].toLowerCase().includes(search.toLowerCase()))

  return (
    <div >
      Filter shown with <input value={search} onChange={handleSearchChange}/>
      <Results presentable={presentable} display={display} handleDisplay={handleDisplay}/>
    </div>
  )
}

export default App;
