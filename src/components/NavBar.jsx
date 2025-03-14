import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from './../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { removeConnections } from '../utils/connectionSlice';
import { toggleTheme } from '../utils/themeSlice';
const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      // clear the reduxStore and navigate to login page
      dispatch(removeUser());
      dispatch(removeConnections());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-base-300 z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-md md:text-3xl">
          👨‍💻DevTinder👩‍💻
        </Link>
      </div>
      <div className="form-control mx-2">
        <label className="label cursor-pointer">
          <span className="label-text mx-1">Theme</span>
          <input
            onClick={() => {
              dispatch(toggleTheme());
            }}
            type="checkbox"
            className="toggle rounded-xl"
            defaultChecked
          />
        </label>
      </div>
      {user && (
        <div className="hidden lg:inline-block">
          <span>Hello {user.firstName}</span>
        </div>
      )}
      <div className="flex-none mx-6 gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/connectionRequests">Friend Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
