import { Listing } from '.prisma/client'
import { NextRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { APIResource } from './createUseSWRHook'
import { creater, fetcher } from './helpers'
import { ListingAPIResource } from './listing'

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

/***
 * APIResource Global Utilities
 */

const allPageAPIViews = [ListingAPIResource]

interface PageAPIViewPathMap {
  [key: string]: APIResource<any>
}

/**
 * Create object for APIViews w/view paths for keys. Example:
 * {
 *     "/listing/[id]": ListingResource,
 * }
 */
const pageAPIViewPathMap: PageAPIViewPathMap = allPageAPIViews.reduce((acc, p) => {
  return {
    ...acc,
    [p.pageViewPath]: p,
  } as PageAPIViewPathMap
}, {})

export function getPageAPIView(router: NextRouter) {
  return pageAPIViewPathMap[router.pathname]
}
