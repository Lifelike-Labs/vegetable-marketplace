import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Box m={20}>
        <Typography variant="h4">
          Lettuce help you buy and sell vegetables, right from your computer! 
        </Typography>
      </Box>
    </>
  )
}

export default Home
