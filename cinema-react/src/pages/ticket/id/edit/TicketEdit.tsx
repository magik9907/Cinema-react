import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TicketEditor from '../../../../components/ticketEditor/ticketEditor';
import { Ticket } from '../../../../data/Ticket';

export default function SeansEdit() {
  const [state, setState] = useState<Ticket | null>(null);
  const { id }: { id: string } = useParams();
  const url = `${process.env.REACT_APP_BACKEND}/api/tickets/id?id=${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json: Ticket) => {
        setState(json);
      });
  }, []);
  return (
    <>
      {state && <TicketEditor ticket={state} fetchMethod="PUT"></TicketEditor>}
    </>
  );
}
