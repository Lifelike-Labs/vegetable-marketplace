import { Listing } from '.prisma/client'
import { Stack } from '@mui/material'
import ListingCard from './ListingCard'

interface Props {
  listings: Listing[] | undefined
}

export default function ListingList({ listings }: Props) {
  return (
    <Stack spacing={2}>
      {listings && listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
    </Stack>
  )
}
