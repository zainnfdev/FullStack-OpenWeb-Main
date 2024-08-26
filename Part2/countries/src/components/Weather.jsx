const Weather = ({data,city}) => {

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>tempreture {data.main.temp} C° </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={`Weather Image of ${city}`} />
            <p>wind {data.wind.speed} m/s </p>
        </div>
    )
}

export default Weather; 

//<img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`} alt={`Weather Image of ${city}`} />