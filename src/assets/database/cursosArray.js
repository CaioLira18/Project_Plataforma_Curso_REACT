import { shuffleArray } from "./shuffle";

export const cursosArray = [
  {
      id: 1,
      image: "https://loja.imersaoeducacional.com.br//media/images/2024/01/24//2a4a276d161469cd950063bfe70a1f2e.jpg",
      name: "Curso de Animação de Modelagem 3D",
      bio: "Domine a modelagem 3D e aprenda a criar personagens, cenários e objetos realistas para animações, jogos e projetos visuais. Este curso cobre desde as técnicas básicas até os conceitos avançados de escultura digital, texturização e renderização.",
      price: "R$ 399,00",
      last_update: "July 2023",
      rating: "4.2",
      students: "1340"
  },
  {
      id: 2,
      image: "https://i.ytimg.com/vi/gMtOQXTr5No/maxresdefault.jpg",
      name: "Curso Blender Básico ao Avançado",
      bio: "Aprenda Blender do zero e torne-se um especialista em modelagem, animação e renderização. Descubra os segredos dessa poderosa ferramenta gratuita usada na indústria para criar efeitos visuais impressionantes, personagens 3D e animações cinematográficas.",
      price: "R$ 199,00",
      last_update: "March 2024",
      rating: "4.5",
      students: "2980"
  },
  {
      id: 3,
      image: "https://img-c.udemycdn.com/course/750x422/1533550_a0bd_3.jpg",
      name: "Curso de Animação 2D com Harmony",
      bio: "Explore o mundo da animação 2D profissional com o Toon Boom Harmony! Aprenda a criar personagens expressivos, efeitos visuais dinâmicos e animações fluidas utilizadas em produções de alto nível para TV, cinema e jogos.",
      price: "R$ 470,90",
      last_update: "June 2023",
      rating: "4.7",
      students: "2150"
  },
  {
      id: 4,
      image: "https://img-c.udemycdn.com/course/750x422/3520114_0716_2.jpg",
      name: "Curso Unreal Engine do Básico ao Avançado",
      bio: "Mergulhe na Unreal Engine e aprenda a criar jogos e experiências interativas do zero. Domine a criação de ambientes realistas, programação em Blueprints e otimização para projetos profissionais de alto desempenho.",
      price: "R$ 250,00",
      last_update: "September 2023",
      rating: "4.6",
      students: "1840"
  },
  {
      id: 5,
      image: "https://i.ytimg.com/vi/X3i3MtdmoEI/maxresdefault.jpg",
      name: "Curso de Animação com After Effects",
      bio: "Transforme suas ideias em animações incríveis com o After Effects! Aprenda a criar motion graphics, efeitos visuais, animações de texto e vinhetas profissionais utilizadas no mercado de publicidade, design e produção audiovisual.",
      price: "R$ 375,00",
      last_update: "January 2024",
      rating: "4.3",
      students: "1225"
  }
];
  
  export const artistsIndexedById = cursosArray.reduce((acc, currentObj) => {
    acc[currentObj.id] = currentObj;
    return acc;
  }, {});
  
  export const artistsIndexedByName = cursosArray.reduce((acc, currentObj) => {
    acc[currentObj.name] = currentObj;
    return acc;
  }, {});
  
  shuffleArray(cursosArray);
  