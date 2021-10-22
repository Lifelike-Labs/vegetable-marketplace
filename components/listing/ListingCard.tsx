import { Listing } from '.prisma/client'
import { Card, Typography, CardActionArea } from '@mui/material'
import { Box } from '@mui/system'
import Link from '../common/Link'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  console.log(listing)
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/listing/${listing.id}`}>
        <Box p={2}>
          <Typography variant="h6">{listing.title}</Typography>
          <Typography variant="body1">{listing.description}</Typography>
          <Typography variant="body1">{listing.priceInCentsPerUnit}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
