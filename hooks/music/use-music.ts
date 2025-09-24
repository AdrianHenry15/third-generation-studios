import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { fetchTable, insertRow, updateRow, deleteRow, fetchRowById } from "@/lib/fetchers";

// Generic fetch hook
type Table = Parameters<typeof fetchTable>[0];

export function useMusicQuery<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    return useQuery({
        queryKey: QUERY_KEYS[key],
        queryFn: () => fetchTable<T>(table),
    });
}

export function useMusicQueryById<T>(table: Table, key: keyof typeof QUERY_KEYS, id: string | number) {
    return useQuery({
        queryKey: [...QUERY_KEYS[key], id],
        queryFn: () => fetchRowById<T>(table, id),
        enabled: !!id, // Only run query if id is provided
    });
}

// Mutation hooks
export function useMusicInsert<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<T>) => insertRow<T>(table, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}

export function useMusicUpdate<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string | number; values: Partial<T> }) => updateRow<T>(table, id, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}

export function useMusicDelete(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteRow(table, id),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}
