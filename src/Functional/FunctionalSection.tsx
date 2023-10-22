import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { selectDogs, useTheDogStore } from "../store/useTheDogStore";

export const FunctionalSection: React.FunctionComponent = () => {
  const {
    allDogs,
    favDogs,
    notFavDogs,
    activeTab,
    onClickCreateDogForm,
    onClickFavDogs,
    onClickNotFavDogs,
  } = useTheDogStore((store) => ({
    ...store,
    favDogs: selectDogs.favDogs(store),
    notFavDogs: selectDogs.notFavDogs(store),
  }));

  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>{`Dogs: ${
          activeTab === "favDogs"
            ? favDogs.length
            : activeTab === "notFavDogs"
            ? notFavDogs.length
            : allDogs.length
        } `}</div>
        <div className='selectors'>
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
            className='selector toForm_btn'
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
};
