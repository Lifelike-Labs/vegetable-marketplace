import { PrismaClient, Listing } from '@prisma/client'
import { prisma } from 'backend/db/prisma'

type CreateListingPayload = {
  title: string
  description: string
  userId: string
}

export class Listings {
  private readonly prisma: PrismaClient['listing']

  constructor() {
    this.prisma = prisma['listing']
  }

  async createListing(data: CreateListingPayload): Promise<Listing> {
    const result = await prisma.listing.create({ data })
    return result
  }

  async listListings(): Promise<Listing[]> {
    const listings = await prisma.listing.findMany()
    return listings
  }

  async listMyListings(userId: string): Promise<Listing[]> {
    const listings = await prisma.listing.findMany({
      where: { user: { id: userId } },
    })
    return listings
  }

  async getListing(listingId: string): Promise<Listing> {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    })
    return listing
  }

}
