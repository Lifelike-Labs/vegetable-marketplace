import { Listing } from '.prisma/client'
import { Order } from '@prisma/client'
import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { OrderWithListing } from '../../domains/order/api'
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

export function useCreateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const createOrder = async (listingId: string): Promise<Order | null> => {
    setIsLoading(true);
    const body = { listingId }
    try {
      const response = await creater<Order>('/api/orders/', body)
      
      return response
    } catch(e) {
      return null
    } finally {
      setIsLoading(false)
    }
  }
  return { createOrder, isLoading }
}

export function useOrders() {
  const { data, error } = useSWR<OrderWithListing[], Error>(`/api/orders`, fetcher)
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}