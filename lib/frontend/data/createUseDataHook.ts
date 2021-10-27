import useSWR from "swr";
import { fetcher } from "./helpers";

// Handles getting a route with a slug - such as /user/:id - or return `null` if slug isn't a string
// For non-slug routes function can always return the route path as string
type GetAPIRoute = (slug: string|null|undefined) => string|null

export interface ResourceRequest<ResponseType> {
    // getRoute is to implement SWR conditional fetching - see https://swr.vercel.app/docs/conditional-fetching
    // This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
    // where this code may be called but route param/slug does not yet exist.
    getAPIRoute: GetAPIRoute;
}

export default function createUseDataHook<ResponseType>(resource: ResourceRequest<ResponseType>) {
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

