import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, fetcher } from './helpers'

export function useListing(listingId: string|null) {
  // SWR conditional fetching - see https://swr.vercel.app/docs/conditional-fetching
  // This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
  // where this code may be called but listingId does not yet exist.
  const { data, error } = useSWR<Listing, Error>(listingId ? `/api/listings/${listingId}` : null, fetcher)
  return {
    data,
    error,
  }
}

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMyListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings?myListings=true`, fetcher)
  return {
    myListings: data,
    isLoading: !error && !data,
    isError: error,
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
