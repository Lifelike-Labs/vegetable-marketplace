import { Listing } from '.prisma/client'
import { listListings, listMyListings } from '../../../lib/domains/listing/api'

export async function handleGetListings(userId: string, query: {
  [key: string]: string | string[]
}): Promise<Listing[]> {
  let listings: Listing[]
  if (query.myListings) {
    listings = await listMyListings(userId)
  } else {
    listings = await listListings()
  }
  return listings
}
