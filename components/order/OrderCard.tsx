import { Card, Typography, CardActionArea } from '@mui/material'
import { Box } from '@mui/system'
import { OrderWithListing } from '../../lib/domains/order/api'
import Link from '../common/Link'

interface Props {
  order: OrderWithListing
}

export default function OrderCard({ order }: Props) {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/listing/${order.listing.id}`}>
        <Box p={2}>
          <Typography variant="h6">{order.listing.title}</Typography>
          <Typography variant="body1">
            <b>Ordered on: </b>{new Date(order.createdAt).toDateString()}</Typography>
          <Typography variant="caption"><b>Order ID: </b>{order.id}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
