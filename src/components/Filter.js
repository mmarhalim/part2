const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>Filter People by Name: <input value={newFilter} onChange={handleFilterChange} /> </div>
  )
}

export default Filter