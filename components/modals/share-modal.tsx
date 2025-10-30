import React from "react"

interface IShareModalProps {
  imageUrl: string
  setShowShareModal: (show: boolean) => void
  copied: boolean
  setCopied: (copied: boolean) => void
}

const ShareModal = ({
  imageUrl,
  setShowShareModal,
  copied,
  setCopied,
}: IShareModalProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 pointer-events-auto">
      <div
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 min-w-[300px] relative pointer-events-auto"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          aria-label="Close"
          onClick={() => setShowShareModal(false)}>
          ×
        </button>
        <span className="text-lg font-semibold mb-2">Share Image Link</span>
        <input
          type="text"
          value={imageUrl}
          readOnly
          className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-100"
          onFocus={(e) => e.target.select()}
        />
        <span className="text-green-600 text-sm font-medium">
          {copied ? "Link copied to clipboard!" : "Copying..."}
        </span>
        <button
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(imageUrl)
              setCopied(true)
            }
          }}>
          Copy Link
        </button>
      </div>
    </div>
  )
}

export default ShareModal
