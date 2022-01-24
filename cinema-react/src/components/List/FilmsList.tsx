import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Film } from '../../data/Film';
import { getFilms } from '../../Requests/film';
import Element from './Element/Element';

export default function FilmsList() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const Rerender = () => fetchData();

  const fetchData = () => {
    getFilms()
      .then((json: Film[]) => {
        setFilms(json);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <List>
      {films &&
        films.map(({ title, _id }: Film) => (
          <Element
            content={title}
            address={`films/${_id}`}
            key={_id}
            api="film/"
            id={_id}
            rerender={Rerender}
            allowEdit={true}
          />
        ))}
    </List>
  );
}
