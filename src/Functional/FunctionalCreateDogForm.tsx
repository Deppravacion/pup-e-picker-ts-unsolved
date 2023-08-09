import { useState } from "react";
import { dogPictures } from "../dog-pictures";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

interface Props {
  isLoading: boolean;
}
export const FunctionalCreateDogForm: React.FC<Props> = () => {
  const [inputName, setInputName] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [inputPicture, setInputPicture] = useState('')
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input type="text" disabled={false} onChange={(e) => setInputName(e.target.value)} />
      <label htmlFor="description">Dog Description</label>
      <textarea name="" id="" cols={80} rows={10} disabled={false} onChange={(e) => setInputDescription(e.target.value)}></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setInputPicture(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue} >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
