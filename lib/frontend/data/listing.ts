import createUseSWRHook, { APIResource, GetSWRKeyFromQuery, UseSWRHook } from './createUseSWRHook'
import { Listing } from '.prisma/client'

const getSWRKeyFromQuery: GetSWRKeyFromQuery = (query?) => {
  if (!query) return null
  const { id } = query
  if (!id) return null
  return `/api/listings/${id}`
}

export const useListing: UseSWRHook<Listing> = createUseSWRHook<Listing>(getSWRKeyFromQuery)

export const ListingAPIResource: APIResource<Listing> = {
  getSWRKeyFromQuery,
  pageViewPath: '/listing/[id]',
  useSWRHook: useListing,
}

