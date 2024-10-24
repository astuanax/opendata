import {FilterFn, PaginationState, RowData} from "@tanstack/react-table";
import {RankingInfo} from "@tanstack/match-sorter-utils";

export interface APIResponse<T> {
    results: T;
}

export interface FetchListParams {
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: Record<string, any>;
    pagination: PaginationState

    [key: string]: any;
}

export interface ListResponse<T> extends Record<string, any> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}


declare module '@tanstack/react-table' {
    //add fuzzy filter to the filterFns
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }

    interface FilterMeta {
        itemRank: RankingInfo
    }

    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData
        filterVariant?: 'text' | 'number'
    }
}
