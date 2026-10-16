import { useState, useEffect } from 'react'
import Filter from './component/Filter.jsx'
import PersonForm from './component/PersonForm.jsx'
import Persons from './component/Persons.jsx'
import Notification from './component/Notification.jsx'
import personService from './services/persons.js'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const showNotification = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showError = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      )

      if (!confirmUpdate) {
        return
      }

      const updatedPerson = {
        ...existingPerson,
        number:newNumber
      }

      personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(person =>
          person.id === existingPerson.id
            ? returnedPerson
            : person
        ))

        setNewName('')
        setNewNumber('')

        showNotification(`Updated ${returnedPerson.name}`)
      })

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

      showNotification(`Added ${returnedPerson.name}`)
    })
    .catch(() => {
      showError('Failed to add person')
    })
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(
      `Delete ${name}?`
    )

    if (!confirmDelete) {
      return
    }

    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(() => {
      showError(
        `Information of ${name} has already been removed from server`
      )

      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        search={search}
        onChange={event => setSearch(event.target.value)}
      />

      <Notification message={notification}/>
      <ErrorNotification message={errorMessage}/>

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons}
        onDelete={deletePerson} 
      />
    </>
  )
}

export default App