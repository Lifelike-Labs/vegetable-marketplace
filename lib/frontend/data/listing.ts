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
  const id = router?.query?.id
  return id ? `/api/listings/${id}` : null
}

export const ListingAPIResource: APIResource<Listing, KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing, KeyOptions>(swrKey),
  injectRouter: true,
}
