import FormControl from '@mui/material/FormControl';
import { Ticket } from '../../data/Ticket';
import { Discount } from '../../data/Discount';
import { Autocomplete, Button, TextField } from '@mui/material';
import React, {
  FormEvent,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Seans } from '../../data/Seans';
import styles from './ticketEditor.module.scss';
import { useHistory } from 'react-router-dom';
import TicketContext, {
  TicketContextAction,
} from '../../providers/TicketProviders';
import { getDiscount } from '../../Requests/discount';
import { updateTicketById } from '../../Requests/ticket';

type EventChange = React.ChangeEvent<HTMLInputElement & HTMLSelectElement>;
type IdType = { value?: Discount | Seans; name: string; valid: boolean };
type numberType = { value: number; valid: boolean };
type StringType = { value: string; error?: string };

interface State {
  name: StringType;
  surname: StringType;
  discount: IdType;
  seans: IdType;
  seatNo: numberType;
  valid: boolean;
}

type PropsType = {
  ticket?: Ticket;
  fetchMethod: string;
  seans?: string;
};

const init = (ticket: Ticket): State => {
  const name: StringType = {
    value: ticket?.name || '',
    error: !!ticket?.name ? '' : 'Brak imienia lub niedozwolone znaki',
  };
  const surname: StringType = {
    value: ticket?.surname || '',
    error: !!ticket?.surname ? '' : 'Brak nazwiska lub niedozwolone znaki',
  };
  const discount: IdType = {
    value: ticket?.discount,
    name: ticket?.discount?.type || '',
    valid: !!ticket?.discount?._id || false,
  };
  const seans: IdType = {
    value: ticket?.seans || null,
    name: ticket?.seans?.film?.title || '',
    valid: !!ticket?.seans._id || false,
  };
  const seatNo: numberType = {
    value: ticket?.seatNo || 0,
    valid:
      ticket?.seans?.hall?.capacity >= ticket?.seatNo && ticket?.seatNo > 0,
  };
  const valid: boolean = discount.valid && seans.valid && seatNo.valid;

  return {
    name,
    surname,
    discount,
    seans,
    seatNo,
    valid,
  };
};

const ACTIONS = {
  SET_NAME: 'SET_NAME',
  SET_SURNAME: 'SET_SURNAME',
  SET_SEAT: 'SET_SEAT',
  SET_SEAT_SEARCH: 'SET_SEAT_SEARCH',
  SET_DISCOUNT: 'SET_DISCOUNT',
  SET_DISCOUNT_SEARCH: 'SET_DISCOUNT_SEARCH',
  SET_SEANS: 'SET_SEANS',
  VALIDATE: 'VALIDATE',
  VALIDATE_SEAT: 'VALIDATE_SEAT',
  RESET: 'RESET',
};

const validate = (state: State) => {
  return (
    state.discount != null &&
    state.seans != null &&
    state.seatNo.valid &&
    !state.name.error &&
    !state.surname.error
  );
};

const reducer = (state: State, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.SET_DISCOUNT:
      newState.discount.value = action.value;
      newState.discount.valid = true;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.SET_NAME:
      newState.name.value = action.action.target.value;
      newState.name.error = new RegExp(
        "[a-z A-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u024F'-]"
      ).test(action.value)
        ? ''
        : 'Brak nazwiska lub niedozwolone znaki';
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.SET_SURNAME:
      newState.surname.value = action.action.target.value;
      newState.surname.error = new RegExp(
        "[a-z A-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u024F'-]"
      ).test(action.value)
        ? ''
        : 'Brak nazwiska lub niedozwolone znaki';
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.VALIDATE_SEAT:
      newState.seatNo.valid = action.value;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.SET_DISCOUNT_SEARCH:
      newState.discount.name = action.value;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.SET_SEAT:
      newState.seatNo.value = Number.parseInt(action.value);
      newState.valid = validate(newState);
      newState.seatNo.valid = true;
      return newState;
    case ACTIONS.SET_SEANS:
      newState.seans.value = action.json;
      newState.seans.name = action?.film?.title;
      newState.seans.valid = true;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.SET_SEAT_SEARCH:
      newState.seatNo.value = action?.value || 0;
      newState.seatNo.valid = newState.seatNo.value > 0;
      newState.seatNo.valid = action.valid;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.VALIDATE:
      newState.valid = action.value;
      newState.valid = validate(newState);
      return newState;
    case ACTIONS.RESET:
      return {
        ...state,
        name: '',
        surname: '',
        seatNo: 0,
        valid: false,
      };
  }
};

export default function TicketEditor({
  ticket,
  fetchMethod,
  seans,
}: PropsType) {
  const { state: contextState, dispatch: contextDispatch } =
    useContext(TicketContext);
  const history = useHistory();
  const [state, dispatch]: any = useReducer<any, any>(reducer, ticket, init);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [seats, setSeats] = useState<Number[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/api/ticket/?seans=${seans}`)
      .then((res) => res.json())
      .then((json: Ticket[]) => {
        setTickets(json);
        console.log(json);
      });
  }, []);

  useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND}/api/seans/id?id=${seans}`)
      .then((res) => res.json())
      .then((json: Seans) => {
        let tmpSeats = [];
        if (json.hall?.capacity <= 500) {
          if (tickets == null || tickets.length === 0) {
            for (let i = 0; i < json.hall?.capacity; i++) {
              if (isSeatFree(i + 1)) tmpSeats.push(i + 1);
            }
          } else {
            let j = 0;
            for (let i = 0; i < json.hall?.capacity; i++) {
              if (
                j > tickets.length ||
                !tickets.find((x: Ticket) => x.seatNo == i)
              ) {
                tmpSeats.push(i + 1);
              }
            }
          }
        }
        setSeats(tmpSeats);
        dispatch({ type: ACTIONS.SET_SEANS, json });
      });
  }, [tickets]);

  useEffect(() => {
    getDiscount().then((json: Discount[]) => setDiscounts(json));
  }, []);

  const isSeatFree = (seat: number) => {
    if (isNaN(seat) || seat <= 0 || seat > state?.seans?.value?.hall?.capacity)
      return false;
    if (tickets === null) return true;
    for (let i = 0; i < tickets?.length; i++) {
      if (tickets[i].seatNo === seat) return false;
    }
    for (let i = 0; i < contextState.length; i++)
      if (contextState[i].seatNo === seat) return false;

    return true;
  };

  const onSubmit = (event: FormEvent) => {
    const found = contextState.find(
      (x: Ticket) =>
        x.seatNo == state.seatNo.value && state.seans.value._id === x.seans._id
    );
    const valid =
      !found &&
      !state.name?.error &&
      !state.surname?.error &&
      state.seans?.valid &&
      state.seatNo.valid;
    dispatch({
      type: ACTIONS.VALIDATE,
      value: valid,
    });
    event.preventDefault();
    if (state.valid && valid) {
      const ticket: Ticket = {
        name: state.name.value,
        surname: state.surname.value,
        discount: state.discount.value?._id || null,
        seans: state.seans.value._id,
        seatNo: state.seatNo.value.toString(),
      };
      let url = ticket._id
        ? `${process.env.REACT_APP_BACKEND}/api/ticket?id=${ticket._id}`
        : `${process.env.REACT_APP_BACKEND}/api/ticket`;
      if (fetchMethod === 'POST') {
        ticket.seans = state.seans.value;
        contextDispatch({
          value: ticket,
          action: TicketContextAction.ADD_TICKET,
        });
      } else {
        updateTicketById(null, fetchMethod, ticket)
          .then((res: Response | null) => {
            if (res !== null && res.ok) {
              history.push('/tickets');
            }
          })
          .catch((err: any) => {});
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={styles.marginBottom}>
          <TextField
            id="ClientName"
            label="Imię"
            variant="standard"
            required
            error={!!state.name.error}
            inputProps={{
              inputMode: 'text',
              pattern:
                "[a-z A-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u024F'-]*",
            }}
            helperText={state.name.error}
            value={state.name.value}
            onChange={(action: any) => {
              dispatch({ type: ACTIONS.SET_NAME, action });
            }}
          />
        </div>
        <div className={styles.marginBottom}>
          <TextField
            id="ClientSurname"
            label="Nazwisko"
            variant="standard"
            required
            error={!!state.surname.error}
            inputProps={{
              inputMode: 'text',
              pattern:
                "[a-z A-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u024F'-]*",
            }}
            helperText={state.surname.error}
            value={state.surname.value}
            onChange={(action: any) => {
              dispatch({ type: ACTIONS.SET_SURNAME, action });
            }}
          />
        </div>

        {seats && (
          <div className={styles.marginBottom}>
            {state?.seans?.value?.hall?.capacity <= 500 ? (
              <FormControl fullWidth className={styles.marginLeft}>
                <Autocomplete
                  value={state.seatNo.value}
                  onChange={(event: any, newValue: any) => {
                    dispatch({ type: ACTIONS.SET_SEAT, value: newValue });
                  }}
                  inputValue={`${state.seatNo?.value}`}
                  onInputChange={(event: any, newInputValue) => {
                    dispatch({
                      type: ACTIONS.SET_SEAT_SEARCH,
                      value: newInputValue,
                      valid: isSeatFree(Number.parseInt(newInputValue)),
                    });
                  }}
                  getOptionLabel={(x) => {
                    return `${x}`;
                  }}
                  options={seats as Number[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Numer siedzenia" />
                  )}
                />
              </FormControl>
            ) : (
              <FormControl fullWidth className={styles.marginLeft}>
                <TextField
                  error={!state.seatNo?.valid}
                  helperText={
                    state.seatNo?.valid
                      ? ''
                      : 'wartość niedozwolona albo siedzenie jest zajęte'
                  }
                  label="Numer siedzenia"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={state.seatNo?.value}
                  onChange={(action: any) => {
                    let tmp = Number.parseInt(action?.target?.value);
                    dispatch({
                      type: ACTIONS.SET_SEAT_SEARCH,
                      action,
                      valid: isSeatFree(tmp),
                    });
                  }}
                />
              </FormControl>
            )}
          </div>
        )}
        <div className={styles.marginBottom}>
          {discounts && (
            <Autocomplete
              value={state.discount.value}
              onChange={(event: any, newValue: any) => {
                dispatch({ type: ACTIONS.SET_DISCOUNT, value: newValue });
              }}
              inputValue={state.discount?.type}
              onInputChange={(event, newInputValue) => {
                dispatch({
                  type: ACTIONS.SET_DISCOUNT_SEARCH,
                  value: newInputValue,
                });
              }}
              getOptionLabel={(x) => `${x.type}`}
              options={discounts as Discount[]}
              renderInput={(params) => <TextField {...params} label="Zniżka" />}
            />
          )}
          {state?.seans?.value &&
            (
              state?.seans?.value?.ticketPrice *
              (1 +
                (state.discount?.value == null
                  ? 0
                  : state.discount.value.value))
            ).toFixed(2)}{' '}
          PLN
        </div>
        <Button type="submit" variant="outlined" sx={{ mt: 8 }}>
          Dodaj
        </Button>
      </form>
    </div>
  );
}
