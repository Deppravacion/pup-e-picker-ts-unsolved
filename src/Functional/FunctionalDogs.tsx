import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import React from "react";
interface DogProps {
  fetchData: () => void;
  isLoading: boolean;
  filteredDogs: Dog[];
}
export const FunctionalDogs: React.FC<DogProps> = ({ fetchData, isLoading, filteredDogs }: DogProps) => {
  return (
    <div className="content-container">
      {
        filteredDogs.map((dog: Dog) => (
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
              Requests.updateDog(dog.isFavorite, dog.id).then(() => fetchData())
            }}
            onEmptyHeartClick={() => {
              Requests.updateDog(dog.isFavorite, dog.id).then(() => fetchData())
            }}
            isLoading={isLoading}
          />
        ))
      }
    </div>
  );
};
