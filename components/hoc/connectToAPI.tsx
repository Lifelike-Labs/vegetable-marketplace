import React from "react";
import { useRouter } from "next/router";
import Loader from "../common/Loader";
import ErrorHandler from "../common/ErrorHandler";
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

// TODO: Properly type props for WrappedComponent
export default function connectToAPI(WrappedComponent: React.ComponentType<any>, resource: APIResource<any>) {
    // TODO: Correctly type props. Main thing is we *must* pass in Next.js router
    function ConnectedComponent(props: any) {
        // NOTE: We could pass `router` or `query` in as props to ConnectedComponent if desired
        // Would make testing easier
        const router = useRouter()

        // Allow for `router` to be passed in manually as a prop
        // if for some special case we wanted to mock the Next.js router
        const desiredRouter = props.router ? props.router : router

        const { data, error } = resource.useSWRHook(router)

        if (!data && !error) return <Loader />
        if (error) return <ErrorHandler error={error} />
        // This is an edge case, but makes Typescript happy as it ensures
        // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
        if (!data) return <Loader />

        return <WrappedComponent data={data} {...props} />
    }

    return ConnectedComponent;
}
