import { useState } from 'react'
import Search from './components/Search'
import { useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [countriesList, setCountries] = useState([])
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value)
  }

  const countriesToShow = userInput.trim() === ""
    ? countriesList
    : countriesList.filter(country =>
        country.name.common.toLowerCase().includes(userInput.toLowerCase())
      )

  return (
    <div>
      <Search userInput={userInput} handleSearch={handleSearch}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App
