const Search = (props) => {
  return (
    <form>
        <div>
          find countries <input value={props.newSearch} onChange={props.handleSearch}/>
        </div>
    </form>
  )
}

export default Search