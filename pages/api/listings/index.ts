import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { handleGetListings } from '../../../lib/apiHelpers/listings/get'
import { handlePostListing } from '../../../lib/apiHelpers/listings/post'
import { getUserId } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
  const userId = getUserId(req, res)
  if (!userId) {
    res.status(401).end()
    return
  }

  const { method, query } = req

  switch (method) {
    case 'GET': {
      const listings = await handleGetListings(userId, query)
      res.status(200).json(listings)
      break
    }

    case 'POST':
      const listing = await handlePostListing(userId, req.body)
      res.json(listing)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
