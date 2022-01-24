import { Box } from '@mui/system';
import React from 'react';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ p: '16px', color: 'text.secondary', bgcolor: 'primary.main' }}
    >
      @Copyright 2021
    </Box>
  );
}
