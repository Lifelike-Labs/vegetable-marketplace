import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import ErrorHanlder from 'frontend/components/common/ErrorHandler'
import Loader from 'frontend/components/common/Loader'

import { getListingDetails } from 'frontend/data'
import { useRouter } from 'next/router'
import ListingDetail from 'frontend/components/listing/ListingDetail'


const Home: NextPage = () => {

  const router = useRouter()
  const { lid } = router.query

  const { listing, isLoading, isError } = getListingDetails(lid)
  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />

  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Listing's Detail Page
      </Typography>
      <ListingDetail listing={listing} />

    </Box>
  )
}

export default Home
