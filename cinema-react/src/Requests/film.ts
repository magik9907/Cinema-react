import { Film } from '../data/Film';

const URL = `${process.env.REACT_APP_BACKEND}/api/film`;

export const getFilmById = (id: string): Promise<Film> => {
  return fetch(`${URL}/${id}`).then((response: Response) => response.json());
};

export const updateFilmById = (
  id: string | null,
  method: string,
  film: Film
): Promise<Response> => {
  const link = id ? `${URL}/${id}` : URL;
  return fetch(link, {
    method: method,
    body: JSON.stringify(film),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getFilms =():Promise<Film[]>=>{
  return fetch(`${process.env.REACT_APP_BACKEND}/api/film`)
  .then((response: Response) => response.json())
}