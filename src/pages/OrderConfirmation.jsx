import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    // Buscar o pedido do localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find(o => o.id === parseInt(orderId));
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      alert("Pedido não encontrado");
      navigate("/");
    }
  }, [orderId, navigate]);
  
  if (!order) {
    return <div>Carregando informações do pedido...</div>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <i className="fas fa-check-circle"></i>
        <h1>Pedido Confirmado!</h1>
        <p>Seu pedido foi realizado com sucesso.</p>
        <p>Número do pedido: <strong>#{orderId}</strong></p>
      </div>
      
      <div className="confirmation-section">
        <h2>Detalhes do Pedido</h2>
        <div className="order-details">
          <div>
            <strong>Email:</strong> {order.userEmail}
          </div>
          <div>
            <strong>Data do Pedido:</strong> {new Date(order.orderDate).toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong> {order.status === "pending" ? "Pendente" : order.status}
          </div>
          <div>
            <strong>Método de Pagamento:</strong> {
              order.paymentMethod === "credit" ? "Cartão de Crédito" :
              order.paymentMethod === "debit" ? "Cartão de Débito" :
              order.paymentMethod === "pix" ? "PIX" : "Boleto"
            }
          </div>
          <div>
            <strong>Endereço de Entrega:</strong> {order.shippingAddress.street}, {order.shippingAddress.number}, {order.shippingAddress.city}, {order.shippingAddress.state}, CEP {order.shippingAddress.zipCode}
          </div>
        </div>
      </div>
      
      <div className="confirmation-section">
        <h2>Itens do Pedido</h2>
        <div className="order-items">
          {order.items.map(item => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <div className="item-name"><strong>{item.name}</strong></div>
                <div>Quantidade: {item.quantity}</div>
              </div>
              <div className="item-price">{item.price}</div>
            </div>
          ))}
          
          <div className="order-total">
            Total: R$ {order.totalAmount.replace('.', ',')}
          </div>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <button onClick={() => navigate("/")} className="home-button">
          <i className="fas fa-home"></i>
          Voltar à Página Inicial
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;