import { Listing } from '.prisma/client'
import {Button, Card, Typography} from '@mui/material'
import { Box } from '@mui/system'
import {NextLinkComposed} from "../common/Link";

interface Props {
  listing: Listing
}

// TODO: Investigate editor error message "Property 'priceInCentsPerUnit' does not exist on type 'Listing'."
// Coming from where we attempt to display listing.priceInCentsPerUnit.
// Currently priceInCentsPerUnit doesn't exist in the schema.

export default function ListingCard({ listing }: Props) {
  console.log(listing)
  return (
    <Card>
      <Box p={2}>
      <Button variant="text" color="inherit" component={NextLinkComposed} to={`/listing/${listing.id}`} >
          Listing details for listing id {listing.id}
      </Button>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body1">{listing.description}</Typography>
        <Typography variant="body1">{listing.priceInCentsPerUnit}</Typography>
      </Box>
    </Card>
  )
}
