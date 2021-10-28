import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ConnectedListing from '../../components/listing/ConnectedListingCard';

const Listing: NextPage = () => {
    return (
        <Box m={4}>
            <ConnectedListing />
        </Box>
    )
}

export default Listing
