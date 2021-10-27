import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHandler from '../components/common/ErrorHandler'
import { NextLinkComposed } from '../components/common/Link'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import { useListings, useMyListings } from '../lib/frontend/data'

const Dashboard: NextPage = () => {
    const { data, error } = useMyListings()
    if (!data && !error) return <Loader />
    if (error) return <ErrorHandler error={error} />
    if (!data) return <Loader />

    return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My listings
      </Typography>
      <ListingList listings={data} />
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
    </Box>
  )
}

export default Dashboard
