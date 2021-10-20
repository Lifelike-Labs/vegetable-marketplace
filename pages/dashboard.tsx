import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHanlder from '../components/common/ErrorHandler'
import { NextLinkComposed } from '../components/common/Link'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import { useMyListings } from '../lib/frontend/data'

const Dashboard: NextPage = () => {
  const { myListings, isLoading, isError } = useMyListings()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My listings
      </Typography>
      <ListingList listings={myListings} />
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
    </Box>
  )
}

export default Dashboard
