import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchDashboardUserData } from "@/lib/queries/dashboard-user"
import {
  fetchImageLikeCount,
  toggleImageLike,
  fetchLikedImageIds,
} from "@/lib/queries/likes"
import { Heart } from "lucide-react"
import React from "react"

interface Props {
  imageId: string
  likeCount?: number
}

export default function LikeButton({ imageId, likeCount }: Props) {
  const queryClient = useQueryClient()
  // Fetch user data
  const { data: dashboardUserData } = useQuery({
    queryKey: ["dashboardUserData"],
    queryFn: fetchDashboardUserData,
    staleTime: 1000 * 60 * 5,
  })
  const userId = dashboardUserData?.authUser?.id

  // Fetch liked image IDs for this user
  const { data: likedImageIds = new Set<string>(), refetch: refetchLiked } =
    useQuery({
      queryKey: ["likedImageIds", userId],
      queryFn: () =>
        userId ? fetchLikedImageIds() : Promise.resolve(new Set()),
      enabled: !!userId,
      staleTime: 1000 * 60 * 2,
    })
  const liked = likedImageIds.has(imageId)

  // Fetch like count for this image
  const { data: likeCountData, refetch: refetchCount } = useQuery({
    queryKey: ["imageLikeCount", imageId],
    queryFn: () => fetchImageLikeCount(imageId),
    enabled: !!imageId,
    staleTime: 1000 * 60 * 2,
  })

  // Toggle like mutation
  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID required")
      return toggleImageLike({ imageId, userId, currentlyLiked: liked })
    },
    onSuccess: async () => {
      await refetchLiked()
      await refetchCount()
      queryClient.invalidateQueries({ queryKey: ["exploreImages"] })
    },
  })
  const toggleLike = mutation.mutate
  const loading = mutation.isPending

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!userId || loading) return
    toggleLike()
  }

  if (!userId) return null

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={liked ? "Unlike" : "Like"}
      className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors z-[1] ${
        liked ? "bg-white/20" : "hover:bg-white/20"
      }`}>
      <Heart
        className={`w-5 h-5 transition-colors ${
          liked ? "text-white fill-white" : "text-white fill-transparent"
        }`}
      />
      <span className="text-xs font-bold text-white">
        {likeCount ?? likeCountData ?? 0}
      </span>
    </button>
  )
}
