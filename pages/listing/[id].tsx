import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ListingCard from "../../components/listing/ListingCard";
import ShowLoadingErrorMessages from "../../components/common/ShowLoadingErrorMessages";
import { useListing } from '../../lib/frontend/data/listing';

const Listing: NextPage = () => {
    const router = useRouter()
    const { query } = router

    const { data, error } = useListing(query)

    console.log('pathname ', router.pathname)
    console.log('query ', router.query)
    return (
        <ShowLoadingErrorMessages hasData={!!data} error={error} >
            <Box m={4}>
                <ListingCard data={data} />
            </Box>
        </ShowLoadingErrorMessages>
    )
}

export default Listing
