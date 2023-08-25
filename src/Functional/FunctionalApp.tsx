import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useTheDogStore } from "../store/useTheDogStore";
import { FunctionalSection } from "./FunctionalSection";
export function FunctionalApp() {
  // const refetchDogs = useTheDogStore((store) => store.refetchDogs)
  // const [refetchDogs] = useTheDogStore((state) => [state.refetchDogs]);
  const refetchDogs = useTheDogStore(state => state.refetchDogs)

  useEffect(() => {
    refetchDogs();
  }, []);

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
