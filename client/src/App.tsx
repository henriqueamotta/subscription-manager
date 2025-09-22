import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  // Por enquanto, o App só renderiza a rota filha correspondente
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
