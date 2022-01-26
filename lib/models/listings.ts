import { PrismaClient, Listing } from '@prisma/client'
import { prisma } from 'lib/db/prisma'

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

}
