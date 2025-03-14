import NavBar from './NavBar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Body = () => {
  const theme = useSelector((store) => store.theme) || 'light';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.status === 401) {
        navigate('/login');
      } else {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const setTheme = (theme) => {
    const rootHTML = document.querySelector('html');
    if (theme === 'light') rootHTML?.setAttribute('data-theme', 'cyberpunk');
    else rootHTML?.setAttribute('data-theme', 'dark');
  };
  useEffect(() => {
    setTheme(theme);
  }, [theme]);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
