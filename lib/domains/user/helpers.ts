import { User } from '.prisma/client'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from "next";

export const getUserIdFromSession = (session: Session | null | undefined): string | undefined => {
  const userId = session?.user?.userId
  if (userId) {
    return userId
  } else return undefined
}


export const attachUserIdToSession = (user: User, session: Session): Session => {
  session.user.userId = user.id
  return session
}

export function sendErrorResponseIfNotLoggedIn(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = getSession(req, res)
  const userId = getUserIdFromSession(session)
  if (!userId) {
    res.status(401).end()
    return
  }
}
