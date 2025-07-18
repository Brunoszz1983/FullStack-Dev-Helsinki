import { useState, useEffect } from 'react'
import Footer from '/components/Footer'
import axios from 'axios'
import Note from '/components/Note'
import noteService from './services/notes'
import './index.css'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])


  const hook = () => {
  console.log('effect')
  axios
    .get('/api/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }

  useEffect(hook, [])
 //console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
//Cleaner Syntax for Defining Object Literals
  noteService
    .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })

  

  }


  const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = {...note, important: !note.important}

      noteService
        .update(id,changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
        })
        .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter(n => n.id !== id))
    })
    }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App