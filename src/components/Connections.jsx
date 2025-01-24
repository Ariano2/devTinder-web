import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connections));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex flex-col gap-10 items-center my-10 text-2xl font-bold text-primary-content">
        <h1>You have no Connections, Yet!</h1>
        <p className="text-xl">
          Please head over to the feed to find friends and make new connections
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-10 justify-center my-10 text-2xl font-bold">
      <h1>Connections</h1>
      <ul className="flex flex-col gap-10 text-primary">
        {connections.map((connection) => {
          if (connection.fromUserId?._id) {
            const { firstName, lastName, about, photoUrl, age, gender } =
              connection.fromUserId;
            const _id = connection._id;
            return (
              <li key={_id} className="card lg:card-side bg-base-300 shadow-xl">
                <figure>
                  <img src={photoUrl} alt="Connection's Profile Photo" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                  {age && gender && (
                    <p className="text-lg md:text-2xl">{age + ', ' + gender}</p>
                  )}
                  {<p className="text-lg md:text-2xl">{about}</p>}
                </div>
              </li>
            );
          } else {
            const { firstName, lastName, about, photoUrl, age, gender } =
              connection.toUserId;
            const _id = connection._id;
            return (
              <li key={_id} className="card lg:card-side bg-base-300 shadow-xl">
                <figure>
                  <img src={photoUrl} alt="Connection's Profile Photo" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                  {age && gender && (
                    <p className="text-lg md:text-2xl">{age + ', ' + gender}</p>
                  )}
                  {<p className="text-lg md:text-2xl">{about}</p>}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Connections;
