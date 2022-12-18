import { useState, useEffect } from 'react'
import numberService from './services/numbers'

const Filter = ({ search, handleChange }) => <div>filter shown with<input value={search} onChange={handleChange}/></div>
const Result = ({ person, handleRemove }) => <p>{person.name} {person.number} <button onClick={() => handleRemove(person.id)}>delete</button></p>
const Results = ({ presentable, handleRemove }) => <div>{presentable.map(person => <Result key={person.number} person={person} handleRemove={handleRemove}/>)} </div>
const NumberForm = ({ submitAction, nameInput, numberInput, handleName, handleNumber }) => {
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

const Notice = ({ message }) => {
  const noticeStyle = {
    color: message.color,
    font: 20,
    backgroundColor: '#E7E1E0',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message.state === null) {
    console.log('message is null', message.state)
    return null
  }
  console.log('message is not null', message.state)
  return (
    <div style={noticeStyle}>
      {message.state}
    </div>

  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch ] = useState('')
  const [notice, setNotice] = useState({state: null, color: 'green'})

  useEffect(() => {
    numberService.getAll().then(phoneBook => setPersons(phoneBook))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleRemove = (id) => {
    const undesirable = persons.find(person => person.id===id)
    if (window.confirm(`Delete ${undesirable.name}`)){
      console.log('removing',id,undesirable)
      numberService.remove(id).then(() => {
      console.log('Setting new persons')
      setPersons(persons.filter(person => person.id !== id))
      setNotice({state: `Removed ${undesirable.name} from the phonebook`, color: 'green'})
      setTimeout(() => setNotice({state: null, color: 'green'}),5000)
      
    }).catch( () => {
      setPersons(persons.filter(person => person.id !== id))
      setNotice({state: `Information of ${undesirable.name} has already been removed from the server`,color: 'red'})
      setTimeout(() => setNotice({state: null, color: 'green'}),5000)
    }
    )
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Creating new person Object')
      const newPerson= {name: newName, number: newNumber, id: persons.length+1}
      while (persons.map(person => person.id).includes(newPerson.id)) {
        newPerson.id+=1
      }
    if (persons.map(person => person.name).includes(newName)) {
      const oldId = persons.find(person => person.name === newName).id
      if (window.confirm(`${newName} is already added to phonebook, replace the oldnumber with a new one?`)){
        newPerson.id=oldId
        numberService.update(oldId,newPerson).then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.map(person => person.name === newPerson.name ? newPerson : person))
        setNewName('')
        setNewNumber('')
        setNotice({state: `${newPerson.name} number changed to ${newPerson.number}`, color: 'green'})
        setTimeout(() => setNotice({state: null, color: 'green'}),5000)
        })
      }
    } else {
      console.log('Adding new person',newPerson.name, newPerson.number, newPerson.id)
      numberService.create(newPerson).then((returnedPerson) => {
        console.log('called axios.put')
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setNotice({state: `Added ${newPerson.name} to the phonebook`, color: 'green'})
        setTimeout(() => setNotice({state: null, color: 'green'}),5000)
      }
      )
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notice message={notice}/>
      <Filter search={search} handleChange={handleSearchChange}/>
      <h3>add a new</h3>
      <NumberForm submitAction={addPerson} nameInput={newName} numberInput={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <h3>Numbers</h3>
        <Results presentable={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))} handleRemove={handleRemove}/>
    </div>
  );
}

export default App;
