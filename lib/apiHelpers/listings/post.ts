import { Listing } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { createListing } from '../../../lib/domains/listing/api'

export async function handlePostListing(userId: string, body: any): Promise<Listing> {
  const { title, description } = body
  // TODO remove these stand in attributes
  const createListingPayload: Prisma.ListingCreateInput = {
    title,
    description,
    user: { connect: { id: userId } },
  }
  return createListing(createListingPayload)
}
