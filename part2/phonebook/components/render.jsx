const Render = ({newSearch, persons, handleDelete}) => {
    const personsToShow = newSearch
    ? persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons;


    return (
        <>
        <h2>Numbers</h2>
        {personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Remove</button></p>
      )}
        </>
    )
}

export default Render