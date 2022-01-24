import React, { FormEvent, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';
import styles from './HallEditor.module.scss';
import { useHistory } from 'react-router-dom';
import { Hall } from '../../data/Hall';
import { getHallByNumber, updateHall } from '../../Requests/hall';

type EventChangeType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface HallFormType {
  [key: string]: any;
  number: { value: number; error?: string };
  capacity: { value: number; error?: boolean };
  valid?: boolean;
}

type PropsType = {
  hall?: Hall;
  fetchMethod: string;
  fetchUrl: string;
};

export default function HallEditor({
  hall,
  fetchMethod,
  fetchUrl,
}: PropsType): JSX.Element {
  const history = useHistory();
  const [state, setState] = useState<HallFormType>({
    number: {
      value: hall?.number || 0,
      error: hall && hall.number > 0 ? '' : 'Pole musi być większe od 0',
    },
    capacity: {
      value: hall?.capacity || 0,
      error: !(hall && hall.capacity > 0),
    },
    valid: hall && hall.number > 0 && !(hall && hall.capacity > 0),
  });

  const isRoomNumberExist = async (number: number): Promise<boolean> => {
    if (isNaN(number)) return false;
    let resp: Response | null = null;
    resp = await getHallByNumber(number);

    const json: Hall[] = await resp?.json();
    return !!resp?.ok && json?.length > 0;
  };

  const inputChange = async (event: EventChangeType, key: string) => {
    const value = event.target.value;
    const newState: HallFormType = { ...state };
    newState[key].value = value;
    let number = Number.parseInt(value);
    if (key === 'number') {
      if (isNaN(number) || number <= 0)
        newState[key].error = 'Pole musi być większe od 0';
      else if (await isRoomNumberExist(parseInt(value)))
        newState[key].error = 'Numer pokoju już istnieje';
      else newState[key].error = '';
    } else newState[key].error = isNaN(number) || number <= 0;
    newState.valid = !(newState.number.error || newState.capacity.error);
    setState(newState);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (state.valid) {
      const hall: Hall = {
        number: state.number.value,
        capacity: state.capacity.value,
      };
      if (await updateHall(fetchUrl, fetchMethod, hall)) history.push('/hall');
    }
  };
  return (
    <form action="" onSubmit={onSubmit} noValidate={true}>
      <div>
        <FormControl className={styles.marginLeft}>
          <TextField
            error={!!state.number.error}
            helperText={state.number.error || ''}
            label="Numer sali"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={state.number.value}
            onChange={(event) => inputChange(event, 'number')}
          />
        </FormControl>
        <FormControl>
          <TextField
            error={state.capacity.error}
            helperText={state.capacity.error ? 'Wartość większa od zera' : ''}
            label="Liczba miejsc"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={state.capacity.value}
            onChange={(event) => inputChange(event, 'capacity')}
          />
        </FormControl>
      </div>
      <Button
        type="submit"
        variant="outlined"
        sx={{ mt: 8 }}
        disabled={!state.valid}
      >
        Dodaj
      </Button>
    </form>
  );
}
