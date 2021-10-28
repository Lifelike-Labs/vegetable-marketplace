import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, fetcher } from './helpers'
import { ListingAPIResource } from './listing'
import { APIResource } from './apiResource';
import { ListingsAPIResource } from './listing';

export function useMyListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings?myListings=true`, fetcher)
  return {
    data,
    error,
  }
}

export function useCreateListing() {
  const { mutate } = useSWRConfig()
  const createListing = async (title: string, description: string): Promise<Listing> => {
    const body = { title, description }
    const response = await creater<Listing>('/api/listings/', body)

    mutate(`/api/listings`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { createListing }
}



// /***
//  * NOT CURRENTLY USED
//  * An example of how we could programmatically connect our frontend/client Page routes
//  * to Page API routes.
//  */
//
// const allAPIResources = [
//   ListingAPIResource,
//   ListingsAPIResource,
// ]
//
// /**
//  * Map between a Page Route to an API Route. Example:
//  * {
//  *     "/listing/[id]": ListingResource,
//  * }
//  *
//  */
// interface PageRouteToAPIResourceMap {
//   [key: string]: APIResource<any>
// }
//
// /**
//  * Generates a mapping from an array of APIResources.
//  */
// function createRouteToAPIResourceMap(resources: Array<APIResource<any>>) {
//   return resources.reduce((acc, p) => {
//     return {
//       ...acc,
//       [p.pageViewPath]: p,
//     } as PageRouteToAPIResourceMap
//   }, {})
// }
