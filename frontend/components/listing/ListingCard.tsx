import { Listing } from '.prisma/client'
import { Box, Card, Typography, Button } from '@mui/material'
import { NextLinkComposed } from '../common/Link'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  return (
    <Card>
      <Button variant="text" color="inherit" component={NextLinkComposed} to={`listing/${listing.id}`}>
        <Box p={2}>
          <Typography variant="h6">{listing.title}</Typography>
          <Typography variant="body1">{listing.description}</Typography>
        </Box>
      </Button>
    </Card>
  )
}
