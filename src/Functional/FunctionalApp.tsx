import { FunctionalSection } from "./FunctionalSection";
import { useEffect } from "react";
import { Requests } from "../api";
import { Toaster, toast } from "react-hot-toast";
import { useIsLoading } from "../store/useIsLoading";
import { useAllDogsStore } from "../store/useAllDogsStore";

export function FunctionalApp() {
  const setIsLoading = useIsLoading((state) => state.setIsLoading)
  const { setAllDogs } = useAllDogsStore()

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: "Loading",
      success: "Got the data",
      error: "Error when fetching",
    });
  }, []);

  // const favDogs = allDogs.filter((dog) => dog.isFavorite === true);
  // const notFavDogs = allDogs.filter((dog) => dog.isFavorite === false);

  // const filteredDogs = (() => {
  //   if (showDogs === "favDogs") {
  //     return favDogs;
  //   }
  //   if (showDogs === "notFavDogs") {
  //     return notFavDogs;
  //   }
  //   return allDogs;
  // })();
  // const onClickFavDogs = () => {
  //   if (showDogs === "favDogs") {
  //     return setShowDogs("allDogs");
  //   }
  //   return setShowDogs("favDogs");
  // };
  // const onClickNotFavDogs = () => {
  //   if (showDogs === "notFavDogs") {
  //     return setShowDogs("allDogs");
  //   }
  //   return setShowDogs("notFavDogs");
  // };
  // const onClickDogFormToggle = () => setCreateDogFormActive(!createDogFormActive);


  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        fetchData={fetchData} 
        // showDogs={showDogs}
        // allDogs={allDogs}
        // favDogs={favDogs}
        // notFavDogs={notFavDogs}
        // filteredDogs={filteredDogs}
        // onClickFavDogs={onClickFavDogs}
        // onClickNotFavDogs={onClickNotFavDogs}
        // onClickDogFormToggle={onClickDogFormToggle}
        // isLoading={isLoading}
        // createDogFormActive={createDogFormActive}
      />
      <Toaster />
    </div>
  );
}
