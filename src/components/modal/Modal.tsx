import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { getCountry } from '../../features/country/countrySlice';
import { useAppDispatch, useAppSelecetor } from '../../store/hooks';
import './styles.scss';

interface IPops {
  countryId: string | undefined;
  popup: boolean;
  setPopup: (popup: boolean) => void;
}

const ModalNameDetail = ({ countryId, popup, setPopup }: IPops) => {
  const { country } = useAppSelecetor((state) => state.country);
  const dispatch = useAppDispatch();
  const currencyArray = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0]
    : null;

  useEffect(() => {
    if (countryId) {
      dispatch(getCountry(countryId));
    }
  }, [countryId]);

  return (
    <Modal isOpen={popup} toggle={() => setPopup(!popup)} className="popup">
      <ModalHeader toggle={() => setPopup(!popup)} className="popup__title">
        {country.flags?.svg ? (
          <img src={country.flags?.svg} alt="flag" width="30" height="30" />
        ) : country.flags?.png ? (
          <img src={country.flags?.png} alt="flag" width="30" height="30" />
        ) : null}
        {country.name?.common}
      </ModalHeader>
      <ModalBody>
        <p>
          <strong>Common Name: </strong> {country.name?.common}
        </p>
        <p>
          <strong>Official Name: </strong>
          {country.name?.official}
        </p>
        <hr />
        <h4>Native Name</h4>
        <p>
          <strong>Common Name: </strong>
          {currencyArray?.common}
        </p>
        <p>
          <strong>Official Name: </strong>
          {currencyArray?.official}
        </p>
      </ModalBody>
    </Modal>
  );
};

export default ModalNameDetail;
