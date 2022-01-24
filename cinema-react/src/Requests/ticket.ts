import { Ticket } from '../data/Ticket';

const url = `${process.env.REACT_APP_BACKEND}/api/ticket`;

export const getTickets = async (): Promise<Ticket[]> => {
  let logVal = fetch(`${url}`).then((response: Response) => response.json());
  await logVal;
  return logVal;
};

export const updateTicketById = (
  id: string | null,
  fetchMethod: string,
  ticket: Ticket
): Promise<Response | null> => {
  const link = id ? `${url}/id?id=${id}` : url;
  return fetch(link, {
    method: fetchMethod,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  })
    .then((res) => res)
    .catch((e) => {
      console.log(e);
      return null;
    });
};

export function getTicketsForSeans(id:string):Promise<Ticket[]>{
  return fetch(`${process.env.REACT_APP_BACKEND}/api/ticket/?seans=${id}`)
  .then((res) => res.json())
  .catch((err: any) => {
    console.error(err);
  });
}