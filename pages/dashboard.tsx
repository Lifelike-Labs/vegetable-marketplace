import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import React from 'react'
import ErrorHanlder from '../components/common/ErrorHandler'
import { NextLinkComposed } from '../components/common/Link'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import OrderList from '../components/order/OrderList'
import { useMyListings, useOrders } from '../lib/frontend/data'

const Dashboard: NextPage = () => {
  const { myListings, isLoading: isListingsLoading, isError: isListingsError } = useMyListings()
  const { orders, isLoading: isOrdersLoading, isError: isOrdersError } = useOrders()
  if (isListingsLoading || isOrdersLoading) return <Loader />
  if (isListingsError || isOrdersError) return <ErrorHanlder error={isListingsError || isOrdersError} />
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My listings
      </Typography>
      <ListingList listings={myListings} />
      <Button sx={{ mt: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
      <Box py={4}>
        <Divider />
      </Box>
      <OrderList orders={orders} />
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/marketplace'} variant="contained">
        Place an order
      </Button>
    </Box>
  )
}

export default Dashboard
