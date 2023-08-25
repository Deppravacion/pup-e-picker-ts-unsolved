import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useTheDogStore } from "../store/useTheDogStore";
import { Dog } from "../types";

export const FunctionalSection: React.FunctionComponent = () => {
  const {
    allDogs,
    favDogs,
    notFavDogs,
    activeTab,
    onClickFavDogs,
    onClickNotFavDogs,
    onClickCreateDog,
  } = useTheDogStore((store) => ({
    allDogs: store.allDogs,
    activeTab: store.activeTab,
    favDogs: store.favDogs,
    notFavDogs: store.notFavDogs,
    onClickFavDogs: store.onClickFavDogs,
    onClickNotFavDogs: store.onClickNotFavDogs,
    onClickCreateDog: store.onClickCreateDog,
  }));

  console.log( activeTab);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">
          {`Dogs: ${
            activeTab === "favDogs"
              ? favDogs.length
              : activeTab === "notFavDogs"
              ? notFavDogs.length
              : allDogs.length
          } `}
        </div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favDogs" && "active"}`}
            onClick={() => onClickFavDogs}
          >
            {`favorited ( ${favDogs.length} )`}
          </div>
          <div
            className={`selector ${activeTab === "notFavDogs" && "active"}`}
            onClick={() => onClickNotFavDogs}
          >
            {`un-favorited ( ${notFavDogs.length} )`}
          </div>
          <div
            className="selector toForm_btn"
            onClick={() => onClickCreateDog}
          >
            {`create dog`}
          </div>
        </div>
      </div>
      <SectionLayout>
        {/* { activeTab === 'allDogs' && <FunctionalDogs /> } */}
        {/* { activeTab === 'notFavDogs' && <FunctionalDogs /> } */}
        { activeTab === 'favDogs' && <FunctionalDogs /> }
        {activeTab === "createDogForm" && <FunctionalCreateDogForm />}
      </SectionLayout>
    </section>
  );
};
