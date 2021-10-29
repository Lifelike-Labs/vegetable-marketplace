import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ConnectedListingList from '../components/listing/ConnectedListingList';

const Home: NextPage = () => {
    return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Available Veggies
      </Typography>
        {/* @ts-ignore . For now we just have to add ts-ignore when we know `options` prop not required */}
      <ConnectedListingList />
    </Box>
  )
}

export default Home
