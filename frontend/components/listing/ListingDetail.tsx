import { Listing } from '.prisma/client'
import { Box, Card, Typography } from '@mui/material'

interface Props {
  listing: Listing
}

export default function ListingDetail({ listing }: Props) {
  const createdAt = new Date(listing.createdAt)
  const updatedAt = new Date(listing.updatedAt)

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">Title: {listing.title}</Typography>
        <Typography variant="body1"> Created at: {createdAt.toDateString()}</Typography>
        <Typography variant="body1"> Last updated at: {updatedAt.toDateString()}</Typography>
        <Typography variant="body1">Description: {listing.description}</Typography>
      </Box>
    </Card>
  )
}
