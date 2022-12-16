import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({search, handleChange}) => <div>filter shown with<input value={search} onChange={handleChange}/></div>
const Result = ({person}) => <p>{person.name} {person.number}</p>
const Results = ({presentable}) => <div>{presentable.map(person => <Result key={person.number} person={person}/>)}</div>
const NumberForm = ({submitAction, nameInput, numberInput, handleName, handleNumber}) => {
  return (
    <form onSubmit={submitAction}>
        <div>
          name: <input value={nameInput} onChange={handleName}/>
        </div>
        <div>
          number: <input value={numberInput} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber}))
    }
  }

  const presentable = persons.filter(person => person.name.toLowerCase().includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleChange={handleSearchChange}/>
      <h3>add a new</h3>
      <NumberForm submitAction={addPerson} nameInput={newName} numberInput={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <h3>Numbers</h3>
        <Results presentable={presentable}/>
    </div>
  );
}

export default App;