import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hall } from '../../../data/Hall';
import { getHallById } from '../../../Requests/hall';

export default function HallId(): JSX.Element {
  const { id }: { id: string } = useParams();
  const [hall, setHall] = useState<Hall | null>(null);
  useEffect(() => {
    getHallById(id)
      .then((json: Hall | null) => {
        setHall(json);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div>
      <h1>Pokój numer: {hall?.number || ''}</h1>
      <p>Pojemność:{hall?.capacity || ''} osób</p>
    </div>
  );
}
