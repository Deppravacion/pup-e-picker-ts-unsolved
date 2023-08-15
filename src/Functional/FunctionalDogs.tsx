import { toast } from "react-hot-toast";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import React from "react";
import { fetchData } from "../api";

import { useIsLoading } from "../store/useIsLoading";
import { useAllDogsStore } from "../store/useAllDogsStore";
import { useShowDogsStore } from "../store/useShowDogStore";

export const FunctionalDogs: React.FunctionComponent = () => {
  const { isLoading, setIsLoading } = useIsLoading();
  const { allDogs, setAllDogs } = useAllDogsStore();
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

  function handleData() {
    setIsLoading(true);
    return fetchData()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false));
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
            Requests.deleteDog(dog.id).then(() => handleData());
          }}
          onHeartClick={() => {
            try {
              Requests.updateDog(dog.isFavorite, dog.id).then(() =>
                handleData()
              );
            } catch (error) {
              console.error(error);
              toast.error("error");
            }
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog(dog.isFavorite, dog.id).then(() => handleData());
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
