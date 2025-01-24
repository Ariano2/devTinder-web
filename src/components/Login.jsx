import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'ERROR : LOGIN FAILED');
    }
  };
  const submitSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'ERROR : LOGIN FAILED');
    }
  };
  return (
    <div className="mt-auto">
      <form
        data-theme="dark"
        className="card mx-auto bg-neutral text-neutral-content w-96"
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoginForm) {
            submitLogin();
            return;
          }
          submitSignUp();
        }}
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">firstName</span>
                </div>
                <input
                  type="text"
                  placeholder="Your FirstName"
                  className="input input-bordered w-full max-w-xs text-white"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">lastName</span>
                </div>
                <input
                  type="text"
                  placeholder="Your LastName"
                  className="input input-bordered w-full max-w-xs text-white"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered w-full max-w-xs text-white"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="my-2 form-control w-full max-w-xs text-primary-content">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder="Enter your password!"
              className="input input-bordered w-full max-w-xs text-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-end my-4">
            <button type="submit" className="btn btn-primary">
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <p
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="cursor-pointer hover:text-red-400"
          >
            {isLoginForm ? 'New User? Sign Up' : 'Already a User? Login'}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
