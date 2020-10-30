import {useState, useEffect} from 'react'
import api from '../api'

export function useQuery<T>(url, options={}): [T, boolean, boolean] {
    const [response, setResponse] = useState<T>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        api.get<{result: T}>(url, options)
            .then(({data}) => setResponse(data.result))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [url])

    return [response, isLoading, isError]
}