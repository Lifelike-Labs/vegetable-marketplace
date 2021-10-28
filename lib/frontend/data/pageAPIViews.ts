import { APIResource } from './createUseDataHook'
import { NextRouter } from "next/router";

export const ListingResource: APIResource<Listing> = {
  getSWRKey: (listingId) => (listingId ? `/api/listings/${listingId}` : null),
  pageViewPath: '/listing/[id]',
  queryParamKeys: ['id'],
}

const allPageAPIViews = [ListingResource]

interface PageAPIViewPathMap {
  [key: string]: APIResource<any>
}

/**
 * Create object for pageapiviews w/view paths for keys. Example:
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
