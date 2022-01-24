import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

interface EditProps {
  link: string;
}

export default function Edit({ link }: EditProps) {
  return (
    <Box component={Link} to={link}>
      <IconButton
        aria-label="Edytuj"
        size="large"
        sx={{ color: 'text.secondary' }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
}
