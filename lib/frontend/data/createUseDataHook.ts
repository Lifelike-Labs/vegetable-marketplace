import useSWR from "swr";
import { fetcher } from "./helpers";
import { ParsedUrlQuery } from "querystring";

// Handles getting a route with a slug - such as /user/:id - or return `null` if slug isn't a string
// For non-slug routes function can always return the route path as string
type GetAPIRoute = (slug: string|null|undefined) => string|null

export interface PageAPIView<APIResponseType> {
    // getPageAPIRoute is a method so we can implement SWR conditional fetching - see https://swr.vercel.app/docs/conditional-fetching
    // This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
    // where this code may be called but route param/slug does not yet exist.
    getPageAPIRoute: GetAPIRoute;
    // path/route for the "view" page - the URL associated w/the Page displayed in the browser
    // Next.js router.pathname
    pageViewPath: string;
    // Next.js router.query type is ParsedURLQuery - see below:
    // https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/router.ts#L439
    pageViewQuery?: ParsedUrlQuery;
    // Keys of query params needed for our Page API call
    queryParamKeys: string[];
}

export default function createUseDataHook<APIResponseType>(resource: PageAPIView<APIResponseType>) {
    return function(slug?: string|null) {
        // SWR key is same as our Next.js Page API route
        const key = resource.getPageAPIRoute(slug)
        const { data, error } = useSWR<APIResponseType, Error>(key, fetcher)
        return {
            data,
            error,
        }
    }
}
