// import { useAllDogsStore } from "./store/useAllDogsStore";
// import { useIsLoading } from "./store/useIsLoading";
import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
export const jsonHeaders = { "Content-Type": "application/json" };
// const { setIsLoading } = useIsLoading()
// const { setAllDogs } = useAllDogsStore()

// export const fetchData = () => {
//   setIsLoading(true);
//   return Requests.getAllDogs()
//     .then((dogs) => setAllDogs(dogs))
//     .finally(() => setIsLoading(false));
// };


export const Requests = {
  getAllDogs: async (): Promise<Dog[]> => {
    return await fetch(`${baseUrl}/dogs`).then((res) => res.json());
  },
  postDog: async (dog: Omit<Dog, "id">) => {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: "POST",
      body: JSON.stringify(dog),
      headers: jsonHeaders,
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("could not POST that dog");
    }
  },
  deleteDog: async (id: number) => {
    const response = await fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("failed to delete");
    }
    return response;
  },
  updateDog: async (isFavorite: boolean, id: number) => {
    const favStatus = !isFavorite;
    const response = await fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: favStatus }),
      headers: jsonHeaders,
    });
    if (!response.ok) {
      throw new Error("failed to update");
    }
    return response.json();
  },
};
