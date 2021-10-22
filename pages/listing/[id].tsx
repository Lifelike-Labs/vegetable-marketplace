import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useCallback, useState } from "react"
import ErrorHandler from "../../components/common/ErrorHandler"
import Loader from "../../components/common/Loader"
import { useCreateOrder, useListing } from "../../lib/frontend/data"

const ListingIdPage: NextPage = () => {
    const router = useRouter();
    const { listing, isLoading, isError } = useListing(router.query.id as string)
    const { createOrder, isLoading: isCreateOrderLoading } = useCreateOrder()
    const [isLastOrderSuccessful, setIsLastOrderSuccessful] = useState(false)

    const handleClick = useCallback(async () => {
        if (!listing) return;
        
        const createOrderResult = await createOrder(listing.id)

        if (!createOrderResult) return;

        setIsLastOrderSuccessful(true);

        setTimeout(() => {
            setIsLastOrderSuccessful(false)
        }, 2000)
    }, [createOrder, listing])

  if (isLoading) return <Loader />
  if (isError || !listing) return <ErrorHandler error={isError} />
  return (
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
      <Button variant="contained" onClick={handleClick} disabled={isCreateOrderLoading || isLastOrderSuccessful}>
        {isLastOrderSuccessful ? 'Order Complete!' : isCreateOrderLoading ? 'Ordering...' : 'Order'}
      </Button>
    </Box>
  )
}

export default ListingIdPage