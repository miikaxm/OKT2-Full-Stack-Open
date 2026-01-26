import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
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

    const existingPerson = persons.find(p => p.name === newName)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        personService
          .update(existingPerson.id, personObject)
          .catch(error => {
            setErrorMessage(
              `Information of ${personObject.name} has already been removed from`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2500);
          })
          .then(response => {
            setPersons(
              persons.map(p =>
                p.id !== existingPerson.id ? p : response.data
              )
            )
            setNewName("")
            setNewNumber("")
            setErrorMessage(
              `Changed ${existingPerson.name}'s number to ${personObject.number}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2500);
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
        setErrorMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)
      })
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        })

  }


  const deletePerson = (id) => {
    if (window.confirm("Poistetaanko henkilö?")) {
      personService
        .DelPerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setErrorMessage(
            `Removed ${persons.find(p => p.id === id)?.name}`
          
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
        })
        
    }
  }

  const personsToShow = newSearch.trim() === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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

      <Persons 
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
      
    </div>
  )

}

export default App