import {APIResponse, ListResponse} from "@/types.ts";
import {ColumnFiltersState, ColumnSort, PaginationState, SortingState} from "@tanstack/react-table";


const API_URL = 'http://127.0.0.1:8000/api';

const handleResponse = async <T>(response: Response): Promise<ListResponse<T>> => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }
    return await response.json();
};


export const fetchList = async <T>(resource: string, pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState): Promise<ListResponse<T>> => {
    const {pageSize, pageIndex} = pagination
    const queryString: URLSearchParams = new URLSearchParams();
    if (sorting) {
        console.log("dataprovider", {sorting})
        sorting.forEach((columnsort: ColumnSort) => {
            const sort_field_order = columnsort.desc ? "-" + columnsort.id : columnsort.id
            queryString.append('ordering', sort_field_order);
        })

    }
    if (pagination) {
        const offset = pageIndex * pageSize;
        queryString.append('offset', String(offset));
        queryString.append('limit', String(pageSize));
    }

    // if (columnFilters) {
    //     columnFilters.forEach((filter: ColumnFilter) => {
    //         queryString.append(filter.id, filter.value)
    //     })
    // }
    console.log({resource}, `${API_URL}/${resource}/?${queryString.toString()}`)
    const response = await fetch(`${API_URL}/${resource}/?${queryString.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchOne = async <T>(resource: string, id: string | number): Promise<T> => {

    const url = Number(id) >= 0 ? `${API_URL}/${resource}/${id}/` : `${API_URL}/${resource}`
    // const url = `${API_URL}/${resource}/`
    // console.log({resource, url})
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const res: APIResponse<T> = await response.json()
    console.log({res})
    return res.results;
};

// export const createOne = async <T>(resource: string, data: T): Promise<APIResponse<T>> => {
//     const response = await fetch(`${API_URL}/${resource}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     return handleResponse<APIResponse<T>>(response);
// };

// export const updateOne = async <T>(resource: string, id: string | number, data: Partial<T>): Promise<APIResponse<T>> => {
//     const response = await fetch(`${API_URL}/${resource}/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     return handleResponse<APIResponse<T>>(response);
// };

// export const deleteOne = async <T>(resource: string, id: string | number): Promise<APIResponse<T>> => {
//     const response = await fetch(`${API_URL}/${resource}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     return handleResponse<APIResponse<T>>(response);
// };
