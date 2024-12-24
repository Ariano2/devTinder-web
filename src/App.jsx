import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
