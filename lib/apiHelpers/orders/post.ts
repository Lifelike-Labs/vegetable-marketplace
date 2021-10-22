import { Order } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { createOrder } from '../../../lib/domains/order/api'

export async function handlePostOrder(userId: string, listingId: string): Promise<Order> {
  const createOrderPayload: Prisma.OrderCreateInput = {
    user: { connect: { id: userId } },
    listing: { connect: { id: listingId } },
  }
  return createOrder(createOrderPayload)
}
