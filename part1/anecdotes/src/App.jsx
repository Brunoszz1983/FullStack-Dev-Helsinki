import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState ({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0, 6:0, 7:0 })
  
const handleAnecdote = () => {
  const ranNumber = Math.floor(Math.random() * 7);
  setSelected(ranNumber)
}

const handleVotes = () => {
  const copy = {...votes}
  copy[selected] += 1
  setVotes(copy)
}

const maxVotes = () => {
  const votesArray = Object.values(votes)
  const maxVote = Math.max(...votesArray)
  const maxAnecdote = Object.keys(votesArray).find((key) => votesArray[key] === maxVote)
  return {maxVote , maxAnecdote}
}

const {maxVote , maxAnecdote} = maxVotes()
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>
      <p>&nbsp;</p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxAnecdote]}</p>
      <p>has {maxVote} votes</p>
    </div>
  )
}

export default App