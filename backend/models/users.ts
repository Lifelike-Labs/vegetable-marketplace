import { Session } from '@auth0/nextjs-auth0'
import { PrismaClient, User } from '@prisma/client'
import { prisma } from 'backend/db/prisma'

export class Users {
  private readonly prisma: PrismaClient['user']

  constructor() {
    this.prisma = prisma['user']
  }

  async verifyOrCreateUser(authId: string, email: string): Promise<User> {
    /* Tries to find an existing user from Auth0 session authId. 
    Will create new user in the app DB if one does not exist and link email and authId properties. 
    Note: we could add validation here, but we are retrieving email from Aut0 Session which we can trust */
    try {
      let user: User | null
      user = await this.prisma.findUnique({
        where: { authId },
      })
      if (!user) {
        user = await this.prisma.create({
          data: { authId, email },
        })
      }
      return user
    } catch (error) {
      throw new Error(`Error while signing in user: ${error}`)
    }
  }

  getUserDataFromSession(session: Session) {
    // Helper method for decomposing useful attributes from Auth0 Session 
    return { 
      authId: session.user.sub, 
      email: session.user.email,
      userId: session.user.userId, 
    }
  }
  
  attachUserIdToSession(userId: string, session: Session): Session {
    // Helper method for attaching userId to Auth0 Session
    session.user.userId = userId
    return session
  }

}
