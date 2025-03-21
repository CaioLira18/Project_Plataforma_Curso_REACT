import React from "react";

const Footer = () => {
    return(
    <div>
        <footer className="site-footer">
  <div className="container">
    <div className="footer-content">
      <div className="footer-logo">
        <h2>BrainCart</h2>
        <p>Aprenda no seu ritmo, evolua sem limites.</p>
      </div>
      
      <div className="footer-links">
        <h3>Links Rápidos</h3>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Serviços</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
      
      <div className="footer-contact">
        <h3>Contato</h3>
        <p>Email: BrainCart@empresa.com</p>
        <p>Telefone: (81) 1234-5678</p>
        <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>
      </div>
      
      <div className="footer-social">
        <h3>Redes Sociais</h3>
        <div className="social-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; 2025 BrainCart. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>
    </div>
    );
}

export default Footer