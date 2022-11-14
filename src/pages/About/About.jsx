import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const About = () => {
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
        This is about
      </Typography>
    </Box>
  );
}

export default About