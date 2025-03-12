import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

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
    <div className="flex flex-col items-center gap-10 justify-center my-10">
      <h1>Connections</h1>
      <ul className="flex flex-col gap-10 text-base-content mx-[1%] md:mx-[10%]">
        {connections.map((connection) => {
          const user = connection.fromUserId?._id
            ? connection.fromUserId
            : connection.toUserId;

          if (!user?._id) return; // If no user data exists, skip this item.

          const { firstName, lastName, about, photoUrl, age, gender } = user;
          const _id = connection._id;
          {
            /* get userID here and pass that to the parameters down there */
          }
          const userId = connection.fromUserId._id || connection.toUserId._id;
          // console.log(userId);
          // console.log(connection);

          return (
            <li key={_id} className="card lg:card-side bg-base-300 shadow-xl">
              <figure className="w-full h-64 md:h-80">
                {' '}
                {/* Set flexible height */}
                <img
                  className="w-full h-full object-cover" // Let the image fill the container without glitch
                  src={photoUrl}
                  alt="Connection's Profile Photo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                {age && gender && (
                  <p className="text-sm md:text-lg">{age + ', ' + gender}</p>
                )}
                <p className="text-sm md:text-lg">{about}</p>
                <div className="card-actions justify-end">
                  <Link to={'/chat/' + userId}>
                    <button className="btn btn-primary">Chat</button>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
