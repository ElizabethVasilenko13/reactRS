import React, { useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import { setCountries } from '@store/countries/countries.slice';
import { Country } from '@models/api.interface';

const CountryFetcher: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Country[] = await response.json();
        const countryNames = data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b));

        dispatch(setCountries(countryNames));
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, [dispatch]);

  return null;
};

export default CountryFetcher;
