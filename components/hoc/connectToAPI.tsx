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

export default function connectToAPI<KeyOptions>(WrappedComponent: React.ComponentType<any>, resource: APIResource<any, KeyOptions>) {

    // TODO: This typescript type info is not working. Currently we lose the type info for WrappedComponent
    // Need to Properly type props for WrappedComponent. Maybe refactor this to use child components instead of being an HOC
    type WrappedComponentProps = React.ComponentProps<typeof WrappedComponent>
    type ConnectedComponentProps = WrappedComponentProps & KeyOptions

    // IMPORTANT: We must be sure to give `options` a default value is it may not always be passed
    // TODO: Correctly type props.
    function ConnectedComponent({ options  = {}, ...props }: ConnectedComponentProps) {
        const router = useRouter()

        if (resource.injectRouter) {
            options.router = router
        }

        const { data, error } = resource.useSWRHook(options)

        if (!data && !error) return <Loader />
        if (error) return <ErrorHandler error={error} />
        // This is an edge case, but makes Typescript happy as it ensures
        // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
        if (!data) return <Loader />

        return <WrappedComponent data={data} {...props} />
    }

    ConnectedComponent.propTypes = {
        options: PropTypes.object
    }

    return ConnectedComponent;
}
