import { logoutUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelecetor } from '../../store/hooks';
import './styles.scss';

const Navbar = () => {
  const { user } = useAppSelecetor((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="navbar">
      <div className="container navbar__inner">
        <h2 className="navbar__logo">Countries</h2>
        <button
          className="navbar__logout"
          type="button"
          onClick={() => dispatch(logoutUser('Logging out...'))}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
