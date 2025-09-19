import { fetchProfiles } from "@/lib/queries/profiles";
import { useQuery } from "@tanstack/react-query";

export function useProfiles() {
    return useQuery({
        queryKey: ["profiles"],
        queryFn: fetchProfiles,
        staleTime: 1000 * 60 * 5, // 5 min caching
        refetchOnWindowFocus: false,
    });
}
