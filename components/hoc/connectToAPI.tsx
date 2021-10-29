import PropTypes from 'prop-types'
import Loader from "../common/Loader";
import ErrorHandler from "../common/ErrorHandler";
import { APIResource } from '../../lib/frontend/data/apiResource';
import React from 'react';
import { useRouter } from 'next/router';

/**
 * This is a function which creates a higher-order component
 * that requests and renders data from an API call, with error/loading
 * state handling.
 *
 * It passes in one of our "useData" hooks (usually an "useSWR" hook
 * and sets up proper loading/error messages so that the component will now
 * gracefully & correctly request and render data.
 */

export default function connectToAPI<WrappedPropTypes, KeyOptions>(WrappedComponent: React.ComponentType<WrappedPropTypes>, resource: APIResource<any, KeyOptions>) {


    // All of the Typescript stuff should result in the text editor correctly providing
    // Type feedback for the connected component in question when editing.
    interface Options {
        options: KeyOptions
    }

    // Adds `options` on as a prop to the type info for the connected component, AND,
    // ensures that it will have the desired shape.
    // we inject the `data` prop here so we don't want it to be in prop type info
    // for the connected component
    type ConnectedProps = Omit<WrappedPropTypes, "data"> & Options

    function ConnectedComponent({ options, ...props }: ConnectedProps ) {
        const router = useRouter()

        // We must be sure to give `options` a default value is it may not always be passed
        let _options = { ...options }
        if (resource.injectRouter) {
            // @ts-ignore
            _options.router = router
        }

        const { data, error } = resource.useSWRHook(_options)

        if (!data && !error) return <Loader />
        if (error) return <ErrorHandler error={error} />
        // This is an edge case, but makes Typescript happy as it ensures
        // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
        if (!data) return <Loader />


        // @ts-ignore
        return <WrappedComponent data={data} {...props} />
    }

    ConnectedComponent.propTypes = {
        options: PropTypes.object
    }

    return ConnectedComponent;
}
