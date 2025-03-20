import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Biblioteca = ({ searchTerm }) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserEmail(parsedUser.email || "");
                setIsAuthenticated(parsedUser.authenticated || false);
                
                if (parsedUser.authenticated) {
                    loadPurchasedCourses(parsedUser.email);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
            }
        } else {
            console.log("Nenhum usuário encontrado no localStorage");
        }
    }, []);
    
    const loadPurchasedCourses = (email) => {
        try {
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            const userOrders = orders.filter(order => order.userEmail === email);
            
            const coursesMap = new Map();
            
            userOrders.forEach(order => {
                order.items.forEach(item => {
                    if (item.id && !coursesMap.has(item.id)) {
                        coursesMap.set(item.id, {
                            id: item.id,
                            name: item.name,
                            image: item.image
                        });
                    }
                });
            });
            
            setPurchasedCourses(Array.from(coursesMap.values()));
        } catch (error) {
            console.error("Erro ao carregar cursos comprados:", error);
        }
    };
    
    if (!isAuthenticated) {
        return (
            <div className="profile-container not-authenticated">
                <h2>Você não está logado</h2>
                <p>Por favor, faça login para acessar sua biblioteca.</p>
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
            
            {purchasedCourses.length > 0 ? (
                <div className="biblioteca-cursos">
                    {purchasedCourses.map(course => (
                        <div key={course.id} className="biblioteca-curso-item">
                            <img src={course.image} alt={course.name} className="curso-imagem" />
                            <h3 className="curso-nome">{course.name}</h3>
                            <button 
                                className="acessar-curso-btn"
                                onClick={() => course.id ? navigate(`/curso/${course.id}`) : console.error("ID do curso inválido:", course)}
                            >
                                Acessar Curso
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="biblioteca-vazia">
                    <p>Você ainda não possui cursos na sua biblioteca.</p>
                    <button 
                        className="explorar-cursos-btn"
                        onClick={() => navigate("/")}
                    >
                        Explorar Cursos
                    </button>
                </div>
            )}
        </div>
    );
};

export default Biblioteca;
