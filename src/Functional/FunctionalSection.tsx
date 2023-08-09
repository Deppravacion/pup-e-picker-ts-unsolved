// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";


interface DogProps {
 allDogs: Dog[];
 setShowDogs: () => void;
 showDogs: string;
}
export const FunctionalSection:React.FunctionComponent<DogProps> = ({ allDogs, setShowDogs, showDogs }) => {

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector ${showDogs} === 'favDogs' && 'active'`} onClick={(e) => {
           console.log(e.target);
           
            // toggle active class on click, 
            //favorite count, filter the allDogs
          }}>
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector ${showDogs} === 'favDogs' && 'active'`} onClick={() => {}}>
            unfavorited ( 25 )
          </div>
          <div className={`selector`} onClick={() => {}}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container"></div>
    </section>
  );
};
