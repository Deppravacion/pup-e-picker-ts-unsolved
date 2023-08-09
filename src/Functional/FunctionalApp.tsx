import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from 'react'
import { Dog } from "../types";
import { Requests } from "../api";
import { Toaster, toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([])
  const [ isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = () => {
    setIsLoading(true)
      return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false))

  }

  useEffect (() => {
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
      allDogs={allDogs} 
      />
      <FunctionalDogs 
      allDogs={allDogs} 
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
