import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";

interface DogProps {
  allDogs: Dog[];
  fetchData:() => void;
  isLoading: boolean;
}
export const FunctionalDogs: React.FC<DogProps> = ( { allDogs, fetchData, isLoading }) => {  
  return (
    <>
      { 
        allDogs.map((dog:Dog) => (
          <DogCard 
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {            
              Requests.deleteDog(dog.id).then(() => fetchData())                   
            }}
            onHeartClick={() => {
              Requests.updateDog(dog.isFavorite,dog.id).then(() => fetchData())
            }}
            onEmptyHeartClick={() => {
              Requests.updateDog(dog.isFavorite,dog.id).then(() => fetchData())              
            }}
            isLoading={isLoading}        
          />
        ))
      }
    </>
  );
};
