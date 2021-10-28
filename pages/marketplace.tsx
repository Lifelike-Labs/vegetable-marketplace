import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHandler from '../components/common/ErrorHandler'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import { useListings } from '../lib/frontend/data'

const Home: NextPage = () => {
  const { data, error } = useListings()
  if (!data && !error) return <Loader />
  if (error) return <ErrorHandler error={error} />
  if (!data) return <Loader />

  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Available Veggies
      </Typography>
      <ListingList data={data} />
    </Box>
  )
}

export default Home
