import { data } from "./mock.json";

export const fetchFlats = () => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300)
  })
}
