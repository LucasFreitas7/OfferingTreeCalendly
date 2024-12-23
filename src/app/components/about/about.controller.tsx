// controllers/aboutController.ts
import { people } from "@/app/data/people";
import { notFound } from "next/navigation";

export interface Person {
  name: string;
  imageSrc: string;
}



export const getPersonData = (id: string): Person => {
  const person = people[id];
  if (!person) {
    notFound(); // Gera uma página 404 se o ID não for encontrado
  }
  return person;
};
