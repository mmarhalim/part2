import SinglePerson from "./SinglePerson"

const NumbersToShow = ({ persons, newFilter, removePerson }) => {
  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      {numbersToShow.map(person => <SinglePerson key={person.id} person={person} removePerson={() => removePerson(person.id)} />)}
    </div>
  )
}

export default NumbersToShow