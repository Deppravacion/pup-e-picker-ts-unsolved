import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { FunctionalSection } from "./FunctionalSection";
import { useTheDogStore } from "../store/useTheDogStore";
// import { fetchData } from "./utils/utilities";

export function FunctionalApp() {
  // const [isFormActive, setIsLoading, setAllDogs] = useTheDogStore((state) => [
  //   state.isFormActive,
  //   state.setIsLoading,
  //   state.setAllDogs,
  // ]);
  const refetchDogs = useTheDogStore(store => store.refetchDogs)

  useEffect(() => {
    refetchDogs()
  }, [])

  // useEffect(() => {
  //   const myPromise = handleData();
  //   toast.promise(myPromise, {
  //     loading: "Loading",
  //     success: "Got the data",
  //     error: "Error when fetching",
  //   });
  // }, [isFormActive]);

  // function handleData() {
  //   setIsLoading(true);
  //   return fetchData()
  //     .then((dogs) => setAllDogs(dogs))
  //     .finally(() => setIsLoading(false));
  // }

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection />
      <Toaster />
    </div>
  );
}
