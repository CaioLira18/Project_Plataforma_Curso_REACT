import { shuffleArray } from "./shuffle";

export const courseSections = [
    {
        id: 1,
        courseId: 1,
        title: "Introdução a Modelagem 3D",
        lessons: [
            { id: "lesson-1-1", title: "Boas-vindas", duration: "5min", completed: true },
            { id: "lesson-1-2", title: "Instalação do Blender", duration: "12min", completed: true },
            { id: "lesson-1-3", title: "Configuração do Blender", duration: "5min", completed: true },
            { id: "lesson-1-4", title: "Primeira Modelagem", duration: "20min", completed: true }
        ]
    },
    {
        id: 2,
        courseId: 2,
        title: "Introdução ao Blender",
        lessons: [
            { id: "lesson-2-1", title: "Boas-vindas", duration: "5min", completed: true },
            { id: "lesson-2-2", title: "Instalação do Blender", duration: "12min", completed: true },
            { id: "lesson-2-3", title: "Configuração do Blender", duration: "5min", completed: true },
            { id: "lesson-2-4", title: "Primeira Modelagem", duration: "20min", completed: true }
        ]
    },
    {
        id: 3,
        courseId: 3,
        title: "Introdução ao Harmony",
        lessons: [
            { id: "lesson-3-1", title: "Instalação do Harmony", duration: "5min", completed: false },
            { id: "lesson-3-2", title: "Conceitos básicos", duration: "10min", completed: false },
            { id: "lesson-3-3", title: "Configuração da Mesa Digital e Melhores Pincéis", duration: "5min", completed: false },
            { id: "lesson-3-4", title: "Primeiro Desenho", duration: "10min", completed: false }
        ]
    },
    {
        id: 4,
        courseId: 4,
        title: "Introdução ao Unreal Engine",
        lessons: [
            { id: "lesson-4-1", title: "Instalação da Unreal Engine", duration: "5min", completed: false },
            { id: "lesson-4-2", title: "Introdução à Unreal Engine 5", duration: "10min", completed: false },
            { id: "lesson-4-3", title: "Configurando o Primeiro Projeto", duration: "5min", completed: false },
            { id: "lesson-4-4", title: "Montando a Primeira Cena", duration: "10min", completed: false }
        ]
    },
    {
        id: 5,
        courseId: 5,
        title: "Introdução ao After Effects",
        lessons: [
            { id: "lesson-5-1", title: "Instalação do Adobe After Effects", duration: "5min", completed: false },
            { id: "lesson-5-2", title: "Introdução aos Conceitos Básicos", duration: "10min", completed: false },
            { id: "lesson-5-3", title: "Introdução aos Keyframes", duration: "5min", completed: false },
            { id: "lesson-5-4", title: "Primeira Animação", duration: "10min", completed: false }
        ]
    }
];

export const sectionsIndexedByCourseId = courseSections.reduce((acc, currentObj) => {
    if (!acc[currentObj.courseId]) {
        acc[currentObj.courseId] = [];
    }
    acc[currentObj.courseId].push(currentObj);
    return acc;
}, {});

export const sectionsIndexedById = courseSections.reduce((acc, currentObj) => {
    acc[currentObj.id] = currentObj;
    return acc;
}, {});

// shuffleArray(courseSections);
