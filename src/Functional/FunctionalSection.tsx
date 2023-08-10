// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { Dog } from "../types";
import React from "react";

interface DogProps {
  showDogs: string;
  allDogs: Dog[];
  favDogs: Dog[];
  scallyWags: Dog[];
  onClickFavDogs: () => void;
  onClickScallyWags: () => void;
}
export const FunctionalSection: React.FunctionComponent<DogProps> = ({ showDogs, onClickFavDogs, onClickScallyWags, allDogs, scallyWags, favDogs, }: DogProps) => {

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{`Dogs: ${allDogs.length} `}</div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div className={`selector ${showDogs === 'favDogs' && 'active'}`} onClick={() => onClickFavDogs()}>
            {`favorited ( ${favDogs.length} )`}
          </div>
          <div className={`selector ${showDogs === 'scallyWags' && 'active'}`} onClick={() => onClickScallyWags()}>
            {`un-favorited ( ${scallyWags.length} )`}
          </div>
          <a href="#create-dog-form" className="selector toForm_btn">
            create dog
          </a>
        </div>
      </div>
    </section>
  );
};
