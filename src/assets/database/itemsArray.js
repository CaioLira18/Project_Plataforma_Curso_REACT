import { shuffleArray } from "./shuffle";

export const itemsArray = [
    {
      id: 1,
      image: "https://loja.imersaoeducacional.com.br//media/images/2024/01/24//2a4a276d161469cd950063bfe70a1f2e.jpg",
      name: "Curso de Animação de Modelagem 3D",
      bio: "Bio Modelagem 3D",
      price: "R$ 399,00"
    },
    {
      id: 2,
      image: "https://i.ytimg.com/vi/gMtOQXTr5No/maxresdefault.jpg",
      name: "Curso Blender Basico ao Avançado",
      bio: "Bio Curso Blender",
      price: "R$ 199,00"
    },
    {
      id: 3,
      image: "https://img-c.udemycdn.com/course/750x422/1533550_a0bd_3.jpg",
      name: "Curso de Animação 2D com Harmony",
      bio: "Bio Curso Animação",
      price: "R$ 470,90"
    },
    {
      id: 4,
      image: "https://img-c.udemycdn.com/course/750x422/3520114_0716_2.jpg",
      name: "Curso Unreal Engine do Basico ao Avançado",
      bio: "Bio Curso Unreal Engine",
      price: "R$ 250,00"
    },
    {
      id: 5,
      image: "https://i.ytimg.com/vi/X3i3MtdmoEI/maxresdefault.jpg",
      name: "Curso de Animação com After Effecs",
      bio: "Bio Curso After Effecs",
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
  