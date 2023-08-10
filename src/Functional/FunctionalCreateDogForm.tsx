import { useState } from "react";
import React from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";
interface Props {
  isLoading: boolean;
  fetchData: () => void;
}

const defaultDoggy = dogPictures.OG
export const FunctionalCreateDogForm: React.FC<Props> = ({ isLoading, fetchData }: Props) => {
  const [inputName, setInputName] = useState<string>('')
  const [inputDescription, setInputDescription] = useState<string>('')
  const [inputPicture, setInputPicture] = useState<string>('/assets/OG.jpg')
  const dog: Omit<Dog, "id"> = {
    name: inputName,
    description: inputDescription,
    image: inputPicture,
    isFavorite: true,
  }
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        Requests.postDog(dog).then(() => fetchData())
        setInputName('')
        setInputDescription('')
        setInputPicture('/assets/blue-heeler.png')
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input type="text" disabled={false} onChange={(e) => setInputName(e.target.value)} value={inputName} />
      <label htmlFor="description">Dog Description</label>
      <textarea name="" id="" cols={80} rows={10} disabled={false} value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setInputPicture(e.target.value)} value={defaultDoggy}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue} >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
