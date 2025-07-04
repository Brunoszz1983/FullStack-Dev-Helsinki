
const Search = ({setNewSearch,newSearch}) => {
    const handleLookFor = (event) => {
    console.log (event.target.value)
    setNewSearch(event.target.value)
  }
    return (
        <div>
        <div> filter shown with <input value={newSearch} onChange={handleLookFor}/> </div>
        </div>
    )
}

export default Search