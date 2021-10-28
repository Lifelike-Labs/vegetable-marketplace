import { Listing } from '.prisma/client'
import { Stack } from '@mui/material'
import ListingCard from './ListingCard'

interface Props {
  data: Listing[] | undefined
}

export default function ListingList({ data }: Props) {
  return (
    <Stack spacing={2}>
      {data && data.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
    </Stack>
  )
}
