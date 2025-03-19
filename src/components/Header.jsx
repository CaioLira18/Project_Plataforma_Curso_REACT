import React from 'react';
import { User, LogOut } from 'lucide-react'; // Assumindo que você está usando lucide-react

const Header = ({ searchTerm, setSearchTerm, isAuthenticated, userEmail, handleLogout }) => {
    // Função para lidar com a mudança no input de pesquisa
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <header className="header">
                <div className="nav-left">
                    <div className="logo">Cursos</div>
                    <div className="explore-btn">Explore</div>
                </div>
                
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        className="search-box" 
                        placeholder="Search for anything" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <div className="nav-right">
                    <span>Udemy Business</span>
                    <span>Teach on Udemy</span>
                    <a href=""><span className="shopping-cart">🛒</span></a>
                    {!isAuthenticated ? (
                    <a className="cta" href="/Profile" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <User />
                        Login
                    </a>
                ) : (
                    <div className="user-section" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <a className="cta" href="/Profile" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <User />
                            {userEmail.split('@')[0]}
                        </a>
                        <button
                            className="cta logout-btn"
                            onClick={handleLogout}
                            style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", border: "none" }}
                        >
                            <LogOut />
                            Sair
                        </button>
                    </div>
                )}
                </div>
            </header>
        </div>
    );
}

export default Header;