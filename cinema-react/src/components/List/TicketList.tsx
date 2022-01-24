import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Ticket } from '../../data/Ticket';
import Element from './Element/Element';
import { getTickets } from '../../Requests/ticket';

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const Rerender = async () => fetchData();

  const fetchData = async () => {
    getTickets()
      .then((json: Ticket[]) => {
        setTickets(json);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  return (
    <div>
      {tickets &&
        tickets.map((elem: Ticket, idx) => (
          <div key={`list${idx}`}>
            <List>
              <Element
                content={`Film: ${elem?.seans?.film.title} | Sala ${
                  elem?.seans?.hall?.number || 'Brak'
                } | ${elem.seans?.date.date} | ${elem.surname} ${elem.name}`}
                address={`ticket/${elem._id}`}
                key={`list${idx}-${elem._id}`}
                allowDelete={false}
                api="ticket/id?id="
                id={elem._id}
                rerender={Rerender}
                allowEdit={false}
              />
            </List>
          </div>
        ))}
    </div>
  );
}
