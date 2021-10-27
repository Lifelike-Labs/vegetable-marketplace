import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { handleGetListingById } from '../../../lib/apiHelpers/listings/get'
import { getUserIdFromSession } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
    // NOTE: User account Auth logic here is the same as in pages/api/listings/index.ts
    // If we use it somewhere a third time we should consider consolidating it.
    const session = getSession(req, res)
    const userId = getUserIdFromSession(session)
    if (!userId) {
        res.status(401).end()
        return
    }

    const { method, query } = req
    // casting this should be safe as a string;
    const listingId = query.id as string;

    if (!listingId) {
        res.status(400).end('Invalid URL - No listing id')
        return
    }

    // TODO: Confirm if we want to use a switch() for HTTP methods as a common pattern for API resources URLS
    // like this one.
    switch (method) {
        case 'GET': {
            const listings = await handleGetListingById(listingId, query)
            res.status(200).json(listings)
            break
        }
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
})
