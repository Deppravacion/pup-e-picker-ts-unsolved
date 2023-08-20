import { Requests } from "../../api";

export const fetchData = () => {
  return Requests.getAllDogs();
};
