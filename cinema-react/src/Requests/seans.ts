import { Seans } from '../data/Seans';

type SeansList = {
  _id: string[];
  seans: Seans[];
};

const url = `${process.env.REACT_APP_BACKEND}/api/seans`;

export const getSeans = (now: boolean): Promise<SeansList[]> => {
  return fetch(`${url}?now=${now}`).then((response: Response) =>
    response.json()
  );
};

export function getSeansById(id: string): Promise<Seans | null> {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/seans/id?id=${id}`)
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return null;
    });
}

export const updateSeansById = (
  id: string | null,
  fetchMethod: string,
  seans: Seans
): Promise<Request> => {
  const link = id ? `${url}/id?id=${id}` : url;
  return fetch(link, {
    method: fetchMethod,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(seans),
  }).then((res) => res.json());
};

export const seansDateVerify = (url: URL): Promise<any> => {
  return fetch(url.toString()).then((res) => res.json());
};

export const getSeansPopularity = (id: string): Promise<any> => {
  return fetch(`${url}/popular?id=${id}`)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return [];
    });
};
