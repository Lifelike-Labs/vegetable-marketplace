import { Listing, Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createListing = async (createListingPayload: Prisma.ListingCreateInput) => {
  const result = await prisma.listing.create({
    data: createListingPayload,
  })
  return result
}

export const listListings = async (): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany()
  return listings
}

export const listMyListings = async (userId: string): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany({
    where: { user: { id: userId } },
  })
  return listings
}

export const getListingById = async (id: string): Promise<Listing | null> => {
  const listing = await prisma.listing.findFirst({
    where: {id}
  })
  return listing
}
