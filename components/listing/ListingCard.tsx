import { Listing } from '.prisma/client'
import { Card, CardActionArea, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {NextLinkComposed} from "../common/Link";

interface Props {
  data: Listing
}

// TODO: Investigate editor error message "Property 'priceInCentsPerUnit' does not exist on type 'Listing'."
// Coming from where we attempt to display listing.priceInCentsPerUnit.
// Currently priceInCentsPerUnit doesn't exist in the schema.

export default function ListingCard({ data }: Props) {
  console.log(data)
  return (
      <Card>
          <CardActionArea component={NextLinkComposed} to={`/listing/${data.id}`} >
              <Box p={2}>
                  <Typography variant="h6">{data.title}</Typography>
                  <Typography variant="body1">{data.description}</Typography>
                  <Typography variant="body1">{data.priceInCentsPerUnit}</Typography>
              </Box>
          </CardActionArea>
      </Card>
  )
}
