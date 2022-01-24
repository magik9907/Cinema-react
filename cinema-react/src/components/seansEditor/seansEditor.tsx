import { Autocomplete, Button } from '@mui/material';
import React, { FormEvent, useReducer, useState, useEffect } from 'react';
import { Film } from '../../data/Film';
import { Hall } from '../../data/Hall';
import { Seans } from '../../data/Seans';
import styles from './seansEditor.module.scss';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useHistory } from 'react-router-dom';
import { seansDateVerify, updateSeansById } from '../../Requests/seans';
import FormControl from '@mui/material/FormControl';
import { getFilms } from '../../Requests/film';
import { getHalls } from '../../Requests/hall';

type DateType = { date: Date; valid: boolean };
type IdType = { value?: Film | Hall; name: string; valid: boolean };
type NumberType = { value: Number; valid: boolean };

const ACTIONS = {
  SET_DATE_INVALID: 'SET_DATE_INVALID',
  SET_DATE: 'SET_DATE',
  SET_HALL_SEARCH: 'SET_HALL_SEARCH',
  SET_HALL: 'SET_HALL',
  SET_FILM_SEARCH: 'SET_FILM_SEARCH',
  SET_FILM: 'SET_FILM',
  SET_TICKETPRICE: 'SET_TICKETPRICE',
  VALIDATE: 'VALIDATE',
};

interface State {
  film: IdType;
  hall: IdType;
  date: DateType;
  ticketPrice: NumberType;
  valid: boolean;
}

const MonthsLength = (month: number): number => {
  const year = new Date().getFullYear();
  if (month === 2)
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  return [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

const init = (seans: Seans): State => {
  let convertDate;
  if (!seans) convertDate = new Date();
  else {
    const time = seans?.date.time.split(':').map((x) => Number.parseInt(x)) || [
      0, 0,
    ];
    convertDate = new Date(seans?.date.date);
    convertDate = new Date(
      convertDate.getTime() - 3600000 + (time[0] * 60 + time[1]) * 60 * 1000
    );
  }
  const film: IdType = {
    value: seans?.film || null,
    name: seans?.film?.title || '',
    valid: !!seans?.film._id,
  };
  const hall: IdType = {
    name: '',
    value: seans?.hall || null,
    valid: !!seans?.hall._id,
  };
  const date: DateType = {
    date: convertDate,
    valid: !!seans?.date.date,
  };
  const ticketPrice: NumberType = {
    value: seans?.ticketPrice || 20,
    valid: true,
  };
  return {
    film,
    hall,
    date,
    ticketPrice,
    valid: date.valid && film.valid && hall.valid && ticketPrice.valid,
  };
};

const reducer = (state: State, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.SET_DATE:
      newState.date.date = new Date(action.value);
      newState.date.valid = newState.date.date > new Date();
      return newState;
    case ACTIONS.SET_HALL:
      newState.hall.value = action.value;
      newState.hall.valid = true;
      return newState;
    case ACTIONS.SET_FILM:
      newState.film.value = action.value;
      newState.film.valid = true;
      return newState;
    case ACTIONS.VALIDATE:
      newState.valid = action.value;
      return newState;
    case ACTIONS.SET_HALL_SEARCH:
      newState.hall.name = action.value;
      return newState;
    case ACTIONS.SET_FILM_SEARCH:
      newState.film.name = action.value;
      return newState;
    case ACTIONS.SET_TICKETPRICE:
      newState.ticketPrice.value = action?.action?.target?.value;
      let number = Number.parseFloat(action?.action?.target?.value);
      newState.ticketPrice.valid = !isNaN(number) && number > 0;
      return newState;
  }
};

interface PropsType {
  seans?: Seans;
  fetchMethod: string;
}

export default function SeansEditor({ seans, fetchMethod }: PropsType) {
  const history = useHistory();
  const [state, dispatch]: any = useReducer<any, any>(reducer, seans, init);
  const [halls, setHalls] = useState<Hall[] | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    fetchFilms();
    fetchHalls();
  }, []);
  useEffect(() => {}, [state]);

  const fetchFilms = async () => {
    setFilms(await getFilms());
  };
  const fetchHalls = async () => {
    setHalls(await getHalls());
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      !(
        state.date.date &&
        state.date.date > new Date() &&
        state.film.value &&
        state.hall.value
      )
    )
      dispatch({ type: ACTIONS.VALIDATE, value: false });
    else {
      const length = (state.film?.value as Film).length;
      const DATE = new Date(state.date.date);
      let minutes = DATE.getMinutes();
      let hour = DATE.getHours();
      let day = DATE.getDate();
      let year = DATE.getFullYear();
      let month = DATE.getMonth() + 1;
      const startDate = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day}`;
      const startTime = `${hour < 10 ? '0' : ''}${hour}:${
        minutes < 10 ? '0' : ''
      }${minutes}`;
      minutes = minutes + length;
      hour = hour + Math.floor(minutes / 60);
      minutes = minutes % 60;
      day = day + Math.floor(hour / 24);
      hour = hour % 24;
      let monthsLength = MonthsLength(month);
      month = month + Math.floor(day / monthsLength);
      day = day % monthsLength;
      if (month === 13) {
        year++;
        month = 1;
      }
      const endDate = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day}`;
      const endTime = `${hour < 10 ? '0' : ''}${hour}:${
        minutes < 10 ? '0' : ''
      }${minutes}`;
      var url = new URL(`${process.env.REACT_APP_BACKEND}/api/seans`),
        params: any = {
          startDate,
          endDate,
          startTime,
          endTime,
          id: seans?._id || '',
          hall: state.hall.value?._id || '',
        };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      seansDateVerify(url).then((json: Array<any>) => {
        if (json.length > 0) {
          dispatch({ type: ACTIONS.VALIDATE, value: false });
        } else {
          const obj: Seans = {
            film: state.film.value._id,
            hall: state.hall.value._id,
            ticketPrice: state.ticketPrice.value,
            date: { date: startDate, time: startTime },
            endDate: { date: endDate, time: endTime },
          };
          updateSeansById(seans?._id || null, fetchMethod, obj)
            .then((json) => history.push('/seans'))
            .catch((err) => console.error(err));
        }
      });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={styles.marginBottom}>
          {films && (
            <Autocomplete
              value={state.film.value}
              onChange={(event: any, newValue: any) => {
                dispatch({ type: ACTIONS.SET_FILM, value: newValue });
              }}
              inputValue={state.film?.name || ''}
              onInputChange={(event, newInputValue) => {
                dispatch({
                  type: ACTIONS.SET_FILM_SEARCH,
                  value: newInputValue,
                });
              }}
              getOptionLabel={(x) => `${x.title} `}
              options={films as Film[]}
              renderInput={(params) => <TextField {...params} label="Film" />}
            />
          )}
        </div>
        <div className={styles.marginBottom}>
          {halls && (
            <Autocomplete
              value={state.hall.value}
              onChange={(event: any, newValue: any) => {
                dispatch({ type: ACTIONS.SET_HALL, value: newValue });
              }}
              inputValue={state?.hall?.name}
              onInputChange={(event, newInputValue) => {
                dispatch({
                  type: ACTIONS.SET_HALL_SEARCH,
                  value: newInputValue,
                });
              }}
              getOptionLabel={(x) => `Sala nr ${x.number}`}
              options={halls}
              renderInput={(params) => <TextField {...params} label="Sala" />}
            />
          )}
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props: any) => <TextField {...props} />}
              label="Czas rozpoczęcia seansu"
              value={state?.date?.date}
              onChange={(value: any) => {
                dispatch({ type: ACTIONS.SET_DATE, value });
              }}
            />
          </LocalizationProvider>
          {!state.date.valid && (
            <p className={styles.error}>
              Data jest zarezerwowana i nie może być z przeszłości
            </p>
          )}
        </div>
        <div className={styles.marginBottom}>
          <FormControl fullWidth className={styles.marginLeft}>
            <TextField
              error={!state.ticketPrice.valid}
              helperText={
                state.ticketPrice.valid
                  ? ''
                  : 'Podana wartość powinna być większa od 0!'
              }
              label="Cena Biletu"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*.(([0-9]){0,1}){2}',
              }}
              value={state.ticketPrice.value}
              onChange={(action: any) => {
                dispatch({ type: ACTIONS.SET_TICKETPRICE, action });
              }}
            />
          </FormControl>
        </div>
        <Button type="submit" variant="outlined" sx={{ mt: 8 }}>
          Dodaj
        </Button>
      </form>
    </div>
  );
}
