import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { useState } from 'react';
import { BASE_URL } from './../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [error, setError] = useState();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user?.age || 'age not set');
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user?.gender || 'unspecified gender');
  const [about, setAbout] = useState(user?.about || 'This is default About');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError();
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, photoUrl, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.loggedInUser));
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    user && (
      <>
        {updateSuccess && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        <div className="flex flex-col my-4 gap-5 items-center lg:flex lg:flex-row lg:gap-10 lg:px-[20%] lg:py-10">
          <div className="card-body items-center text-center bg-base-200">
            <h2 className="card-title">Update Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">firstName</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">age</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <select
              defaultValue={user.gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="select select-primary mt-4 w-full max-w-xs"
            >
              <option value="select" disabled>
                Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">photoUrl</span>
              </div>
              <input
                type="url"
                className="input input-bordered w-full max-w-xs"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 "
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              ></textarea>
            </label>
            {error && <p className="text-error">{error}</p>}
            <div className="card-actions justify-end my-4">
              <button
                type="submit"
                onClick={saveProfile}
                className="btn btn-primary"
              >
                Save Profile
              </button>
            </div>
          </div>
          <div className="pointer-events-none">
            <UserCard
              user={{ firstName, lastName, age, photoUrl, gender, about }}
            />
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
