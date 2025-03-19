import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Importe outros componentes necessários

const Biblioteca = ({ searchTerm }) => {
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUserEmail(parsedUser.email || "");
                    setIsAuthenticated(parsedUser.authenticated || false);
                    console.log("Dados do usuário carregados:", parsedUser);
                } catch (error) {
                    console.error("Erro ao carregar dados do usuário:", error);
                }
            } else {
                console.log("Nenhum usuário encontrado no localStorage");
                // Opcionalmente redirecionar para a página de login
                // window.location.href = "/login";
            }
    }, []);
    if (!isAuthenticated) {
        return (
            <div className="profile-container not-authenticated">
                <h2>Você não está logado</h2>
                <p>Por favor, faça login para acessar seu perfil.</p>
                <a href="/login" className="login-link">
                    Ir para login
                </a>
            </div>
        );
    }
    return (
        <div className="biblioteca">
          <h1>Bem Vindo a sua Biblioteca, <a href="/Profile" className="_biblioteca_user_email">{userEmail.split('@')[0]}</a></h1>
          <h1>Meus Cursos</h1>
        </div>
    );
};

export default Biblioteca;