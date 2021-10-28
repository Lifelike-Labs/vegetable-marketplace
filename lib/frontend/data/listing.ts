import createUseSWRHook from './createUseSWRHook'
import { Listing } from '.prisma/client'
import { APIResource, GetSWRKey, UseSWRHook } from './apiResource';

/**
 * Listing
 * api/listing/[id]
 */

const getListingByIDKey: GetSWRKey = (router?) => {
  if (!router) return null
  const id = router?.query?.id

  if (!id) return null
  return `/api/listings/${id}`
}

export const ListingAPIResource: APIResource<Listing> = {
  getSWRKey: getListingByIDKey,
  useSWRHook: createUseSWRHook<Listing>(getListingByIDKey)
  // pageViewPath: '/listing/[id]',
}

/**
 * Listings
 * /api/listings
 */

const getListingsKey: GetSWRKey = () => '/api/listings/'

export const ListingsAPIResource: APIResource<Listing[]> = {
  getSWRKey: getListingsKey,
  useSWRHook: createUseSWRHook<Listing[]>(getListingsKey),
  // pageViewPath: '/listings',
}
