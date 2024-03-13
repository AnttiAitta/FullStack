import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/person'

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      Filter by name: <input value={filterText} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({ filteredPersons, handleDelete }) => {
  return(
    <div>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    personService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })

    const newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id, name) => {
    const isConfirmed = window.confirm(
      `Delete ${name}?`
      )
    if (isConfirmed) {
      axios.delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
    })
  }
}

  const filteredPersons = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )

}

export default App