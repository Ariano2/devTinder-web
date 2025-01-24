import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import {
  addConnectionRequests,
  removeConnectionRequest,
} from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Requests = () => {
  const dispatch = useDispatch();

  const connectionRequestList = useSelector(
    (store) => store.connectionRequests
  );
  const getConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      dispatch(addConnectionRequests(res.data.connectionRequestList));
    } catch (err) {
      console.error(err.message);
    }
  };
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeConnectionRequest(res.data.connectionRequest._id));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getConnectionRequests();
  }, []);
  if (!connectionRequestList) return;
  if (connectionRequestList.length === 0) {
    return (
      <div className="flex  justify-center my-10 text-2xl font-bold">
        <h1>No Pending Friend Requests</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-10 justify-center my-10 text-2xl text-primary font-bold">
      <h1>Friend Requests</h1>
      <ul className="flex flex-col gap-10">
        {connectionRequestList.map((con) => {
          const { firstName, lastName, about, photoUrl, gender, age } =
            con.fromUserId;
          return (
            <li
              key={con.fromUserId._id}
              className="card lg:card-side bg-base-300 shadow-xl"
            >
              <figure>
                <img src={photoUrl} alt="Connection's Profile Photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                {age && gender && <p>{age + ', ' + gender}</p>}
                {<p>{about}</p>}
                <div>
                  <div className="card-actions justify-center my-2">
                    <button
                      onClick={() => {
                        reviewRequest('rejected', con._id);
                      }}
                      className="btn btn-secondary mx-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        reviewRequest('accepted', con._id);
                      }}
                      className="btn btn-primary mx-2"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
