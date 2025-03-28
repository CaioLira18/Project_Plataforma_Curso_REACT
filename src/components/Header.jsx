import React, { useEffect, useState } from "react";
import { User, LogOut } from 'lucide-react'; // Assumindo que você está usando lucide-react

const Header = ({ searchTerm, setSearchTerm, handleLogout }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const checkAuthStatus = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Status de autenticação:", parsedUser);
                setIsAuthenticated(parsedUser.authenticated === true);
                setUserEmail(parsedUser.email || "");
            } catch (error) {
                console.error("Erro ao analisar usuário do localStorage:", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    // Verificar status de autenticação quando o componente for montado
    useEffect(() => {
        checkAuthStatus();
        
        // Adiciona um listener para detectar mudanças no localStorage
        window.addEventListener('storage', checkAuthStatus);
        
        // Cria um intervalo para verificar periodicamente (como fallback)
        const interval = setInterval(checkAuthStatus, 2000);
        
        // Limpa os listeners quando o componente for desmontado
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            clearInterval(interval);
        };
    }, []);

    // Função para lidar com a mudança no input de pesquisa
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <header className="header">
                <div className="nav-left">
                    <div className="logo">BrainCart</div>
                    <div className="explore-btn">Explore</div>
                </div>
                
                <div className="nav-right">
                    <a href="/"><span>Home</span></a>
                    <a href="/"><span>Categorias</span></a>
                    <a href="/biblioteca"><span>Minha Biblioteca</span></a>
                    <a href="/checkout"><span className="shopping-cart">🛒Carrinho</span></a>
                    
                    {!isAuthenticated ? (
                    <a className="cta" href="/Profile">
                        <User />
                        <span>Login</span>
                    </a>
                    ) : (
                    <div className="user-section">
                        <a className="cta" href="/Profile">
                        <User />
                        <span>{userEmail.split('@')[0]}</span>
                        </a>
                        <button
                        className="cta logout-btn"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                        >
                        <LogOut />
                        <span>Sair</span>
                        </button>
                    </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;