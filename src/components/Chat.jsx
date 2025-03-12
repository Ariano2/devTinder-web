import { useEffect, useState } from 'react';
import { BASE_URL, MAX_MESSAGE_SIZE } from '../utils/constants';
import { createSocketConnection } from './../utils/socket';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';

const getMessages = async (targetId) => {
  try {
    const chat = await axios.get(BASE_URL + '/chat/' + targetId, {
      withCredentials: true,
    });
    return chat.data.messages;
  } catch (err) {
    console.log(err);
  }
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageQueue, setMessageQueue] = useState([]);
  const params = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const targetId = params.targetId;
  useEffect(() => {
    getMessages(targetId).then((chat) => {
      setMessageQueue(chat);
    });
  }, []);
  useState(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit('joinChat', { userId, targetId });
    socket.on('receivedMessage', (data) => {
      setMessageQueue((messageQueue) => [...messageQueue, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);
  return (
    <div className="border border-white h-[90vh] my-10 mx-[10%] flex flex-col justify-between">
      <div className="flex-grow flex flex-col-reverse px-4 overflow-y-scroll h-[65%]">
        {/* Display Messages here */}
        {messageQueue.map((data, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                {data.senderId.firstName}
                <time className="text-xs opacity-50 ml-1">
                  {new Date(data.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="chat-bubble">{data.text}</div>
            </div>
          );
        })}
      </div>
      <div className="relative flex-grow h-[35%]">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-full h-full pr-10 static p-2"
          maxLength={MAX_MESSAGE_SIZE}
        ></textarea>
        <button
          onClick={() => {
            const msg = message.trim();
            const socket = createSocketConnection();
            socket.emit('sendMessage', {
              userId,
              targetId,
              firstName: user.firstName,
              message: msg,
              timeStamp: new Date(),
            });
            setMessage('');
          }}
          className="md:text-xl bg-secondary absolute bottom-0 rounded-lg right-0 z-10 p-2 text-primary-content"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
