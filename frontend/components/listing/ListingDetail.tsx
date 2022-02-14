import { Listing } from '.prisma/client'
import { Box, Card, Typography } from '@mui/material'

interface Props {
  listing: Listing
}

export default function ListingDetail({ listing }: Props) {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body1">{listing.createdAt}</Typography>
        <Typography variant="body1">{listing.updatedAt}</Typography>
        <Typography variant="body1">{listing.description}</Typography>
      </Box>
    </Card>
  )
}
