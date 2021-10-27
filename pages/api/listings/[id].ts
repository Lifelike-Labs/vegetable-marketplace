import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { handleGetListingById } from '../../../lib/apiHelpers/listings/get'
import { getUserId } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
  const userId = getUserId(req, res)
  if (!userId) {
    res.status(401).end()
    return
  }

  const { method, query } = req
  const listingId = query.id as string

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
