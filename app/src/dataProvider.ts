import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {fetchList, fetchOne} from './api';
import {type ListResponse} from './types';
import {PaginationState} from "@tanstack/table-core";
import {ColumnFiltersState, SortingState} from "@tanstack/react-table";


export const useGetList = <T>(resource: string, pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState, options?: UseQueryOptions<ListResponse<T>, Error>
) => {
    console.log({resource})
    return useQuery<ListResponse<T>>({
        queryKey: [resource, pagination, sorting, columnFilters],
        queryFn: () => fetchList<T>(resource, pagination, sorting, columnFilters),
        staleTime: options?.staleTime ?? 10000, // Default to 0 if not provided
        gcTime: options?.gcTime ?? 300000, // Default to 5 minutes if not provided
        refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false, // Default to true if not provided
        refetchInterval: options?.refetchInterval ?? false, // Default to false if not provided
    });
};

export const useGetOne = <T>(resource: string, id: string | number) => {
    console.log("useGetOne", {resource, id})
    return useQuery<T>({
        queryKey: [resource, id],
        queryFn: () => fetchOne<T>(resource, id),
        enabled: !!id,
        staleTime: 10000, // Default to 0 if not provided
        gcTime: 300000, // Default to 5 minutes if not provided

    });
};
