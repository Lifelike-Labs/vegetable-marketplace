import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHandler from '../components/common/ErrorHandler'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import { useListings } from '../lib/frontend/data'

const Home: NextPage = () => {
  const { listings, isLoading, isError } = useListings()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHandler error={isError} />
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Available Veggies
      </Typography>
      <ListingList listings={listings} />
    </Box>
  )
}

export default Home
