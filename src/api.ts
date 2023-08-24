import { Dog } from "./types";

export const baseUrl = "http://localhost:3000/dogs/";
export const jsonHeaders = { "Content-Type": "application/json" };
export const Requests = {
  getAllDogs: async (): Promise<Dog[]> => {
    return await fetch(`${baseUrl}`).then((res) => res.json());
  },
  deleteDog: async (id: number): Promise<Response> => {
    return await fetch(`${baseUrl}${id}`, {
      method: "DELETE",
    });
  },
  updateDog: async (id: number, isFavorite: boolean): Promise<Response> => {
    const favStatus = !isFavorite;
    return await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: favStatus }),
      headers: jsonHeaders,
    });
  },
  postDog: async (dog: Omit<Dog, "id">): Promise<Response> => {
    return await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify(dog),
      headers: jsonHeaders,
    });
  },
};
