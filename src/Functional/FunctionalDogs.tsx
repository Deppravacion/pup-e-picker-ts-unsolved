import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { useTheDogStore } from "../store/useTheDogStore";

export const FunctionalDogs: React.FunctionComponent = () => {
  const {
    allDogs,
    favDogs,
    notFavDogs,
    activeTab,
    isLoading,
    toggleFavorite,
    removeDog,
  } = useTheDogStore();

  const filteredDogs = (() => {
    if (activeTab === "favDogs") {
      return favDogs;
    }
    if (activeTab === "notFavDogs") {
      return notFavDogs;
    }
    return allDogs;
  })();

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
            removeDog(dog.id);
          }}
          onHeartClick={() => {
            toggleFavorite(dog.id, dog.isFavorite);
          }}
          onEmptyHeartClick={() => {      
            toggleFavorite(dog.id, dog.isFavorite);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
