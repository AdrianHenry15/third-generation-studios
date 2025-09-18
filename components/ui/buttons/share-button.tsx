"use client"

import { Share2 } from "lucide-react"
import React from "react"

const ShareButton = () => {
  const [showCopied, setShowCopied] = React.useState(false)

  return (
    <>
      <button
        className="flex items-center px-3 py-2 rounded-full bg-transparent hover:bg-white/20 transition-colors duration-150"
        aria-label="Share"
        title="Share this image"
        tabIndex={-1}
        onClick={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          if (typeof window !== "undefined") {
            const url = window.location.href
            await navigator.clipboard.writeText(url)
            setShowCopied(true)
            setTimeout(() => setShowCopied(false), 1500)
          }
        }}>
        <Share2 className="w-5 h-5 text-white" />
      </button>
      {showCopied && (
        <span className="absolute right-0 bottom-12 bg-black/80 text-white text-xs font-semibold px-3 py-1 rounded shadow z-50 pointer-events-none select-none">
          Copied to clipboard!
        </span>
      )}
    </>
  )
}

export default ShareButton
