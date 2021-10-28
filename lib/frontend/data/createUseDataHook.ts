import useSWR from "swr";
import { fetcher } from "./helpers";
import { ParsedUrlQuery } from "querystring";

// Handles getting a route with a slug - such as /user/:id - or return `null` if slug isn't a string
// For non-slug routes function can always return the route path as string
type GetSWRKey = (slug: string|null|undefined) => string|null

export interface APIResource<APIResponseType> {
    // When using a Next.js Page API the SWR key will be the exact same as
    // the Page API route, including the actual values for any params/slugs.
    // Example: /listing/xyz123 is both the Page API route for a listing and a valid SWR key for it.
    // We use a function to get the key so that we can implement SWR conditional fetching - see
    // https://swr.vercel.app/docs/conditional-fetching
    // This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
    // where this code may be called but route param/slug does not yet exist.
    // We can return `null` for the key value and SWR will know to not yet execute an AJAX request to the API to get data.
    getSWRKey: GetSWRKey;
    // path/route for the "view" page - the URL associated w/the Page displayed in the browser
    // Next.js router.pathname
    pageViewPath: string;
    // Next.js router.query type is ParsedURLQuery - see below:
    // https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/router.ts#L439
    pageViewQuery?: ParsedUrlQuery;
    // Keys of query params needed for our Page API call
    queryParamKeys: string[];
}

export default function createUseDataHook<APIResponseType>(resource: APIResource<APIResponseType>) {
    return function(slug?: string|null) {
        // SWR key is same as our Next.js Page API route
        const key = resource.getSWRKey(slug)
        const { data, error } = useSWR<APIResponseType, Error>(key, fetcher)
        return {
            data,
            error,
        }
    }
}
