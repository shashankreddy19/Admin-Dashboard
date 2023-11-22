import React from 'react'
import { useTheme,Box,Typography } from '@mui/material'

const Header = ({ title, description }) => {
    const theme = useTheme();
  return (
      <Box>
          <Typography sx={{ mb: "25px" }} variant='h2' color={theme.palette.secondary[100]} fontWeight="bold">
              {title}
          </Typography>
          <Typography  variant='h5' color={theme.palette.secondary[300]} >
              {description}
          </Typography>
    </Box>
  )
}

export default Header
