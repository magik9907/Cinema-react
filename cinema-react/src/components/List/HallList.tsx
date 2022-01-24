import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Hall } from '../../data/Hall';
import { getHalls } from '../../Requests/hall';
import Element from './Element/Element';

export default function HallList() {
  const [halls, setHalls] = useState<Hall[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const Rerender = () => fetchData();

  const fetchData = async () => {
    setHalls(await getHalls());
  };

  return (
    <List>
      {halls &&
        halls.map(({ number, capacity, _id }: Hall) => (
          <Element
            content={`Pokój nr ${number || '[nieznany]'}: ${
              capacity || '[nieznany]'
            }`}
            address={`hall/${_id}`}
            key={_id}
            api="hall/id/"
            id={_id}
            rerender={Rerender}
          />
        ))}
    </List>
  );
}
