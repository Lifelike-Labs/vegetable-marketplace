import { Listing } from '.prisma/client'
import { getListingById, listListings, listMyListings } from '../../domains/listing/api'

interface Query {
  [key: string]: string | string[]
}

export async function handleGetListings(userId: string, query: Query): Promise<Listing[]> {
  if (query.myListings) {
    return await listMyListings(userId)
  }

  return await listListings()
}

export async function handleGetListingById(
  listingId: string,
  query: Query,
): Promise<Listing | null> {
  return await getListingById(listingId)
}
