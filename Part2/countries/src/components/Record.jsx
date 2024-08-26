const Record = ({countryList,handelClick}) => {

  const lineStyle = {
    fontSize : 16,
    margin : 0.8
  }

  return(
      countryList.map(country => <p style={lineStyle} key={country.name.common}>{country.name.common} <button onClick={() => handelClick(country)}> show </button> </p>)
  )
}

export default Record; 