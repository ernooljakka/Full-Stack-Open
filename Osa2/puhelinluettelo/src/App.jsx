import { use, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleAdd = (e) => {
    e.preventDefault();

    console.log("Add button clicked");

    const personExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if (personExists) {
      alert (`${newName} is already in the phonebook`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }

    setPersons(persons.concat(newPerson));

    console.log(persons);

    setNewName('');
    setNewPhoneNumber('');
  } 
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />

      <h3>Add new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} newPhoneNumber={newPhoneNumber} setNewName={setNewName} setNewPhoneNumber={setNewPhoneNumber} />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )

}

  const Filter = ( {filterTerm, setFilterTerm} ) => {

    return (
      <div>
        Filter shown with <input type="text" value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)}/>
      </div>
    )
  }

  const PersonForm = ( {handleAdd, newName, newPhoneNumber, setNewName, setNewPhoneNumber} ) => {

    return (
      <form onSubmit={handleAdd}>
        <div>
          Name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required/>
        </div>
        <div>
          Number: <input type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  const Persons = ( {filteredPersons} ) => {
    
    return (
      <div>
        {filteredPersons.map((person, index) => (
          <p key={index}>{person.name} {person.number}</p>
        ))}
      </div>
    )
  }

export default App