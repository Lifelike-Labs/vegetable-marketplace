import { Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createOrder = async (createOrderPayload: Prisma.OrderCreateInput) => {
  const result = await prisma.order.create({
    data: createOrderPayload,
  })
  return result
}
