import React from 'react';
import FilmEditor from '../../../components/filmEditor/filmEditor';

export default function CreateFilm(): JSX.Element {
  return (
    <FilmEditor
      fetchMethod="POST"
    ></FilmEditor>
  );
}
