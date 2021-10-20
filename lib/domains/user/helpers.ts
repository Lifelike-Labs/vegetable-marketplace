import { User } from '.prisma/client'
import { Session } from '@auth0/nextjs-auth0'

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
