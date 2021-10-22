import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useCallback, useState } from "react"
import ErrorHandler from "../../components/common/ErrorHandler"
import Loader from "../../components/common/Loader"
import { OrderDialog } from "../../components/order/OrderDialog"
import { useCreateOrder, useListing } from "../../lib/frontend/data"

const ListingIdPage: NextPage = () => {
    const router = useRouter();
    const { listing, isLoading, isError } = useListing(router.query.id as string)
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

    const handleClick = useCallback(() => setIsOrderDialogOpen(true), [])
    
    const handleOrderDialogClose = useCallback(() => setIsOrderDialogOpen(false), [])

  if (isLoading) return <Loader />
  if (isError || !listing) return <ErrorHandler error={isError} />
  return (
    <>
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        {listing.title}
      </Typography>
      {listing.priceInCentsPerUnit ? <Typography variant="body1" fontWeight="bold" gutterBottom>
        {listing.priceInCentsPerUnit}¢ per unit
      </Typography> : null}
      <Typography variant="body1" gutterBottom>
        {listing.description}
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Order
      </Button>
    </Box>
    <OrderDialog isOpen={isOrderDialogOpen} listing={listing} onClose={handleOrderDialogClose} />
    </>
  )
}

export default ListingIdPage