import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useTheDogStore } from "../store/useTheDogStore";

export const FunctionalCreateDogForm: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputPicture, setInputPicture] = useState<string>("/assets/OG.jpg");
  const [createDog, isLoading, setActiveTab] = useTheDogStore((store) => [
    store.createDog,
    store.isLoading,
    store.setActiveTab,
  ]);

  return (
    <form
      action=''
      id='create-dog-form'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor='name'>Dog Name</label>
      <input
        type='text'
        disabled={false}
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      />
      <label htmlFor='description'>Dog Description</label>
      <textarea
        name=''
        id=''
        cols={80}
        rows={10}
        disabled={false}
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
      ></textarea>
      <label htmlFor='picture'>Select an Image</label>
      <select
        id=''
        onChange={(e) => setInputPicture(e.target.value)}
        value={inputPicture}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type='submit' disabled={isLoading} />
    </form>
  );
  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    createDog({
      description: inputDescription,
      image: inputPicture,
      isFavorite: true,
      name: inputName,
    })
      .then(() => resetInputState())
      .then(() => setActiveTab("allDogs"));
  }
  function resetInputState(): void {
    setInputName("");
    setInputDescription("");
    setInputPicture("/assets/blue-heeler.png");
  }
};
