import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"
import { getListingById } from "../../../lib/domains/listing/api"
import { getUserIdFromSession } from "../../../lib/domains/user/helpers"

export default withApiAuthRequired(async function handle(req, res) {
    const session = getSession(req, res)
    const userId = getUserIdFromSession(session)
    if (!userId) {
      res.status(401).end
      return
    }
    const { method, query } = req
    const { id } = query
    
    // I *think* it's safe to cast to string here
    const typedId = id as string;
    switch (method) {
      case 'GET': {
        const listing = await getListingById(typedId)
        res.status(200).json(listing)
        break
      }
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  })