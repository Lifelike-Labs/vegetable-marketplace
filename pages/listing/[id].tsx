import { useEffect, useState } from "react";
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ListingCard from "../../components/listing/ListingCard";
import { useListing } from "../../lib/frontend/data";
import Loader from "../../components/common/Loader";
import ErrorHanlder from "../../components/common/ErrorHandler";

const Listing: NextPage = () => {
    const router = useRouter()

    // If router not created (because its clientside first render or any other next.js-related reason)
    // we need to pass null to SWR so that it fetches conditionally.
    const id  = router.query.id as string | null
    const { data, error } = useListing(id)

    // isLoading state
    if (!data && !error) return <Loader />

    // Error states
    if (error) return <ErrorHanlder error={error} />

    // We need this to make Typescript happy so that it knows the listing data exists before rendering <ListingCard/>
    if (!data) return <Loader />

    return (
        <Box m={4}>
            <ListingCard listing={data} />
        </Box>
    )
}

export default Listing
