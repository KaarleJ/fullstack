import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    },5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Notification notification={notification}/>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
          <Route path="anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/createnew" element={<CreateNew addNew={addNew}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
