import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FilmEditor from '../../../../components/filmEditor/filmEditor';
import { Film } from '../../../../data/Film';
import { getFilmById } from '../../../../Requests/film';

export default function EditFilm(): JSX.Element {
  const [state, setState] = useState<Film | null>(null);
  const { id }: { id: string } = useParams();
  useEffect(() => {
    getFilmById(id).then((json: Film) => {
      setState({
        ...json,
      });
    });
  }, []);
  return (
    <>
      {state && (
        <FilmEditor film={state} fetchMethod="PUT" ></FilmEditor>
      )}
    </>
  );
}
