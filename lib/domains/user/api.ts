import { Session } from '@auth0/nextjs-auth0'
import { User } from '@prisma/client'
import { prisma } from '../../db/prisma'

const createUser = async (authId: string, email: string): Promise<User> => {
  const user = prisma.user.create({
    data: { authId, email },
  })
  return user
}

const findUserByAuthId = async (authId: string): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: { authId },
  })  
  return user
}

export const getOrCreateUserFromSession = async (session: Session): Promise<User> => {
  /* Tries to find an existing user from session authId (Auth0 session.user.sub). 
  Will create new user if one does not exist and link email and authId properties.  */
  try {
    let user: User | null
    const authId = session.user.sub
    user = await findUserByAuthId(authId) 
    if(!user) {
      const email = session.user.email
      user = await createUser(authId, email)
    }
    return user
  } catch (error) {
    throw new Error(`Error while processing session: ${error}`)
  }
}
