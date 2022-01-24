import { Discount } from '../data/Discount';

export const getDiscount = (): Promise<Discount[]> => {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/discount`)
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return [];
    });
};
