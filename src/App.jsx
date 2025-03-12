import { BrowserRouter, Routes, Route } from 'react-router';

import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Feed from './components/Feed.jsx';
import Connections from './components/Connections.jsx';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import Body from './components/Body.jsx';
import Requests from './components/Requests.jsx';
import PrivacyPolicy from './components/legal/PrivacyPolicy.jsx';
import TermsAndConditions from './components/legal/TermsAndConditions.jsx';
import CancellationAndRefund from './components/legal/CancellationAndRefund.jsx';
import ShippingAndDelivery from './components/legal/ShippingAndDelivery.jsx';
import AboutUs from './components/company/AboutUs.jsx';
import ContactUs from './components/company/ContactUs.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="connections" element={<Connections />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connectionRequests" element={<Requests />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="termsAndConditions" element={<TermsAndConditions />} />
            <Route path="cancelAndRefund" element={<CancellationAndRefund />} />
            <Route path="shipping" element={<ShippingAndDelivery />} />
            <Route path="chat/:targetId" element={<Chat />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
