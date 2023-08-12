import { toast } from "react-hot-toast";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import React from "react";
interface DogProps {
  fetchData: () => void;
  isLoading: boolean;
  filteredDogs: Dog[];
}
export const FunctionalDogs: React.FunctionComponent<DogProps> = ({
  fetchData,
  isLoading,
  filteredDogs,
}: DogProps) => {
  return (
    <>
      {filteredDogs.map((dog: Dog) => (
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
            Requests.deleteDog(dog.id).then(() => fetchData());
          }}
          onHeartClick={() => {
            try {
              Requests.updateDog(dog.isFavorite, dog.id).then(() =>
                fetchData()
              );
            } catch (error) {
              console.error(error);
              toast.error("error");
            }
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog(dog.isFavorite, dog.id).then(() => fetchData());
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
