import { data } from "./mock.json";

export const fetchFlats = () => {

  return new Promise((resolve) => {

    resolve(data);
  })
}
