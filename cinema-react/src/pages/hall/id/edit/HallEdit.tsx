import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HallEditor from '../../../../components/hallEditor/HallEditor';
import { Hall } from '../../../../data/Hall';

export default function EditHall(): JSX.Element {
  const [state, setState] = useState<Hall | null>(null);
  const { id }: { id: string } = useParams();
  const url = `${process.env.REACT_APP_BACKEND}/api/hall/id/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json: Hall) => {
        setState(json);
      });
  }, []);
  return (
    <>{state && <HallEditor hall={state} fetchMethod="PUT" fetchUrl={url} />}</>
  );
}
