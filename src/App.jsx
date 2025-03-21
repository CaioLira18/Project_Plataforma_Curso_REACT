import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Item from './pages/Item.jsx';
import Items from './pages/Items.jsx';
import Checkout from './components/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Biblioteca from './components/Biblioteca.jsx';
import Cursos from './pages/Cursos.jsx';

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