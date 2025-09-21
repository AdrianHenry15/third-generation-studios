import { useMemo, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserPlanData } from "@/lib/queries/profiles";

const MyPlanSettingsTab = () => {
    const { data } = useQuery({
        queryKey: ["userPlanData"],
        queryFn: fetchCurrentUserPlanData,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    });

    const profile = data?.profile;

    // Memoize max images calculation
    // const maxImages = useMemo(() => {
    //     const tier = subscription?.tier || "free";
    //     switch (tier) {
    //         case "free":
    //             return 5;
    //         case "basic":
    //             return 20;
    //         case "plus":
    //             return 50;
    //         case "pro":
    //             return 100;
    //         case "premium":
    //             return 200;
    //         default:
    //             return 5;
    //     }
    // }, [subscription?.tier]);

    // // Memoize computed values
    // const planData = useMemo(() => {
    //     const currentTier = subscription?.tier || "free";
    //     const usedImages = usage?.images ?? 0;
    //     const imagesLeft = Math.max(0, maxImages - usedImages);

    //     return {
    //         currentTier,
    //         usedImages,
    //         imagesLeft,
    //         planTitle: currentTier.charAt(0).toUpperCase() + currentTier.slice(1),
    //     };
    // }, [subscription?.tier, usage?.images, maxImages]);

    return (
        <main className="flex flex-col w-full justify-between my-1 items-start p-4">
            <h1 className="text-xl w-full font-bold mb-4 border-b border-neutral-200 dark:border-neutral-300 pb-2">
                {/* {planData.currentTier ? planData.planTitle : "No Plan"} */}
            </h1>
            <section className="w-full">
                <div className="flex items-center w-full justify-between text-neutral-600 dark:text-neutral-300">
                    <span className="font-medium">Images Left:</span>
                    <span className="tabular-nums">{/* {planData.imagesLeft} / {maxImages} */}</span>
                </div>
            </section>
            {/* Add plan details or upgrade options here */}
        </main>
    );
};

export default memo(MyPlanSettingsTab);
