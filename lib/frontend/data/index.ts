import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, fetcher } from './helpers'

// Handles getting a route with a slug - such as /user/:id - or return `null` if slug isn't a string
// For non-slug routes function can always return the route path as string
type GetAPIRoute = (slug: string|null|undefined) => string|null

interface ResourceRequest<ResponseType> {
  // getRoute is to implement SWR conditional fetching - see https://swr.vercel.app/docs/conditional-fetching
  // This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
  // where this code may be called but route param/slug does not yet exist.
  getAPIRoute: GetAPIRoute;
}

function createUseResourceHook<ResponseType>(resource: ResourceRequest<ResponseType>) {
  return function(slug?: string|null) {
    // SWR key is same as our Next.js Page API route
    const key = resource.getAPIRoute(slug)
    const { data, error } = useSWR<ResponseType, Error>(key, fetcher)
    return {
      data,
      error,
    }
  }
}

const ListingResource: ResourceRequest<Listing> = {
  getAPIRoute: listingId => listingId ? `/api/listings/${listingId}` : null,
}

export const useListing = createUseResourceHook(ListingResource)

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    data,
    error,
  }
}

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
