import { toast } from "react-hot-toast";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import React from "react";
import { useIsLoadingStore } from "../store/useIsLoadingStore";
import { useAllDogsStore } from "../store/useAllDogsStore";
import { useShowDogsStore } from "../store/useShowDogStore";

export const FunctionalDogs: React.FunctionComponent = () => {
  const { allDogs, setAllDogs } = useAllDogsStore();
  const { isLoading } = useIsLoadingStore();
  const { showDogs } = useShowDogsStore();
  const favDogs = allDogs.filter((dog) => dog.isFavorite === true);
  const notFavDogs = allDogs.filter((dog) => dog.isFavorite === false);

  const filteredDogs = (() => {
    if (showDogs === "favDogs") {
      return favDogs;
    }
    if (showDogs === "notFavDogs") {
      return notFavDogs;
    }
    return allDogs;
  })();

  function removeFavorite(dogId: number) {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: false } : dog
      )
    );
    Requests.updateDog(dogId, true).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
        toast.error("error");
        console.log(response.ok);
      } else return;
    });
  }
  function addFavorite(dogId: number) {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: true } : dog
      )
    );
    Requests.updateDog(dogId, false).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
        toast.error("error");
      } else return;
    });
  }

  function removeDog(dogId: number) {
    setAllDogs(allDogs.filter((dog) => dog.id != dogId));
    Requests.deleteDog(dogId).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
        toast.error("error");
      } else return;
    });
  }
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
            removeFavorite(dog.id);
          }}
          onEmptyHeartClick={() => {
            addFavorite(dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
