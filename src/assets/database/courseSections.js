import { shuffleArray } from "./shuffle";
import video1 from "../../../src/videos/Video1.mp4";
import video2 from "../../../src/videos/Video2.mp4";
import video3 from "../../../src/videos/Video3.mp4";
import video4 from "../../../src/videos/Video4.mp4";
import video5 from "../../../src/videos/Video5.mp4";
import video6 from "../../../src/videos/Video6.mp4";
import video7 from "../../../src/videos/Video7.mp4";
import video8 from "../../../src/videos/Video8.mp4";


export const courseSections = [
    {
        id: 1,
        courseId: 1,
        title: "Introdução a Modelagem 3D",
        lessons: [
            { id: "lesson-1-1", title: "Boas-vindas", duration: "5min", completed: false, lesson_bio: "Seja Bem Vindo ao Curso", videoUrl: video1 },
            { id: "lesson-1-2", title: "Instalação do Blender", duration: "12min", completed: false, lesson_bio: "Aprenda a instalar o Blender", videoUrl: video2 },
            { id: "lesson-1-3", title: "Configuração do Blender", duration: "5min", completed: false, lesson_bio: "Ajuste as configurações iniciais", videoUrl: video1 },
            { id: "lesson-1-4", title: "Primeira Modelagem", duration: "20min", completed: false, lesson_bio: "Crie seu primeiro modelo 3D", videoUrl: video2 }
        ]
    },
    {
        id: 2,
        courseId: 2,
        title: "Introdução ao Blender",
        lessons: [
            { id: "lesson-2-1", title: "Boas-vindas", duration: "5min", completed: true, lesson_bio: "Seja Bem Vindo ao Curso", videoUrl: video1 },
            { id: "lesson-2-2", title: "Instalação do Blender", duration: "12min", completed: true, lesson_bio: "Aprenda a instalar o Blender", videoUrl: video1 },
            { id: "lesson-2-3", title: "Configuração do Blender", duration: "5min", completed: true, lesson_bio: "Ajuste as configurações iniciais", videoUrl: video1 },
            { id: "lesson-2-4", title: "Primeira Modelagem", duration: "20min", completed: true, lesson_bio: "Crie seu primeiro modelo 3D", videoUrl: video1 }
        ]
    },
    {
        id: 3,
        courseId: 3,
        title: "Introdução ao Harmony",
        lessons: [
            { id: "lesson-3-1", title: "Instalação do Harmony", duration: "5min", completed: false, lesson_bio: "Aprenda a instalar o Harmony", videoUrl: video3 },
            { id: "lesson-3-2", title: "Conceitos básicos", duration: "10min", completed: false, lesson_bio: "Entenda os fundamentos do software", videoUrl: video4 },
            { id: "lesson-3-3", title: "Configuração da Mesa Digital e Melhores Pincéis", duration: "5min", completed: false, lesson_bio: "Otimize sua mesa digital", videoUrl: video3 },
            { id: "lesson-3-4", title: "Primeiro Desenho", duration: "10min", completed: false, lesson_bio: "Comece sua primeira ilustração", videoUrl: video4 }
        ]
    },
    {
        id: 4,
        courseId: 4,
        title: "Introdução ao Unreal Engine",
        lessons: [
            { id: "lesson-4-1", title: "Instalação da Unreal Engine", duration: "5min", completed: false, lesson_bio: "Instale a Unreal Engine corretamente", videoUrl: video7 },
            { id: "lesson-4-2", title: "Introdução à Unreal Engine 5", duration: "10min", completed: false, lesson_bio: "Conheça a nova versão do Unreal", videoUrl: video8 },
            { id: "lesson-4-3", title: "Configurando o Primeiro Projeto", duration: "5min", completed: false, lesson_bio: "Crie e configure seu primeiro projeto", videoUrl: video7 },
            { id: "lesson-4-4", title: "Montando a Primeira Cena", duration: "10min", completed: false, lesson_bio: "Construa sua primeira cena 3D", videoUrl: video8 }
        ]
    },
    {
        id: 5,
        courseId: 5,
        title: "Introdução ao After Effects",
        lessons: [
            { id: "lesson-5-1", title: "Instalação do Adobe After Effects", duration: "5min", completed: false, lesson_bio: "Instale corretamente o After Effects", videoUrl: video5 },
            { id: "lesson-5-2", title: "Introdução aos Conceitos Básicos", duration: "10min", completed: false, lesson_bio: "Aprenda os conceitos essenciais", videoUrl: video6 },
            { id: "lesson-5-3", title: "Introdução aos Keyframes", duration: "5min", completed: false, lesson_bio: "Entenda como funcionam os keyframes", videoUrl: video5 },
            { id: "lesson-5-4", title: "Primeira Animação", duration: "10min", completed: false, lesson_bio: "Crie sua primeira animação", videoUrl: video6 }
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
