import { Listing } from '.prisma/client'
import { NextRouter } from 'next/router';
import { APIResource, SWRKey } from './apiResource';
import createUseSWRHook from './createUseSWRHook'

/**
 * Listing
 * api/listing/[id]
 */

export interface KeyOptions {
  router: NextRouter
}

const swrKey: SWRKey<KeyOptions> = ({ router }) => {
  if (!router) return null
  const id = router?.query?.id

  if (!id) return null

  return `/api/listings/${id}`
}

export const ListingAPIResource: APIResource<Listing, KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing, KeyOptions>(swrKey),
  injectRouter: true,
}
