import { useEffect } from 'react'

const Countries = ({ countriesToShow, setUserInput, countriesService, setWeather, weather }) => {
useEffect(() => {
    if (countriesToShow.length === 1) {
        countriesService
            .getWeatherByName(countriesToShow[0].capital)
            .then(response => {
                setWeather(response.data)
            })
    }
}, [countriesToShow])

if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
} else if (countriesToShow.length === 1) {
    const flagSrc = countriesToShow[0].flags.png
    return (
        <div>
            <h1>{countriesToShow[0].name.common}</h1>
            <p>Capital {countriesToShow[0].capital}</p>
            <p>Area {countriesToShow[0].area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(countriesToShow[0].languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img src={flagSrc} alt="Photo of country flag" />
            <h2>Weather in {countriesToShow[0].capital}</h2>
            {weather.main && <p>Temperature {weather.main.temp} Celsius</p>}
            {weather.weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />}
            {weather.wind && <p>Wind {weather.wind.speed} m/s</p>}
        </div>
    )
}

return (
    countriesToShow.map(country =>
        <p key={country.cca2}>
            {country.name.common}
            <button onClick={() => setUserInput(country.name.common)}>
                Show
            </button>
        </p>
    )
)
}

export default Countries
