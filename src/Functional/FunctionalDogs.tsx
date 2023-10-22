import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { selectDogs, useTheDogStore } from "../store/useTheDogStore";

export const FunctionalDogs: React.FunctionComponent = () => {
  const { isLoading, toggleFavorite, removeDog, filteredDogs } = useTheDogStore(
    (store) => {
      const { isLoading, toggleFavorite, removeDog } = store;
      return {
        removeDog,
        toggleFavorite,
        isLoading,
        filteredDogs: selectDogs.filteredDogs(store),
      };
    }
  );

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
          onTrashIconClick={() => removeDog(dog.id)}
          onHeartClick={() => toggleFavorite(dog.id, dog.isFavorite)}
          onEmptyHeartClick={() => toggleFavorite(dog.id, dog.isFavorite)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
