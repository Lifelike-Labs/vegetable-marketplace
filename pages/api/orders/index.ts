import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import {handleGetOrders} from '../../../lib/apiHelpers/orders/get'
import { handlePostOrder } from '../../../lib/apiHelpers/orders/post'
import { getUserIdFromSession } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const userId = getUserIdFromSession(session)
  if (!userId) {
    res.status(401).end
    return
  }
  const { method } = req
  switch (method) {
    case 'GET':
      const orders = await handleGetOrders(userId)
      res.json(orders)
      break
    case 'POST':
      const order = await handlePostOrder(userId, req.body.listingId)
      res.json(order)
      break
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
