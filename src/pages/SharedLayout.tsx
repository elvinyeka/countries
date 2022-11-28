import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
