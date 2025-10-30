export function TrackListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-2">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/20 animate-pulse">
                    <div className="w-12 h-12 bg-neutral-700 rounded"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
                        <div className="h-3 bg-neutral-700 rounded w-1/4"></div>
                    </div>
                    <div className="h-3 bg-neutral-700 rounded w-12"></div>
                </div>
            ))}
        </div>
    );
}

export function TrackGridSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="bg-neutral-800/20 rounded-lg p-4 animate-pulse">
                    <div className="w-full aspect-square bg-neutral-700 rounded-lg mb-4"></div>
                    <div className="h-4 bg-neutral-700 rounded mb-2"></div>
                    <div className="h-3 bg-neutral-700 rounded w-3/4"></div>
                </div>
            ))}
        </div>
    );
}
