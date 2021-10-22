import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, fetcher } from './helpers'

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useListing(id: string | undefined) {
  const { data, error } = useSWR<Listing, Error>(`/api/listings/${id}`, fetcher, {isPaused: () => !id})
  return {
    listing: data,
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