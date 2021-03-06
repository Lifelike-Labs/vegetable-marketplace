import { handleAuth, handleCallback, handleLogin, Session } from '@auth0/nextjs-auth0'
import { Users } from 'backend/models/users'
import { NextApiRequest, NextApiResponse } from 'next'

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  const users = new Users()
  const { authId, email } = users.getUserDataFromSession(session)
  const user = await users.verifyOrCreateUser(authId, email)
  const sessionWithUserData = users.attachUserIdToSession(user.id, session)
  return sessionWithUserData
}

export default handleAuth({
  async callback(req, res) {
    try {
      // We can do fun things here between user login and app usage
      // See nextjs-auth0 docs: https://auth0.github.io/nextjs-auth0/modules/handlers_callback.html
      await handleCallback(req, res, { afterCallback })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },
  async login(req, res) {
    try {
      // Modifying the returnTo
      await handleLogin(req, res, { returnTo: '/marketplace' })
    } catch (error: any) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
