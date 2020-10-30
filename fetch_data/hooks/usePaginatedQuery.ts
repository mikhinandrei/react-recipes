import {useState, useEffect} from 'react'
import api from '../api'

interface PaginatedQuery<T> {
    response: T
    isLoading: boolean
    isError: boolean
    page: number
    pageSize: number
    totalPages: number
    setPage(value: number): void
    setPageSize(value: number): void
}

export function usePaginatedQuery<T>(url, defaultParams={}): PaginatedQuery<T> {
    const [response, setResponse] = useState<T>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const [totalPages, setTotalPages] = useState<number>(-1)
    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)

    useEffect(() => {
        const params = {
            ...defaultParams,
            page: page + 1,
            page_size: pageSize,
        }
        api.get(url, {params})
            .then(({data}) => {
                setResponse(data.result)
                setTotalPages(data.params.pages)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [url, page, pageSize])

    return {
        response, isLoading, isError, page, setPage, pageSize, setPageSize, totalPages
    }
}