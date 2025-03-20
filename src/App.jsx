import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Item from './pages/Item';
import Items from './pages/Items';
import Checkout from './components/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Biblioteca from './components/Biblioteca';
import Cursos from './pages/Cursos';

const App = () => {
  const [count, setCount] = useState(0);
  // Estado para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  // Estados de autenticação (você pode já ter estes em algum lugar da sua aplicação)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Função para lidar com logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    // Adicione aqui qualquer lógica adicional de logout
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/items" element={<Item searchTerm={searchTerm} />} />
        <Route path="/items/:id" element={<Items />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/curso/:courseId" element={<Cursos />} />

      </Routes>
      <Footer />
    </div>
  )
}

// Envolve tudo corretamente no BrowserRouter
const Main = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Main