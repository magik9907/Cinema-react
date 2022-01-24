import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SeansEditor from '../../../../components/seansEditor/seansEditor';
import { Seans } from '../../../../data/Seans';

export default function SeansEdit() {
  const [state, setState] = useState<Seans | null>(null);
  const { id }: { id: string } = useParams();
  const url = `${process.env.REACT_APP_BACKEND}/api/seans/id?id=${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json: Seans) => {
        setState(json);
      });
  }, []);
  return (
    <>{state && <SeansEditor seans={state} fetchMethod="PUT"></SeansEditor>}</>
  );
}
