import { SectionLayout } from "./layouts/SectionLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { selectDogs, useTheDogStore } from "../store/useTheDogStore";
export const FunctionalSection: React.FunctionComponent = () => {
  const { allDogsCount, favDogsCount, notFavDogsCount, activeTab, toggleTab } =
    useTheDogStore((store) => ({
      ...store,
      allDogsCount: selectDogs.allDogsCount(store),
      favDogsCount: selectDogs.favDogsCount(store),
      notFavDogsCount: selectDogs.notFavDogsCount(store),
    }));

  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>{`Dogs: ${
          activeTab === "favDogs"
            ? favDogsCount
            : activeTab === "notFavDogs"
            ? notFavDogsCount
            : allDogsCount
        } `}</div>
        <div className='selectors'>
          <div
            id='favDogs'
            className={`selector ${activeTab === "favDogs" && "active"}`}
            onClick={(e) => toggleTab(e)}
          >
            {`favorited ( ${favDogsCount} )`}
          </div>
          <div
            id='notFavDogs'
            className={`selector ${activeTab === "notFavDogs" && "active"}`}
            onClick={(e) => toggleTab(e)}
          >
            {`un-favorited ( ${notFavDogsCount} )`}
          </div>
          <div
            id='createDogForm'
            className='selector toForm_btn'
            onClick={(e) => toggleTab(e)}
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
