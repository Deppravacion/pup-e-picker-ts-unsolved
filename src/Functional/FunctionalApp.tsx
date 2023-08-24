import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { FunctionalSection } from "./FunctionalSection";
import { useTheDogStore } from "../store/useTheDogStore";


export function FunctionalApp() {
  const refetchDogs = useTheDogStore((store) => store.refetchDogs)

  useEffect(() => {
    refetchDogs()
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
