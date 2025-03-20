import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cursosArray } from "../assets/database/cursosArray";
import { courseSections } from "../assets/database/courseSections";

const Cursos = ({ searchTerm }) => {
    const navigate = useNavigate();
    const { courseId } = useParams(); // Get courseId from URL parameters
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [expandedSection, setExpandedSection] = useState(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserEmail(parsedUser.email || "");
                setIsAuthenticated(parsedUser.authenticated || false);
                
                if (parsedUser.authenticated) {
                    loadPurchasedCourses(parsedUser.email);
                    
                    // If courseId is provided in URL, find and set that course as active
                    if (courseId) {
                        // Convert courseId to the same type for comparison (both as string or both as number)
                        const selectedCourse = cursosArray.find(course => course.id.toString() === courseId.toString());
                        if (selectedCourse) {
                            setActiveCourse(selectedCourse);
                        } else {
                            console.error("Course with ID", courseId, "not found");
                        }
                    } else if (cursosArray.length > 0) {
                        setActiveCourse(cursosArray[0]);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
            }
        }
    }, [courseId]); // Add courseId as dependency to react to URL changes
    
    const loadPurchasedCourses = (email) => {
        try {
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            const userOrders = orders.filter(order => order.userEmail === email);
            const courses = [];
            const courseIds = new Set();
            
            userOrders.forEach(order => {
                order.items.forEach(item => {
                    if (!courseIds.has(item.id)) {
                        courseIds.add(item.id);
                        courses.push({
                            id: item.id,
                            name: item.name,
                            image: item.image
                        });
                    }
                });
            });
            
            setPurchasedCourses(courses);
        } catch (error) {
            console.error("Erro ao carregar cursos comprados:", error);
        }
    };
    
    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const selectCourse = (course) => {
        setActiveCourse(course);
        // Update URL when selecting a course without full navigation
        navigate(`/curso/${course.id}`, { replace: true });
    };

    if (!isAuthenticated) {
        return (
            <div className="course-container not-authenticated">
                <h2>Você não está logado</h2>
                <p>Por favor, faça login para acessar sua biblioteca.</p>
                <a href="/login" className="login-link">
                    Ir para login
                </a>
            </div>
        );
    }

    // Get sections for the active course - ensure consistent type comparison
    const getCourseSections = (courseId) => {
        if (!courseId) return [];
        
        // Convert both IDs to strings for comparison
        return courseSections.filter(section => 
            section.courseId?.toString() === courseId.toString() || 
            section.id?.toString() === courseId.toString()
        );
    };

    return (
        <div className="course-container">
            {!activeCourse ? (
                <div className="course-library">
                    <h1 className="library-title">Meus Cursos</h1>
                    <div className="courses-grid">
                        {cursosArray.map(course => (
                            <div 
                                key={course.id} 
                                className="course-card"
                                onClick={() => selectCourse(course)}
                            >
                                <img 
                                    src={course.image} 
                                    alt={course.name} 
                                    className="course-thumbnail"
                                />
                                <h3 className="course-name">{course.name}</h3>
                                <div className="course-info">
                                    <span className="course-rating">⭐ {course.rating}</span>
                                    <span className="course-students">{course.students} alunos</span>
                                </div>
                                <div className="course-update">
                                    Atualizado em: {course.last_update}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="active-course">
                    <button 
                        className="back-button"
                        onClick={() => {
                            setActiveCourse(null);
                            // Update URL when going back to course list
                            navigate('/biblioteca', { replace: true });
                        }}
                    >
                        &larr; Voltar para Meus Cursos
                    </button>
                    <div className="course-header">
                        <img className="course-image" src={activeCourse.image} alt="" />
                        <div className="course-meta">
                            <h1 className="course-title">{activeCourse.name}</h1>
                        </div>
                    </div>
                    <div className="course-nav">
                        <div 
                            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Visão Geral
                        </div>
                        <div 
                            className={`nav-item ${activeTab === "content" ? "active" : ""}`}
                            onClick={() => setActiveTab("content")}
                        >
                            Conteúdo
                        </div>
                        <div 
                            className={`nav-item ${activeTab === "comments" ? "active" : ""}`}
                            onClick={() => setActiveTab("comments")}
                        >
                            Comentários
                        </div>
                    </div>
                    <div className="course-content">
                        <div className="content-main">
                            <div className="video-container">
                                <iframe 
                                    className="video-player"
                                    src={activeCourse.videoUrl}
                                    title="Video Player"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="content-sidebar">
                            <div className="progress-container">
                                <div className="progress-title">Seu progresso: 25% completo</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "25%" }}></div>
                                </div>
                            </div>
                            <div className="sections-container">
                                {getCourseSections(activeCourse.id).map(section => (
                                    <div key={section.id} className="section-item">
                                        <div 
                                            className="section-header"
                                            onClick={() => toggleSection(section.id)}
                                        >
                                            <span>{section.title}</span>
                                            <span>{section.lessons.length} aulas</span>
                                        </div>
                                        {expandedSection === section.id && (
                                            <div className="section-content">
                                                {section.lessons.map(lesson => (
                                                    <div key={lesson.id} className="lesson-item">
                                                        <input 
                                                            type="checkbox" 
                                                            className="lesson-checkbox" 
                                                            checked={lesson.completed} 
                                                            readOnly 
                                                        />
                                                        <span className="lesson-title">{lesson.title}</span>
                                                        <span className="lesson-duration">{lesson.duration}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cursos;