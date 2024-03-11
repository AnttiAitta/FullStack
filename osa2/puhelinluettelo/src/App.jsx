import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendick', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={filterText} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
        <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App