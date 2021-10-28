import { NextRouter } from 'next/router';

// We use a function to get the key so that we can implement SWR conditional fetching - see
// https://swr.vercel.app/docs/conditional-fetching
// This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
// where this code may be called but route param/slug does not yet exist.
// We can return `null` for the key value and SWR will know to not yet execute an AJAX request to the API to get data.
export type GetSWRKey = (router?: NextRouter) => string | null
export type UseSWRHook<APIResponseType> = (router?: NextRouter) => { data: APIResponseType | undefined, error: Error | undefined }

/**
 * Represents some resource accessible by API.
 * Usually the API will be a Next.js Page API.
 *
 * What this interface does is give us a "module" where we can store all the critical information
 * about our API "resource" needed to generate helper code.
 *
 * Use in conjunction with createUseSWRHook()
 */
export interface APIResource<APIResponseType> {
    getSWRKey: GetSWRKey;
    // pageViewPath currently not used but here as an example.
    // path/route for the "view" page - the URL associated w/the Page displayed in the browser
    pageViewPath: string;
    useSWRHook: UseSWRHook<APIResponseType>;
}
