import React from "react";
import { Dog } from "../types";
import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useDogFormActive } from "../store/useDogFormActive";
import { useAllDogsStore } from "../store/useAllDogsStore";
import { useShowDogsStore } from "../store/useShowDogStore";


interface DogProps {
  // allDogs: Dog[];
  // favDogs: Dog[];
  // notFavDogs: Dog[];
  // showDogs: string;
  // filteredDogs: Dog[];
  // onClickFavDogs: () => void;
  // onClickNotFavDogs: () => void;
  fetchData: () => void;
}
export const FunctionalSection: React.FunctionComponent<DogProps> = ({
  // allDogs,
  // showDogs,
  // favDogs,
  // notFavDogs,
  // filteredDogs,
  // onClickFavDogs,
  // onClickNotFavDogs,
  fetchData,
}: DogProps) => {

  const {createDogFormActive, setCreateDogFormActive} = useDogFormActive()
  const { allDogs, setAllDogs } = useAllDogsStore()
  const { showDogs, setShowDogs } = useShowDogsStore()
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

  const onClickFavDogs = () => {
    if (showDogs === "favDogs") {
      return setShowDogs("allDogs");
    }
    return setShowDogs("favDogs");
  };
  const onClickNotFavDogs = () => {
    if (showDogs === "notFavDogs") {
      return setShowDogs("allDogs");
    }
    return setShowDogs("notFavDogs");
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{`Dogs: ${allDogs.length} `}</div>
        <div className="selectors">
          <div
            className={`selector ${showDogs === "favDogs" && "active"}`}
            onClick={() => onClickFavDogs()}
          >
            {`favorited ( ${favDogs.length} )`}
          </div>
          <div
            className={`selector ${showDogs === "notFavDogs" && "active"}`}
            onClick={() => onClickNotFavDogs()}
          >
            {`un-favorited ( ${notFavDogs.length} )`}
          </div>
          <div
            className="selector toForm_btn"
            onClick={() => setCreateDogFormActive(!createDogFormActive)}
          >
            {`create dog`}
          </div>
        </div>
      </div>
      <SectionLayout>
        {!createDogFormActive && (
          <FunctionalDogs
            filteredDogs={filteredDogs}
            fetchData={fetchData}
          />
        )}
        {createDogFormActive && (
          <FunctionalCreateDogForm
            fetchData={fetchData}
          />
        )}
      </SectionLayout>
    </section>
  );
};
