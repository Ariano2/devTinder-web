import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Please provide a valid photoUrl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && (
          <p>{age + ', ' + gender[0].toUpperCase() + gender.slice(1)}</p>
        )}
        {about && <p>{about}</p>}
        <div className="card-actions my-6 justify-around flex font-semibold">
          <button
            onClick={() => {
              handleRequest('ignored', _id);
            }}
            className="btn btn-secondary"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              handleRequest('interested', _id);
            }}
            className="btn btn-success"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
