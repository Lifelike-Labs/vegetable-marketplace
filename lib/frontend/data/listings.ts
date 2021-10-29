import { Listing } from '.prisma/client'
import { APIResource, SWRKey } from './apiResource';
import createUseSWRHook from './createUseSWRHook';

/**
 * Listings
 * /api/listings
 */

interface KeyOptions {
    myListings?: boolean
}

const getListingsKey: SWRKey<KeyOptions> = ({ myListings }: KeyOptions) => {
    const queryParams = myListings ? '?myListings=true' : ''
    const key = `/api/listings${queryParams}`
    console.log('key is ', key)
    return key
}

export const ListingsAPIResource: APIResource<Listing[], KeyOptions> = {
    useSWRHook: createUseSWRHook<Listing[], KeyOptions>(getListingsKey),
}
