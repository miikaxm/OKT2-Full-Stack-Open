import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")

    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        console.log(response)
      })
  }

  const personsToShow = newSearch.trim() === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h3>add a new</h3>

      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App