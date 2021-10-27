import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, fetcher } from './helpers'
import createUseDataHook, { PageAPIView } from "./createUseDataHook";

export const useListing = createUseDataHook(ListingResource)

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
