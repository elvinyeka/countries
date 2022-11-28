import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import {
  CurrenciesType,
  getCountry,
} from '../../features/country/countrySlice';

import { useAppDispatch, useAppSelecetor } from '../../store/hooks';

import './styles.scss';

const CountryDetail = () => {
  const { countryId } = useParams();
  const dispatch = useAppDispatch();
  const { country } = useAppSelecetor((state) => state.country);

  const currencyArray = country.currencies
    ? Object.values(country.currencies as CurrenciesType)
    : null;

  useEffect(() => {
    dispatch(getCountry(countryId));
  }, []);
  return (
    <section className="detail">
      <Breadcrumb className="detail__breadcrumb container">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Country Detail</BreadcrumbItem>
      </Breadcrumb>

      <Table bordered hover responsive className="container ">
        <tbody>
          <tr>
            <th scope="row" style={{ width: '15%' }}>
              Common Name
            </th>
            <td>{country.name?.common}</td>
          </tr>
          <tr>
            <th scope="row" style={{ width: '15%' }}>
              Official Name
            </th>
            <td>{country.name?.official}</td>
          </tr>
          <tr>
            <th scope="row" className="home__table-cca">
              Currencies
            </th>
            <td>
              {currencyArray &&
                currencyArray.map((currency) => {
                  return (
                    <div>
                      <span>{currency.name}</span>
                      {` `} - {` `} <span>{currency.symbol}</span>
                    </div>
                  );
                })}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ width: '15%' }}>
              Languages
            </th>
            <td>
              {country.languages &&
                Object.keys(country.languages).map((language, i) => (
                  <span key={language}>
                    {country.languages[language]}
                    {i === language.length - 1 ? '' : ' | '}
                  </span>
                ))}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ width: '15%' }}>
              Flag
            </th>
            <td>
              {country.flags?.svg ? (
                <img
                  src={country.flags?.svg}
                  alt="flag"
                  width="50"
                  height="50"
                />
              ) : country.flags?.png ? (
                <img
                  src={country.flags?.png}
                  alt="flag"
                  width="50"
                  height="50"
                />
              ) : null}
            </td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default CountryDetail;
