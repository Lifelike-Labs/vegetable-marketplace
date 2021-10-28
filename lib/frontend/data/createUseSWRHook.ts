import useSWR from "swr";
import { fetcher } from "./helpers";
import { NextRouter } from 'next/router';

// `query` represents a Next.js router.query
// The ParsedUrlQuery type comes from node.js standard library and is what Next.js uses for router.query type
// When using a Next.js Page API the SWR key will be the exact same as
// the Page API route, including the actual values for any params/slugs.
// Example: /listing/xyz123 is both the Page API route for a listing and a valid SWR key for it.
// We use a function to get the key so that we can implement SWR conditional fetching - see
// https://swr.vercel.app/docs/conditional-fetching
// This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
// where this code may be called but route param/slug does not yet exist.
// We can return `null` for the key value and SWR will know to not yet execute an AJAX request to the API to get data.
export type GetSWRKey = (router?: NextRouter) => string|null

export type UseSWRHook<APIResponseType> = (router?: NextRouter) => { data: APIResponseType|undefined, error: Error|undefined }

export interface APIResource<APIResponseType> {
    getSWRKey: GetSWRKey;
    // path/route for the "view" page - the URL associated w/the Page displayed in the browser
    // Next.js router.pathname
    pageViewPath: string;
    useSWRHook: UseSWRHook<APIResponseType>;
}

export default function createUseSWRHook<APIResponseType>(getSWRKey: GetSWRKey) {
    return function(router?: NextRouter) {
        const key = getSWRKey(router)
        const { data, error } = useSWR<APIResponseType, Error>(key, fetcher)
        return {
            data,
            error,
        }
    }
}
