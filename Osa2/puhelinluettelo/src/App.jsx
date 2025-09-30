import { useState, useEffect } from 'react'
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [message, setMessage] = useState({message: null, type: null})

  useEffect(() => {
    console.log("useEffect ran");
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(persons);
    

    console.log("Add button clicked");

    const personExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    const personToModify = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (personExists) {

      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace old number with the new one?`)

      if (confirmUpdate) {
        personService
          .update(personToModify.id, {...personToModify, number: newPhoneNumber})
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personToModify.id ? p : returnedPerson))
            setMessage({message: `${returnedPerson.name}'s number updated`, type: 'success'})
            setTimeout(() => {
              setMessage({message: null, type: null})
            }, 5000)
          })
          .catch(err => {
            console.log("Modification failed:", err);
            setMessage({message: `Information of ${personToModify.name} is not on the server`, type: 'error'})
            setTimeout(() => {
              setMessage({message: null, type: null})
            }, 5000)
          })
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewPhoneNumber('');

        setMessage({message: `Added ${returnedPerson.name}`, type: 'success'})
        setTimeout(() => {
          setMessage({message: null, type: null})
        }, 5000)
      })
      .catch(err => {
        console.log(err);
        setMessage({message: `Adding ${newPerson.name} Failed`, type: 'error'})
        setTimeout(() => {
          setMessage({message: null, type: null})
        }, 5000)
      })
  }

  const handleDelete = (id, name) => {
    console.log("Id to be deleted", id);

    const confirmDelete = window.confirm(`Delete ${name}?`)

    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage({message: `${name} deleted succesfully`, type: 'success'})
          setTimeout(() => {
            setMessage({message: null, type: null})
          }, 5000)
        })
        .catch(err => {
          console.log("Delete Failed:", err);
          setMessage({message: `Deleting ${newPerson.name} Failed`, type: 'error'})
          setTimeout(() => {
            setMessage({message: null, type: null})
          }, 5000)          
        })
    }

  }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.message} type={message.type} />
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />

      <h3>Add new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} newPhoneNumber={newPhoneNumber} setNewName={setNewName} setNewPhoneNumber={setNewPhoneNumber} />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
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

  const Persons = ( {filteredPersons, handleDelete} ) => {
    
    return (
      <div>
        {filteredPersons.map((person) => (
          <div key={person.id}>
          <p >{person.name} {person.number}</p> 
          <button onClick={(e) => handleDelete(person.id, person.name)} >Delete</button>
          </div>
        ))}
      </div>
    )
  }

  const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${type}`}>
      {message}
    </div>
  )
}

export default App