import { Requests } from "../../api";
import { useTheDogStore } from "../../store/useTheDogStore";
export const fetchData = () => {
  return Requests.getAllDogs();
};

const [ activeTab, setActiveTab ] = useTheDogStore(store => [store.activeTab, store.setActiveTab])
export const onClickFavDogs = () => {
  if (activeTab === "favDogs") {
    return setActiveTab("allDogs");
  }
  return setActiveTab("favDogs");
};
export const onClickNotFavDogs = () => {
  if (activeTab === "notFavDogs") {
    return setActiveTab("allDogs");
  }
  return setActiveTab("notFavDogs");
};
export const onClickCreateDogForm = () => {
  if (activeTab === 'createDogForm') {
    return setActiveTab('allDogs')
  }
  return setActiveTab('createDogForm')
}