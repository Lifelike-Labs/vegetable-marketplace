import { Listing } from '.prisma/client'
import { Card, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  console.log(listing)
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body1">{listing.description}</Typography>
      </Box>
    </Card>
  )
}
