import { BrowserRouter, Routes, Route } from 'react-router';

import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Feed from './components/Feed.jsx';
import Connections from './components/Connections.jsx';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import Body from './components/Body.jsx';
import Requests from './components/Requests.jsx';

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="connections" element={<Connections />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="connectionRequests" element={<Requests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
