import * as React from 'react';
import Box from '@mui/material/Box';

export default function Colors() {
  return (
      <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
        <Box className="blockContainer">
          <Box className="bloc" style={{backgroundColor: '#f22f23'}}/>
          <Box className="bloc" style={{backgroundColor: '#f2de00'}}/>
          <Box className="bloc" style={{backgroundColor: '#1e9773'}}/>
          <Box className="bloc" style={{backgroundColor: '#004984'}}/>
          <Box className="bloc" style={{backgroundColor: '#231f21'}}/>
          <Box className="bloc" style={{backgroundColor: '#99938f'}}/>
          <Box className="bloc" style={{backgroundColor: '#d32481'}}/>
          <Box className="bloc" style={{backgroundColor: '#c65223'}}/>
        </Box>
      </Box>
  );
}
