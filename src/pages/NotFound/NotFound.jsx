import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

import "./NotFound.scss"
const NotFound = () => {
const primary = purple[500]; // #f44336

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '98vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h3" style={{ color: 'white' }}>
        404 page not found
      </Typography>
    </Box>
  );
}

export default NotFound