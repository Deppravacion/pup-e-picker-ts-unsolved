import React from "react";
import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";
import { useTheDogStore } from "../store/useTheDogStore";

export const FunctionalSection: React.FunctionComponent = () => {
  const [allDogs, activeTab, setActiveTab, isFormActive, setIsFormActive] =
    useTheDogStore((state) => [
      state.allDogs,
      state.activeTab,
      state.setActiveTab,
      state.isFormActive,
      state.setIsFormActive,
    ]);

  const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);
  const notFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  const onClickFavDogs = () => {
    if (activeTab === "favDogs") {
      return setActiveTab("allDogs");
    }
    return setActiveTab("favDogs");
  };
  const onClickNotFavDogs = () => {
    if (activeTab === "notFavDogs") {
      return setActiveTab("allDogs");
    }
    return setActiveTab("notFavDogs");
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{`Dogs: ${
          activeTab === "favDogs"
            ? favDogs.length
            : activeTab === "notFavDogs"
            ? notFavDogs.length
            : allDogs.length
        } `}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favDogs" && "active"}`}
            onClick={() => onClickFavDogs()}
          >
            {`favorited ( ${favDogs.length} )`}
          </div>
          <div
            className={`selector ${activeTab === "notFavDogs" && "active"}`}
            onClick={() => onClickNotFavDogs()}
          >
            {`un-favorited ( ${notFavDogs.length} )`}
          </div>
          <div
            className="selector toForm_btn"
            onClick={() => setIsFormActive(!isFormActive)}
          >
            {`create dog`}
          </div>
        </div>
      </div>
      <SectionLayout>
        {!isFormActive && <FunctionalDogs />}
        {isFormActive && <FunctionalCreateDogForm />}
      </SectionLayout>
    </section>
  );
};
