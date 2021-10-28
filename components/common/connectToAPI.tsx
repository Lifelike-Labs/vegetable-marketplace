import React from "react";
import { useRouter } from "next/router";
import Loader from "./Loader";
import ErrorHandler from "./ErrorHandler";
import { APIResource } from "../../lib/frontend/data/createUseSWRHook";

/**
 * This is a function which creates a higher-order component
 * that requests and renders data from an API call, with error/loading
 * state handling.
 *
 * It passes in one of our "useData" hooks (usually an "useSWR" hook
 * and sets up proper loading/error messages so that the component will now
 * gracefully & correctly request and render data.
 */

// TODO: Properly type `useDataHook`
// TODO: Properly type props for WrappedComponent
export default function connectToAPI(WrappedComponent: React.ComponentType<any>, resource: APIResource<any>) {
    // TODO: Correctly type props. Main thing is we *must* pass in Next.js router
    function ConnectedComponent() {
        // TODO: Break all this router logic out into something we pass in
        // so its not hardcoded we are not bound to use the Next.js router
        // to get data we need to build api route/get swr key
        const router = useRouter()
        const { query } = router

        const { data, error } = resource.useSWRHook(query)

        if (!data && !error) return <Loader />
        if (error) return <ErrorHandler error={error} />
        // This is an edge case, but makes Typescript happy as it ensures
        // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
        if (!data) return <Loader />

        return <WrappedComponent data={data}/>
    }

    return ConnectedComponent;
}
