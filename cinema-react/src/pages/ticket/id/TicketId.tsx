import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket } from '../../../data/Ticket';
import { Seans } from '../../../data/Seans';
import { Discount } from '../../../data/Discount';

export default function SeansId(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [seans, setSeans] = useState<Seans | null>(null);
  const [discount, setDiscount] = useState<Discount | null>(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/api/ticket/id?id=${id}`)
      .then((res) => res.json())
      .then((json: Ticket) => {
        setTicket(json);
        fetch(`${process.env.REACT_APP_BACKEND}/api/seans/id?id=${json?.seans}`)
          .then((res) => res.json())
          .then((json: Seans) => setSeans(json))
          .catch((err: any) => {
            console.error(err);
          });
        if (json.discount)
          fetch(
            `${process.env.REACT_APP_BACKEND}/api/discount/${json?.discount}`
          )
            .then((res) => res.json())
            .then((json: Discount) => setDiscount(json))
            .catch((err: any) => {
              console.error(err);
            });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {ticket && seans && (
        <div>
          <h1>{seans?.film?.title || 'BRAK TYTUŁU'}</h1>
          <h2>Sala: {seans?.hall?.number || 0}</h2>
          <h2>Siedzenie nr: {ticket.seatNo || 'BRAK'}</h2>
          <h3>Długość: {seans?.film?.length || 0} minut</h3>
          <p>
            Data{' '}
            <span style={{ fontWeight: 'bold' }}>
              {seans?.date.date || ''} {seans?.date.time || ''}
            </span>
          </p>
          <p>
            Kupujący: {ticket?.name || 'Gall'} {ticket?.surname || 'Anonim'}
          </p>
          <p>
            Cena:{' '}
            {seans &&
              (
                (seans?.ticketPrice?.valueOf() || 0) *
                (1 - (discount ? discount.value?.valueOf() : 0))
              ).toFixed(2)}
          </p>
        </div>
      )}
    </>
  );
}
