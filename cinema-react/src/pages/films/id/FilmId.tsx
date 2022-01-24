import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PopularChart from '../../../components/popularChart/popularChart';
import { Film } from '../../../data/Film';
import { getFilmById } from '../../../Requests/film';

export default function FilmId(): JSX.Element {
  let timeRef = useRef({ houre: '00', minutes: '00' });
  const { id }: { id: string } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  useEffect(() => {
    getFilmById(id)
      .then((json: Film) => {
        const houre = Math.floor(json.length / 60);
        const minutes = json.length % 60;
        timeRef.current = {
          minutes: `${minutes < 10 ? 0 : ''}${minutes}`,
          houre: `${houre < 10 ? 0 : ''}${houre}`,
        };
        setFilm(json);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div>
      {film && <h1>{film.title}</h1>}
      <p>Reżyser: {film?.director || ''}</p>
      <p>
        Czas trwania:{timeRef.current.houre}:{timeRef.current.minutes}
      </p>

      <PopularChart id={id} />
    </div>
  );
}
