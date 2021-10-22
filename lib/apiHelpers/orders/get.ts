import { OrderWithListing, getOrdersByUserId } from "../../domains/order/api";

export async function handleGetOrders(userId: string): Promise<OrderWithListing[]> {
    return getOrdersByUserId(userId)
}