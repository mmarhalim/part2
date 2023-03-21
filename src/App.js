import { useState, useEffect } from 'react'
import services from './services/services'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import NumbersToShow from './components/NumbersToShow'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

 useEffect(() => {
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
 }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.map(person => person.name).includes(newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      services
        .update(persons.find(person => person.name === newName).id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      services
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      services
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add A New Number</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <NumbersToShow persons={persons} newFilter={newFilter} removePerson={removePerson}/>
    </div>
  )
}

export default App