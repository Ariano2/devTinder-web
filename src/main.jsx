import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Connections from './components/Connections.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="connections" element={<Connections />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
