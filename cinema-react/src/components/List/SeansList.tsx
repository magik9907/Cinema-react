import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Seans } from '../../data/Seans';
import { DateTime } from '../../data/DateTime';
import Element from './Element/Element';
import { Checkbox, FormControlLabel } from '@mui/material';
import { getSeans } from '../../Requests/seans';

type SeansList = {
  _id: string[];
  seans: Seans[];
};

export default function SeansList() {
  const [seans, setSeans] = useState<SeansList[]>([]);
  const [now, setNow] = useState<boolean>(true);
  useEffect(() => {
    fetchData();
  }, [now]);

  const Rerender = () => fetchData();

  const fetchData = () => {
    getSeans(now)
      .then((json: SeansList[]) => {
        setSeans(json);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={now}
            onChange={(event) => setNow(event?.target.checked || false)}
          />
        }
        label="Seanse od obecnej chwili"
      />
      {seans &&
        seans.map((elem: SeansList, idx) => (
          <div key={`list${idx}`}>
            <h3>{elem._id}</h3>
            <List>
              {elem.seans.map(({ date, hall, film, _id }: any) => (
                <Element
                  content={`${date.date} ${date?.time || ''} | Sala ${
                    hall[0].number || 'Brak'
                  } | ${film[0].title}`}
                  allowEdit={true}
                  allowDelete={false}
                  address={`seans/${_id}`}
                  key={`list${idx}-${_id}`}
                  api="seans/id?id="
                  id={_id}
                  rerender={Rerender}
                />
              ))}
            </List>
          </div>
        ))}
    </div>
  );
}
