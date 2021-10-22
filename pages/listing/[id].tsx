import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ListingCard from "../../components/listing/ListingCard";

const Listing: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <Box m={4}>
            <Typography variant="h3" gutterBottom>
               Listing Details for listing id {id}
            </Typography>
        </Box>
    )
}

export default Listing
