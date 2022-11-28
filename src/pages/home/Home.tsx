import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { RingLoader } from 'react-spinners';
import { Table } from 'reactstrap';

import ModalNameDetail from '../../components/modal/Modal';
import { useAppDispatch, useAppSelecetor } from '../../store/hooks';
import { EyeOn } from '../../components';
import {
  getCountries,
  ICountryType,
} from '../../features/countries/countriesSlice';
import './styles.scss';

const Home = () => {
  const { countries, isLoading } = useAppSelecetor((state) => state.countries);
  const [countryId, setCountryId] = useState<string | undefined>('');
  const [popup, setPopup] = useState(false);
  const [currentCountries, setCurrentCountries] = useState<ICountryType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 16;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentCountries(countries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(countries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, countries]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % countries.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  if (isLoading) {
    return (
      <div className="home__loader">
        <RingLoader color="#57b846" />;
      </div>
    );
  }

  return (
    <main className="container home">
      <Table striped responsive>
        <thead>
          <tr>
            <th>cca2</th>
            <th>Common Name</th>
            <th>Capital</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries &&
            currentCountries.map((country) => {
              return (
                <tr key={country.cca3}>
                  <th scope="row" className="home__table-cca">
                    <span>{country.cca2}</span>
                  </th>
                  <td>
                    <div
                      className="home__table-name"
                      onClick={() => {
                        setPopup(!popup);
                        setCountryId(country.cca3);
                      }}
                    >
                      <span>{country.name?.common}</span>
                    </div>
                  </td>
                  <td>{country.capital}</td>
                  <td className="home__table-show">
                    <Link to={`/country/${country.cca3}`}>
                      <EyeOn />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="home__pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null as any}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          marginPagesDisplayed={2}
        />
      </div>
      <ModalNameDetail
        countryId={countryId}
        popup={popup}
        setPopup={setPopup}
      />
    </main>
  );
};

export default Home;
