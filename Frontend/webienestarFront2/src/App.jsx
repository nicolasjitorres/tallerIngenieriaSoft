import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './paginas/Dashboard/Dashboard';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;