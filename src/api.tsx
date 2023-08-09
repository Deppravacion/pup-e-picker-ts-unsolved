import { toast } from "react-hot-toast";
import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: async (): Promise<Dog[]> => {  
      
  
    return await fetch(`${baseUrl}/dogs`).then(res => res.json())  
  }, 
  postDog: async (dog: Omit<Dog, 'id'>) => { 
    try {
      const res = await fetch(`${baseUrl}/dogs`, {
        method: 'POST', 
        body: JSON.stringify(dog),
        headers: {
          "Content-Type": "application/json"
        }
      })     
      await res.json()
      if (!res.ok) {
        throw new Error('could not POST that dog')
      } else {
        toast.success('success creating a dog')
      }
    } catch (error) {
      toast.error('oops there was a problem')
      console.error(error)
    }    
  },
  deleteDog: async (id: number) => { 
    try {
      const res = await fetch(`${baseUrl}/dogs/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        throw new Error('could not delete that dog')
      } else {
        toast.success('Patch Success!')
        Requests.getAllDogs()
      }
    } catch (error) {
      toast.error('oops there was a problem')
      console.error(error)
    }
  },

  updateDog: async (isFavorite: boolean , id: number) => {
  // updateDog: async (dog: Partial<Dog> , id: number) => {
    const fav = isFavorite ? false : true
    try {
      const res = await fetch(`${baseUrl}/dogs/${id}`, {
        method: 'PATCH', 
        body: JSON.stringify({isFavorite: fav}),
        // body: JSON.stringify(dog),
        headers: {
          "Content-Type": "application/json"
        }
      })
      await res.json()
      if (!res.ok) {
        throw new Error('could not PATCH that dog')
      } else {
        toast.success('Patch Success!')
      }
    } catch (error) {
      toast.error('oops there was a problem')
      console.error(error)
    }
  }
};
