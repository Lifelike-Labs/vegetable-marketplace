import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { NextLinkComposed } from '../components/common/Link'
import ConnectedListingList from '../components/listing/ConnectedListingList';

const Dashboard: NextPage = () => {
    return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My listings
      </Typography>
      { /* note that `options` prop has correct typing info for its object shape */ }
      <ConnectedListingList options={{ myListings: true }}/>
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
    </Box>
  )
}

export default Dashboard
