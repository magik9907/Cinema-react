import React, { FormEvent, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styles from './filmEditor.module.scss';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import { Film } from '../../data/Film';
import { updateFilmById } from '../../Requests/film';

type EventChange = React.ChangeEvent<HTMLInputElement & HTMLSelectElement>;

interface FilmFormType {
  [key: string]: any;
  title: { value: string; error?: string };
  director: { value: string; error?: string };
  minute: { value: string; error?: boolean };
  houre: { value: string; error?: boolean };
  valid?: boolean;
}

const optionsMinute: JSX.Element[] = [];
const optionsHour: JSX.Element[] = [];
for (let i = 0; i < 60; i++) {
  const number = `${i < 10 ? '0' : ''}${i}`;
  if (i < 24)
    optionsHour.push(
      <option key={`houre-${i}`} value={number}>
        {number}
      </option>
    );
  optionsMinute.push(
    <option key={`minute-${i}`} value={number}>
      {number}
    </option>
  );
}

type PropsType = {
  film?: Film;
  fetchMethod: string;
};

export default function FilmEditor({
  film,
  fetchMethod,
}: PropsType): JSX.Element {
  const history = useHistory();
  const [state, setState] = useState<FilmFormType>({
    title: { value: film?.title || '' },
    director: { value: film?.director || '' },
    minute: {
      value: `${
        film ? `${film.length % 60 < 10 ? '0' : ''}${film.length % 60}` : '00'
      }`,
    },
    houre: {
      value: `${
        film
          ? `${Math.floor(film.length / 60) < 10 ? '0' : ''}${Math.floor(
              film.length / 60
            )}`
          : '00'
      }`,
    },
  });
  const inputChange = (event: EventChange, key: string) => {
    const value = event.target.value;
    const newState: FilmFormType = { ...state };
    newState[key].value = value;
    validate(newState, [key]);
  };

  const validate = (newState: FilmFormType, keys: string[]): boolean => {
    keys.forEach((key: string) => {
      switch (key) {
        case 'title':
          newState.title.error =
            newState.title.value === '' ? 'Pole jest wymagane' : '';
          break;
        case 'minute':
          if (newState.minute.value !== '00' || newState.houre.value !== '00') {
            newState.minute.error = false;
            newState.houre.error = false;
          } else {
            newState.minute.error = true;
          }
          break;
        case 'houre':
          if (newState.houre.value !== '00' || newState.minute.value !== '00') {
            newState.minute.error = false;
            newState.houre.error = false;
          } else {
            newState.minute.error = true;
          }
          break;
      }
    });
    newState.valid = !(
      newState.title.error ||
      newState.minute.error ||
      newState.houre.error
    );

    setState(newState);
    return newState.valid;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (validate(state, ['title', 'minute', 'houre'])) {
      const newFilm: Film = { length: 0, title: '', director: '' };
      newFilm['title'] = state.title.value;
      newFilm['director'] = state.director.value;
      newFilm['length'] =
        Number.parseInt(state.houre.value) * 60 +
        Number.parseInt(state.minute.value);

      updateFilmById(film?._id || null, fetchMethod, newFilm)
        .then((response: Response) => {
          if (response.ok) history.push('/films');
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };
  return (
    <form action="" onSubmit={onSubmit} noValidate={true}>
      <div className={styles.flex}>
        <FormControl fullWidth className={styles.marginRight}>
          <TextField
            id="filmTitle"
            label="Tytuł"
            variant="standard"
            required
            error={!!state.title.error}
            helperText={state.title.error}
            value={state.title.value}
            onChange={(event: EventChange) => {
              inputChange(event, 'title');
            }}
          />
        </FormControl>
        <FormControl fullWidth className={styles.marginLeft}>
          <TextField
            id="filmDirector"
            label="Reżyser"
            variant="standard"
            value={state.director.value}
            onChange={(event: EventChange) => {
              inputChange(event, 'director');
            }}
          />
        </FormControl>
      </div>
      <div>
        <Box sx={{ mt: 8 }}>
          <h4>Czas trwania</h4>
          <FormControl error={state.minute.error || state.houre.error}>
            <InputLabel variant="standard" htmlFor="filmHour">
              Godzin
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: 'Godzina',
                id: 'filmHour',
              }}
              sx={{ mr: 3 }}
              value={state.houre.value}
              error={!!state.houre.error}
              onChange={(event: EventChange) => {
                inputChange(event, 'houre');
              }}
            >
              {optionsHour}
            </NativeSelect>
          </FormControl>
          <Box
            component="div"
            sx={{ mt: 6, display: 'inline-block' }}
            className={styles.bold}
          >
            :
          </Box>
          <FormControl error={state.minute.error || state.houre.error}>
            <InputLabel variant="standard" htmlFor="filmHour">
              Minut
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: 'Godzina',
                id: 'filmMinutes',
              }}
              sx={{ ml: 3 }}
              error={!!state.minute.error}
              value={state.minute.value}
              onChange={(event: EventChange) => {
                inputChange(event, 'minute');
              }}
            >
              {optionsMinute}
            </NativeSelect>
          </FormControl>
          {(state.minute.error || state.houre.error) && (
            <FormHelperText error>Czas nie może być równy 00:00</FormHelperText>
          )}
        </Box>
      </div>
      <Button type="submit" variant="outlined" sx={{ mt: 8 }}>
        Dodaj
      </Button>
    </form>
  );
}
