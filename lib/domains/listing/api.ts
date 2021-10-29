import { Listing, Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createListing = async (createListingPayload: Prisma.ListingCreateInput) =>
  await prisma.listing.create({
    data: createListingPayload,
  })

export const listListings = async (): Promise<Listing[]> => await prisma.listing.findMany()

export const listMyListings = async (userId: string): Promise<Listing[]> =>
  await prisma.listing.findMany({
    where: { user: { id: userId } },
  })

export const getListingById = async (listingId: string): Promise<Listing | null> =>
  await prisma.listing.findUnique({ where: { id: listingId } })
