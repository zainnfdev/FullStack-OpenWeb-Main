import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import Record from "./components/Record";
import Country from "./components/Country";



const App = () => {

  const [ countries,setCountries ] = useState([]); 
  const [ listToShow,setListToShow ] = useState([]); 
  const [ value,setValue ] = useState('');
  const [ message,setMessag ] = useState(``); 
  const [ country,setCountry ] = useState(null); 
  const [ weather,setWeather ] = useState(null); 
  const [ city,setCity ] = useState(`Helsinki`); 

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

  const urlCountryData = `https://restcountries.com/v3.1/all`;
  const urlWeatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; 

  useEffect(() => {
    axios.get(urlCountryData).then(response => setCountries(response.data)).catch(error => {
      console.log(`Error fetching data from the server`,error); 
    })

    const tempList = countries.filter(country => country.name.common.toLowerCase().includes(value.toLocaleLowerCase()));
    
    if(tempList.length > 10){
      setMessag(`Too many matches, specify another filter`); 
    } else if(tempList.length < 10 && tempList.length > 1) {
      setListToShow(tempList);
      setMessag('');
    }
  },[value]) 


  useEffect(() => {

    axios.get(urlWeatherData).then(response => {
      setWeather(response.data); 
    }).catch(error => {
      console.log(`Error fetching data from the OpenWeatherMap server`,error); 
    })
  },[country]) 

  const handelChange = (event) => {
    setValue(event.target.value); 
  }

  const handelClick = (country) => {
    setCountry(country); 
    setCity(country.capital[0]);
  }

  return(
    <div>
      <h1>Country List</h1>
      <form>
            find countries : <input value={value} onChange={handelChange}/>
      </form>
      <br/>
      <p>{message}</p>
      <Record countryList={listToShow} handelClick={handelClick} />
      {country ? <Country country={country} weather={weather} city={city} /> : null}
    </div>
  )
}

export default App; 