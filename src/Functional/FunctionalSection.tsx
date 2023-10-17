import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";
import { useTheDogStore } from "../store/useTheDogStore";

export const FunctionalSection: React.FunctionComponent = () => {
  const [allDogs, activeTab, setActiveTab, favDogs, notFavDogs ] = useTheDogStore((store) => [
    store.allDogs,
    store.activeTab,
    store.setActiveTab,
    store.favDogs,
    store.notFavDogs,

  ]);
  // const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);
  // const notFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  console.log("favDogs", favDogs);
  console.log("notFavDogs", notFavDogs);
  
  
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
            onClick={() => onClickCreateDogForm()}
          >
            {`create dog`}
          </div>
        </div>
      </div>
      <SectionLayout>
        {activeTab != "createDogForm" && <FunctionalDogs />}
        {activeTab === "createDogForm" && <FunctionalCreateDogForm />}
      </SectionLayout>
    </section>
  );
  function onClickFavDogs() {
    if (activeTab === "favDogs") {
      return setActiveTab("allDogs");
    }
    return setActiveTab("favDogs");
  }
  function onClickNotFavDogs() {
    if (activeTab === "notFavDogs") {
      return setActiveTab("allDogs");
    }
    return setActiveTab("notFavDogs");
  }
  function onClickCreateDogForm() {
    if (activeTab === "createDogForm") {
      return setActiveTab("allDogs");
    }
    return setActiveTab("createDogForm");
  }
};
