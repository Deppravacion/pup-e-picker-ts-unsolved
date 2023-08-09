// you can use this type for react children if you so choose
import { Link } from "react-router-dom";

interface DogProps {
  showDogs: string;
  onClickFavDogs: () => void;
  onClickScallyWags: () => void;
}
export const FunctionalSection: React.FunctionComponent<DogProps> = ({ showDogs, onClickFavDogs, onClickScallyWags }) => {

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector ${showDogs === 'favDogs' && 'active'}`} onClick={() => onClickFavDogs()}>
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector ${showDogs === 'scallyWags' && 'active'}`} onClick={() => onClickScallyWags()}>
            unfavorited ( 25 )
          </div>
          <div className={`selector`} onClick={() => { }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container"></div>
    </section>
  );
};
