import { DataContext } from 'src/components/lib/dataContext.ts';

export function DataProvider({ children, data }) {
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}
