import React from "react";
import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useDogFormActive } from "../store/useIsDogFormActiveStore";
import { useAllDogsStore } from "../store/useAllDogsStore";
import { useShowDogsStore } from "../store/useShowDogStore";

export const FunctionalSection: React.FunctionComponent = () => {
  const { createDogFormActive, setCreateDogFormActive } = useDogFormActive();
  const { allDogs } = useAllDogsStore();
  const { showDogs, setShowDogs } = useShowDogsStore();
  const favDogs = allDogs.filter((dog) => dog.isFavorite === true);
  const notFavDogs = allDogs.filter((dog) => dog.isFavorite === false);

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
        <div className="container-label">{`Dogs: ${showDogs === 'favDogs' 
        ? favDogs.length 
        : showDogs === 'notFavDogs' 
        ? notFavDogs.length 
        : allDogs.length 
        } `}</div>
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
          // filteredDogs={filteredDogs}
          />
        )}
        {createDogFormActive && <FunctionalCreateDogForm />}
      </SectionLayout>
    </section>
  );
};
