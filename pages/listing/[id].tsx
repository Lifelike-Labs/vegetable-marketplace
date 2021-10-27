import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ListingCard from "../../components/listing/ListingCard";
import { useListing } from "../../lib/frontend/data";
import ShowLoadingErrorMessages from "../../components/common/ShowLoadingErrorMessages";

const Listing: NextPage = () => {
    const router = useRouter()

    // If router not created (because its clientside first render or any other next.js-related reason)
    // we need to pass null to SWR so that it fetches conditionally.
    const id  = router.query.id as string | null
    const { data, error } = useListing(id)

    console.log('pathname ', router.pathname)
    console.log('query ', router.query)
    return (
        <ShowLoadingErrorMessages hasData={!!data} error={error} >
            <Box m={4}>
                <ListingCard listing={data} />
            </Box>
        </ShowLoadingErrorMessages>
    )
}

export default Listing
