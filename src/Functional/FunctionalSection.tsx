// you can use this type for react children if you so choose
import { Dog } from "../types";
import React from "react";
import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

interface DogProps {
  allDogs: Dog[];
  favDogs: Dog[];
  notFavDogs: Dog[];
  showDogs: string;
  filteredDogs: Dog[];
  createDogFormActive: boolean;
  isLoading: boolean;
  onClickFavDogs: () => void;
  onClickNotFavDogs: () => void;
  onClickDogFormToggle: () => void;
  fetchData: () => void;
}
export const FunctionalSection: React.FunctionComponent<DogProps> = ({
  allDogs,
  favDogs,
  showDogs,
  notFavDogs,
  filteredDogs,
  isLoading,
  onClickFavDogs,
  onClickNotFavDogs,
  onClickDogFormToggle,
  createDogFormActive,
  fetchData,
}: DogProps) => {
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
            onClick={() => onClickDogFormToggle()}
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
            isLoading={isLoading}
          />
        )}
        {createDogFormActive && (
          <FunctionalCreateDogForm
            fetchData={fetchData}
            isLoading={isLoading}
            onClickDogFormToggle={onClickDogFormToggle}
          />
        )}
      </SectionLayout>
    </section>
  );
};
