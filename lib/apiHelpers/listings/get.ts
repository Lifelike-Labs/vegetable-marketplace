import { Listing } from '.prisma/client'
import {getListingById, listListings, listMyListings} from '../../domains/listing/api'

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

export async function handleGetListingById(listingId: string, query: {
  [key: string]: string | string[]
}): Promise<Listing|null> {
  let listing: Listing|null
  listing = await getListingById(listingId)
  return listing
}
