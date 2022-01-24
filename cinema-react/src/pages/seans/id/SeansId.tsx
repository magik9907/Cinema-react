import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketEditor from '../../../components/ticketEditor/ticketEditor';
import { Seans } from '../../../data/Seans';
import { Ticket } from '../../../data/Ticket';
import { getSeansById } from '../../../Requests/seans';
import { getTicketsForSeans } from '../../../Requests/ticket';

export default function SeansId(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [seans, setSeans] = useState<Seans | null>(null);
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  useEffect(() => {
    getSeansById(id).then((json: Seans | null) => {
      setSeans(json);
      if (json)
        getTicketsForSeans(json?._id as string).then((t: Ticket[]) => {
          setTickets(t);
        });
    });
  }, []);
    let date: Date = new Date();
  if (seans) {
    date = new Date(seans?.date.date || '');
    date.setHours(
      Number.parseInt(seans?.date.time.split(':')[0]),
      Number.parseInt(seans?.date.time.split(':')[1])
    );
    console.log(date);
  }
  return (
    <>
      {seans && (
        <div>
          <div>
            <h1>{seans.film?.title || 'BRAK TYTUŁU'}</h1>
            <h2>Sala: {seans.hall?.number || 0}</h2>
            <h3>Długość: {seans.film?.length || 0} minut</h3>
            <p>
              Data{' '}
              <span style={{ fontWeight: 'bold' }}>
                {seans.date.date || ''} {seans.date.time || ''}
              </span>
            </p>
            <p>Cena biletu: {seans.ticketPrice || '0.0'}</p>
            <p>Sprzedane bilety: {tickets?.length || 0}</p>
            <p>
              Dostępne bilety: {seans.hall?.capacity - (tickets?.length || 0)}
            </p>
          </div>
          {date > new Date() && <TicketEditor fetchMethod="POST" seans={id} />}
        </div>
      )}
    </>
  );
}
