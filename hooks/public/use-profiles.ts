import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { fetchTable, insertRow, updateRow, deleteRow, fetchRowById } from "@/lib/fetchers";
import type { IProfileProps } from "@/lib/solo-q-types/public-types";

export function useProfilesQuery() {
    return useQuery({
        queryKey: QUERY_KEYS.profiles,
        queryFn: () => fetchTable<IProfileProps>("profiles"),
    });
}

export function useProfileByIdQuery(id: string | number) {
    return useQuery({
        queryKey: [...QUERY_KEYS.profiles, id],
        queryFn: () => fetchRowById<IProfileProps>("profiles", id),
        enabled: !!id,
    });
}

export function useProfileInsert() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<IProfileProps>) => insertRow<IProfileProps>("profiles", values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.profiles }),
    });
}

export function useProfileUpdate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string | number; values: Partial<IProfileProps> }) =>
            updateRow<IProfileProps>("profiles", id, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.profiles }),
    });
}

export function useProfileDelete() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteRow("profiles", id),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.profiles }),
    });
}
