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
  // TODO: For use-cases like this where we are grabbing query vals from router, and returning an API key string
  // if query param exists, automate that logic.
  const id = router?.query?.id
  return id ? `/api/listings/${id}` : null
}

export const ListingAPIResource: APIResource<Listing, KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing, KeyOptions>(swrKey),
  // TODO: Update so `injectRouter` is always true by default and doesn't have to be set manually
  injectRouter: true,
}
