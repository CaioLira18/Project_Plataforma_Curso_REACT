import { shuffleArray } from "./shuffle";

export const itemsArray = [
  {
    id: 1,
    image: "https://loja.imersaoeducacional.com.br//media/images/2024/01/24//2a4a276d161469cd950063bfe70a1f2e.jpg",
    name: "Curso de Animação de Modelagem 3D",
    bio: "Aprenda a criar modelos 3D detalhados e animados do zero, explorando técnicas avançadas de texturização e rigging.",
    price: "R$ 399,00"
  },
  {
    id: 2,
    image: "https://i.ytimg.com/vi/gMtOQXTr5No/maxresdefault.jpg",
    name: "Curso Blender Básico ao Avançado",
    bio: "Domine o Blender, desde os conceitos básicos até técnicas avançadas para modelagem, animação e renderização profissional.",
    price: "R$ 199,00"
  },
  {
    id: 3,
    image: "https://img-c.udemycdn.com/course/750x422/1533550_a0bd_3.jpg",
    name: "Curso de Animação 2D com Harmony",
    bio: "Aprenda a animar em 2D usando o Toon Boom Harmony, dominando princípios de animação, rigging e efeitos visuais.",
    price: "R$ 470,90"
  },
  {
    id: 4,
    image: "https://img-c.udemycdn.com/course/750x422/3520114_0716_2.jpg",
    name: "Curso Unreal Engine do Básico ao Avançado",
    bio: "Explore a Unreal Engine e aprenda a criar jogos e ambientes interativos com gráficos impressionantes e jogabilidade fluida.",
    price: "R$ 250,00"
  },
  {
    id: 5,
    image: "https://i.ytimg.com/vi/X3i3MtdmoEI/maxresdefault.jpg",
    name: "Curso de Animação com After Effects",
    bio: "Domine o After Effects e crie animações incríveis para vídeos, motion graphics e efeitos visuais profissionais.",
    price: "R$ 375,00"
  },
];

export const artistsIndexedById = itemsArray.reduce((acc, currentObj) => {
  acc[currentObj.id] = currentObj;
  return acc;
}, {});

export const artistsIndexedByName = itemsArray.reduce((acc, currentObj) => {
  acc[currentObj.name] = currentObj;
  return acc;
}, {});

shuffleArray(itemsArray);