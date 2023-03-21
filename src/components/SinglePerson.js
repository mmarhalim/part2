const SinglePerson = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <input type="button" value="Delete" onClick={removePerson} />
    </div>
  )
}

export default SinglePerson