import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteProps {
  api?: string;
  id?: string;
  rerender: () => void;
}

export default function Delete({ api, id, rerender }: DeleteProps) {
  const onClick = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/api/${api}${id}`, {
      method: 'DELETE',
    })
      .then((response: Response) => {
        rerender();
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <IconButton
      aria-label="Usuń"
      size="large"
      onClick={onClick}
      sx={{ color: 'text.secondary' }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
