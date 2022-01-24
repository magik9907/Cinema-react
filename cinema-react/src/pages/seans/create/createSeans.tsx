import React from 'react';
import SeansEditor from '../../../components/seansEditor/seansEditor';

export default function CreateSeans(): JSX.Element {
  return <SeansEditor fetchMethod="POST" />;
}
