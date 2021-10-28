import useSWR from "swr";
import { fetcher } from "./helpers";
import { NextRouter } from 'next/router';
import { GetSWRKey } from './apiResource';

export default function createUseSWRHook<APIResponseType>(getSWRKey: GetSWRKey) {
    return function(router?: NextRouter) {
        const key = getSWRKey(router)
        const { data, error } = useSWR<APIResponseType, Error>(key, fetcher)
        return {
            data,
            error,
        }
    }
}
