const Filter = (props) => {
    const { search,handelSearch } = props; 
    return(
      <div>
        filter shown with : <input id="search" value={search} onChange={handelSearch}/>
      </div>
    )
  }

  export default Filter; 