import { useState, useEffect } from 'react'
import axios from 'axios'
import Add from '/components/add'
import Search from '/components/search'
import Render from '/components/render'
import phonesService from './services/phones'
import './index.css'

const NotificationA = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='add'>
      {message}
    </div>
  )
}

const NotificationE = ({message}) => {
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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState (null)
  useEffect(() => {
    phonesService
      .getAll()
      .then(phonesNumber => {
        setPersons(phonesNumber)
      })
  })
  
  
  //console.log('render', persons.length, 'persons')

  const handleDelete = (id,name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      axios
        .delete(`/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`the person '${name}' was already deleted from the server.`)
          setPersons(persons.filter(person => person.id !== id))
        })
    console.log('delete')
   } 
}
  const handleAdd = (event) => {
          event.preventDefault()
          const nameObject = {
            name: newName,
            number: newNumber
          }
          const nameExists = persons.some(person => person.name === newName)
          if (nameExists) {
            if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
              phonesService
                const personToUpdate = persons.find(p => p.name === newName)
                const updatedPerson = {...personToUpdate, number:newNumber}

                phonesService
                axios
                .put(`/persons/${personToUpdate.id}`, updatedPerson)
                .then(returnedPerson => {
                  setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
                  setNewName('')
                  setNewNumber('')
                })
                .catch(error => {
                  setErrorMessage(
                    `Information of ${newName} has already been removed from server`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  },5000)
                  
                })
            }
            
          } else {
            
            phonesService
              .create(nameObject)
              .then(returnedPerson => {
                setPersons([...persons, returnedPerson])
                setAddMessage(
                  `Added ${newName}`
                )
                setTimeout(() => {
                  setAddMessage(null)
                },5000)
                setNewName('')
                setNewNumber('')
            })
          }
          
        }


  return (
    <div>
      
      <h2>Phonebook</h2>
      <NotificationA message={addMessage} />
      <NotificationE message={errorMessage} />
      <Search 
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
      <Add 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        handleAdd={handleAdd}
      />
      <Render 
        newSearch={newSearch}
        persons={persons}
        handleDelete={handleDelete}
      />
      
    </div>
  )
}

export default App