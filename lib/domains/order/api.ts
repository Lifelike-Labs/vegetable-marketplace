import { Order, Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createOrder = async (createOrderPayload: Prisma.OrderCreateInput) => {
  const result = await prisma.order.create({
    data: createOrderPayload,
  })
  return result
}

export interface OrderWithListing {
  id: string;
  createdAt: Date;
  listing: {
    id: string;
    title: string;
  }
}

export const getOrdersByUserId = async (userId: string): Promise<OrderWithListing[]> => prisma.order.findMany({
    where: { user: { id: userId } },
    select: {
      id: true,
      createdAt: true,
      listing: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })
