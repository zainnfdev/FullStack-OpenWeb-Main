import Weather from "./Weather";

const Country = ({country,weather,city}) => {

    return(
      <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} sq km</p>
            <p>Languages:</p>
            <ul>{Object.values(country.languages).map((language,id) => (<li key={id}>{language}</li>))}</ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            {Weather ? <Weather data={weather} city={city}/> : null }
      </div>
    )
  }

  export default Country; 