import { FunctionalSection } from "./FunctionalSection";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useIsLoadingStore } from "../store/useIsLoadingStore";
import { useAllDogsStore } from "../store/useAllDogsStore";
import { fetchData } from "../api";
import { useIsFormActiveStore } from "../store/useIsFormActiveStore";

export function FunctionalApp() {
  const setIsLoading = useIsLoadingStore((state) => state.setIsLoading);
  const { setAllDogs } = useAllDogsStore();
  const { isFormActive } = useIsFormActiveStore();
  useEffect(() => {
    const myPromise = handleData();
    toast.promise(myPromise, {
      loading: "Loading",
      success: "Got the data",
      error: "Error when fetching",
    });
  }, [isFormActive]);

  function handleData() {
    setIsLoading(true);
    return fetchData()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false));
  }

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
