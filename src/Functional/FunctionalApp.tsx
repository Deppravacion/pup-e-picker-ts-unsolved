import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from 'react'
import { Dog } from "../types";
import { Requests } from "../api";
import { Toaster, toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showDogs, setShowDogs] = useState<string>('allDogs')

  const fetchData = () => {
    setIsLoading(true)
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false))
  }

  const favDogs = allDogs.filter((dog) => dog.isFavorite === true)
  const scallyWags = allDogs.filter((dog) => dog.isFavorite === false)

  const filteredDogs = (() => {
    if (showDogs === 'favDogs') {
      return favDogs
    }
    if (showDogs === 'scallyWags') {
      return scallyWags
    }
    return allDogs
  })()

  const onClickFavDogs = () => {
    if (showDogs === 'favDogs') {
      return setShowDogs('allDogs')
    }
    return setShowDogs('favDogs')
  }
  const onClickScallyWags = () => {
    if (showDogs === 'scallyWags') {
      return setShowDogs('allDogs')
    }
    return setShowDogs('scallyWags')
  }

  useEffect(() => {
    const myPromise = fetchData()
    toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Got the data',
      error: 'Error when fetching',
    });
  }, [])

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        showDogs={showDogs}
        onClickFavDogs={onClickFavDogs}
        onClickScallyWags={onClickScallyWags}
        allDogs={allDogs}
        favDogs={favDogs}
        scallyWags={scallyWags}
      />
      <FunctionalDogs
        filteredDogs={filteredDogs}
        fetchData={fetchData}
        isLoading={isLoading}
      />
      <FunctionalCreateDogForm
        isLoading={isLoading}
        fetchData={fetchData}
      />
      <Toaster />
    </div>
  );
}
