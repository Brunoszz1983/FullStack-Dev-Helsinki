
const Add = ({newName, setNewName, newNumber, setNewNumber, handleAdd}) => {

  const handleNewNumberChange = (event) => {
    //console.log (event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewNameChange = (event) => {
    //console.log (event.target.value)
    setNewName(event.target.value)
  }

    return (
        <div>
            <h2>add a new</h2>
            <form onSubmit={handleAdd}>
            <div> name: <input value={newName} onChange={handleNewNameChange}/> </div>
            <div> number: <input value={newNumber} onChange={handleNewNumberChange}/> </div>
            <div>
            <button type="submit">add</button>
            </div>
            </form>
        </div>
    )
}

export default Add