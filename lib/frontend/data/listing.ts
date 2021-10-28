import createUseSWRHook, { APIResource, GetSWRKey, UseSWRHook } from './createUseSWRHook'
import { Listing } from '.prisma/client'

// This is where the critical logic is
const getListingAPIRoute: GetSWRKey = (router?) => {
  if (!router) return null
  const id = router?.query?.id

  if (!id) return null
  return `/api/listings/${id}`
}

const useListing: UseSWRHook<Listing> = createUseSWRHook<Listing>(getListingAPIRoute)

export const ListingAPIResource: APIResource<Listing> = {
  getSWRKey: getListingAPIRoute,
  // Not currently used, but an example of how we could programmatically connect
  // our frontend page routes to our Page API routes if desired
  pageViewPath: '/listing/[id]',
  useSWRHook: useListing,
}
