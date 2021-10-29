import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ConnectedListing from '../../components/listing/ConnectedListingCard';

const Listing: NextPage = () => {
    return (
        <Box m={4}>
            {/* @ts-ignore . For now we just have to add ts-ignore when we know `options` prop not required */}
            <ConnectedListing />
        </Box>
    )
}

export default Listing
