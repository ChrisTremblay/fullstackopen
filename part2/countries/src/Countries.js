import Country from './Country';
import { useState } from 'react';
const Countries = ({ countries }) => {
  const [country, setCountry] = useState(null);
  const handleClick = (country) => {
    setCountry(country);
  };
  return (
    <div>
      <h2>Countries</h2>
      {countries.length <= 10 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => handleClick(country)}>View</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Too many results, keep on being more specific</div>
      )}
      {country && <Country key={country.name.common} country={country} />}
    </div>
  );
};

export default Countries;
