import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Line = () => <Box sx={{
  borderBottom: '1px solid #DDDFE2',
  width: '45%'
}}></Box>;

const OrLine = () => {
  return (
    <Box
      sx={{
        padding: '10px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Line/>
      <Box>or</Box>
      <Line/>
    </Box>
  )
};

export default OrLine;
