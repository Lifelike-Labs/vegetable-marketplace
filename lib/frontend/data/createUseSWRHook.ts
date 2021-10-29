import useSWR from "swr";
import { fetcher } from "./helpers";
import { SWRKey } from './apiResource';

export default function createUseSWRHook<APIResponseType, GetSWRKeyOptions>(key: SWRKey<GetSWRKeyOptions>) {
    return function(options: GetSWRKeyOptions) {
        const keyWrapper = () => key(options)
        // swr will attempt to execute our key function. If our key function returns
        // null swr will not attempt an API call.
        // See https://swr.vercel.app/docs/conditional-fetching
        const { data, error } = useSWR<APIResponseType, Error>(keyWrapper, fetcher)
        return {
            data,
            error,
        }
    }
}
