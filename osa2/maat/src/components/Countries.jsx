const Countries = ({ countriesToShow, setUserInput }) => {
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
