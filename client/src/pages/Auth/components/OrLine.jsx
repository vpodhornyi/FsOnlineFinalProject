import * as React from 'react';
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";


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


const Line = styled(Box)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.border.main}`,
  width: '45%'
}))
export default OrLine;
