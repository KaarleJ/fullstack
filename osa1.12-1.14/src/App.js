import { useState } from 'react'

const randInt = (max) => Math.floor(Math.random()*max)

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleKlick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] =useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)

  const nextAnecdote = () => {
    setSelected(randInt(anecdotes.length))
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected]+=1
    setPoints(newPoints)
    if (newPoints[selected]>points[max]) {
      setMax(selected)
    }
  }

  return (
    <>
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
    </div>
    <div>
      <Button handleKlick={vote} text='vote'/>
      <Button handleKlick={nextAnecdote} text='next anecdote'/>
    </div>
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[max]}
    </div>
    </>
  )
}

export default App