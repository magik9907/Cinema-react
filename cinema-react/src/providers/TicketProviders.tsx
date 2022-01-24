import React, { useReducer } from 'react';
import { Ticket } from '../data/Ticket';
import { updateTicketById } from '../Requests/ticket';

export enum TicketContextAction {
  ADD_TICKET,
  REMOVE_TICKET,
  BUY_TICKET,
}

interface ActionType {
  action: TicketContextAction;
  value?: Ticket;
}

export interface TicketProviderProps {
  children: JSX.Element;
}

const TicketContext = React.createContext<{
  state: Ticket[];
  dispatch: React.Dispatch<ActionType>;
}>({ state: [], dispatch: () => {} });

const reducer = (state: Ticket[], { action, value }: ActionType) => {
  let newState = [...state];

  switch (action) {
    case TicketContextAction.ADD_TICKET:
      newState.push(value as Ticket);
      break;
    case TicketContextAction.REMOVE_TICKET:
      const ticket = value as Ticket;
      newState = state.filter(
        (elem: Ticket) =>
          !(
            elem.seans._id === ticket.seans._id && elem.seatNo === ticket.seatNo
          )
      );
      break;
    case TicketContextAction.BUY_TICKET:
      state.map((x: Ticket) =>
        updateTicketById(null, 'POST', x)
          .then((json) =>json)
          .catch((e) => {
            console.error(e);
          })
      );
      return [];
  }
  return newState;
};

export function TicketProvider({ children }: TicketProviderProps) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}

export default TicketContext;
