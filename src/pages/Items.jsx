import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemsArray } from "../assets/database/itemsArray";

const Items = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cont, setCont] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const cont_increment = () => {
    setCont(cont + 1);
  };

  const item = itemsArray.find(item => item.id === Number(id));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsUserLoggedIn(parsedUser.authenticated === true);
    }
  }, []);

  const addToCart = () => {
    if (!item) {
      alert("Produto não encontrado!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Corrigindo a comparação para verificar corretamente se o item já está no carrinho
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const totalItems = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    localStorage.setItem("cartCount", totalItems);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: totalItems } }));

    alert(`${item.name} adicionado ao carrinho!`);
  };

  const finalizePurchase = () => {
    if (!isUserLoggedIn) {
      alert("Por favor, faça login para finalizar a compra.");
      navigate("/login");
      return;
    }

    addToCart();
    navigate("/checkout");
  };

  if (!item) {
    return <div className="item-detail">Produto não encontrado</div>;
  }

  return (
    <div className="item-detail">
      <img src={item.image} alt={item.name} />
      <div className="item-text">
        <h1 className="text_title">{item.name}</h1>
        <h1 className="text_title">Descrição:</h1>
        <h2 className="text_nome">{item.bio}</h2>
        <h1 className="text_title">{item.price}</h1>

        <button 
          className="button_buy" 
          onClick={() => { addToCart(); cont_increment(); }} 
          style={{ marginBottom: "10px" }}
        >
          <i className="fas fa-shopping-cart"></i>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default Items;
