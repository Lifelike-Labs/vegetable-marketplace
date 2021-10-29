import { NextRouter } from 'next/router';

/**
 * We use a function to get the SWR key so that we can implement SWR conditional fetching.
 * If key is null swr does not make API call; this is a feature
 * See https://swr.vercel.app/docs/conditional-fetching

 * This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
 * where this code may be called but route param/slug does not yet exist.
 * We can return `null` for the key value and SWR will know to not yet execute an AJAX request to the API to get data.
 **/

export type SWRKey<SWRKeyOptions> = (option: SWRKeyOptions) => string | null
export type UseSWRHook<APIResponseType, SWRKeyOptions> = (options: SWRKeyOptions) => { data: APIResponseType | undefined, error: Error | undefined }

/**
 * Represents some resource accessible by API.
 * Usually the API will be a Next.js Page API.
 *
 * What this interface does is give us a "module" where we can store all the critical information
 * about our API "resource" needed to generate helper code.
 *
 * Use in conjunction with createUseSWRHook()
 */

export interface APIResource<APIResponseType, SWRKeyOptions> {
    useSWRHook: UseSWRHook<APIResponseType, SWRKeyOptions>
    injectRouter?: boolean
}
