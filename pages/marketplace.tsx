import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import ErrorHanlder from 'frontend/components/common/ErrorHandler'
import Loader from 'frontend/components/common/Loader'
import ListingList from 'frontend/components/listing/ListingList'
import { useListings } from 'frontend/data'

const Home: NextPage = () => {
  const { listings, isLoading, isError } = useListings()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />
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
