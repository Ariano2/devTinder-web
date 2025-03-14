import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedData } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeedData(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <div className="flex flex-col gap-10 items-center my-10 text-2xl text-base-content font-bold">
        <h1>FEED: Looks like you have run out of matches! </h1>
        <p className="text-xl">
          Please come back again later to find new matches!!
        </p>
      </div>
    );
  return (
    <div className="stack mx-auto my-10">
      {feed &&
        feed.map((user, index) => {
          return <UserCard key={feed[index]._id} user={feed[index]} />;
        })}
    </div>
  );
};

export default Feed;
