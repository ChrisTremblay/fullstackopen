import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div>
      <h2>Details of {country.name.common}</h2>
      <h3>Capital: {country.capital}</h3>
      <h3>Area: {country.area}</h3>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li>{value}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Flag:</h3>
        <img src={country.flags.png} />
      </div>
      <Weather
        key={country.name.common}
        capital={country.capital}
        latitude={country.latlng[0]}
        longitude={country.latlng[1]}
      />
    </div>
  );
};

export default Country;
