import React from 'react';
import HallEditor from '../../../components/hallEditor/HallEditor';

export default function CreateHall(): JSX.Element {
  return (
    <HallEditor
      fetchMethod="POST"
      fetchUrl={`${process.env.REACT_APP_BACKEND}/api/hall`}
    />
  );
}
