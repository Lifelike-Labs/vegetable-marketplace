import { Stack } from '@mui/material'
import { OrderWithListing } from '../../lib/domains/order/api'
import OrderCard from './OrderCard'

interface Props {
  orders: OrderWithListing[] | undefined
}

export default function OrderList({ orders }: Props) {
  return (
    <Stack spacing={2}>
      {orders && orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </Stack>
  )
}
