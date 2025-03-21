import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cursosArray } from "../assets/database/cursosArray";
import { courseSections } from "../assets/database/courseSections";

const Cursos = ({ searchTerm }) => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [expandedSection, setExpandedSection] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserEmail(parsedUser.email || "");
                setIsAuthenticated(parsedUser.authenticated || false);
                
                if (parsedUser.authenticated) {
                    loadPurchasedCourses(parsedUser.email);
                    
                    if (courseId) {
                        const selectedCourse = cursosArray.find(course => course.id.toString() === courseId.toString());
                        if (selectedCourse) {
                            setActiveCourse(selectedCourse);
                            
                            // Selecionar a primeira lição do curso como ativa por padrão
                            const sections = getCourseSections(selectedCourse.id);
                            if (sections.length > 0 && sections[0].lessons.length > 0) {
                                setActiveLesson(sections[0].lessons[0]);
                                setExpandedSection(sections[0].id);
                            }
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
    }, [courseId]);
    
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
        navigate(`/curso/${course.id}`, { replace: true });
        
        // Selecionar a primeira lição do curso como ativa por padrão
        const sections = getCourseSections(course.id);
        if (sections.length > 0 && sections[0].lessons.length > 0) {
            setActiveLesson(sections[0].lessons[0]);
            setExpandedSection(sections[0].id);
        }
    };
    
    const selectLesson = (lesson) => {
        setActiveLesson(lesson);
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

    const getCourseSections = (courseId) => {
        if (!courseId) return [];
        
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
                                {activeLesson && activeLesson.videoUrl ? (
                                    <video 
                                        className="video-player"
                                        src={activeLesson.videoUrl}
                                        controls
                                        autoPlay={false}
                                        controlsList="nodownload"
                                    ></video>
                                ) : (
                                    <div className="no-video-message">
                                        Selecione uma lição com vídeo para assistir
                                    </div>
                                )}
                            </div>
                            {activeLesson && (
                                <div className="active-lesson-info">
                                    <h2>{activeLesson.title}</h2>
                                    <p className="lesson_bio">{activeLesson.lesson_bio}</p>
                                    <p>Duração: {activeLesson.duration}</p>
                                </div>
                            )}
                        </div>
                        <div className="content-sidebar">
                            <div className="progress-container">
                                <div className="progress-title">Seu progresso: 0% completo</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "0" }}></div>
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
                                                    <div 
                                                        key={lesson.id} 
                                                        className={`lesson-item ${activeLesson?.id === lesson.id ? 'active-lesson' : ''}`}
                                                        onClick={() => selectLesson(lesson)}
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            className="lesson-checkbox" 
                                                            checked={lesson.completed} 
                                                            readOnly 
                                                            onClick={(e) => e.stopPropagation()}
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