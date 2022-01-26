import { Session } from '@auth0/nextjs-auth0'
import { PrismaClient, User } from '@prisma/client'
import { prisma } from 'lib/db/prisma'

export class Users {
  private readonly prisma: PrismaClient['user']

  constructor() {
    this.prisma = prisma['user']
  }

  async syncSessionWithUser(session: Session): Promise<Session> {
    /* Tries to find an existing user from session authId (Auth0 session.user.sub). 
    Will create new user in the app DB if one does not exist and link email and authId properties.
    Note: We shouldn't need to validate anything here because we can trust the Auth0 Session! */
    try {
      let user: User | null
      const authId = session.user.sub
      user = await this.prisma.findUnique({
        where: { authId },
      })
      if (!user) {
        const email = session.user.email
        user = await this.prisma.create({
          data: { authId, email },
        })
      }
      // Add the userId to the session before returning it so we can easily access it in the app
      session.user.userId = user.id
      return session
    } catch (error) {
      throw new Error(`Error while processing session: ${error}`)
    }
  }

  getUserIdFromSession(session: Session | null | undefined): string | undefined {
    const userId = session?.user?.userId
    if (userId) {
      return userId
    } else return undefined
  }

}
