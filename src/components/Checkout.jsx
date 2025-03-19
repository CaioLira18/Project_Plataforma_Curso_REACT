import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("credit");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Por favor, faça login para finalizar a compra");
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUserEmail(parsedUser.email || "");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Seu carrinho está vazio");
      navigate("/");
      return;
    }
    setCartItems(cart);
  }, [navigate]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const removeItemFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const totalItems = updatedCart.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartCount", totalItems);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: totalItems } }));
  };

  const handleFinishOrder = async (e) => {
    e.preventDefault();
    if (!address.street || !address.number || !address.city || !address.state || !address.zipCode) {
      alert("Por favor, preencha todos os campos de endereço");
      return;
    }

    try {
      const orderData = {
        userEmail,
        items: cartItems,
        totalAmount: calculateTotal(),
        shippingAddress: address,
        paymentMethod,
        orderDate: new Date().toISOString(),
        status: "pending"
      };
      
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const orderId = Date.now();
      orders.push({ id: orderId, ...orderData });
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.removeItem("cart");
      localStorage.setItem("cartCount", "0");
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Ocorreu um erro ao finalizar seu pedido. Por favor, tente novamente.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Finalizar Compra</h1>
      <div className="checkout-grid">
        <div className="checkout-items">
          <h2 className="checkout-items-title">Itens do Carrinho</h2>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <span>{item.price} × {item.quantity}</span>
                <button onClick={() => removeItemFromCart(item.id)}>Remover</button>
              </div>
            </div>
          ))}
          <div className="checkout-total">Total: R$ {calculateTotal().replace('.', ',')}</div>
        </div>
        <div className="checkout-form">
          <h2>Informações de Entrega</h2>
          <form onSubmit={handleFinishOrder}>
            <label>Email:</label>
            <input type="text" value={userEmail} disabled />
            <label>Rua:</label>
            <input type="text" name="street" value={address.street} onChange={handleAddressChange} required />
            <label>Número:</label>
            <input type="text" name="number" value={address.number} onChange={handleAddressChange} required />
            <label>Cidade:</label>
            <input type="text" name="city" value={address.city} onChange={handleAddressChange} required />
            <label>Estado:</label>
            <input type="text" name="state" value={address.state} onChange={handleAddressChange} required />
            <label>CEP:</label>
            <input type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange} required />
            <label>Método de Pagamento:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="credit">Cartão de Crédito</option>
              <option value="debit">Cartão de Débito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
            </select>
            <button type="submit">Finalizar Pedido</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;