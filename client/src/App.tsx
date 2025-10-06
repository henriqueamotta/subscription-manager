import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;
