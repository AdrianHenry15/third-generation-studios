import React from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface OpenLinkButtonProps {
  href: string
  className?: string
}

const OpenLinkButton = ({ href, className = "" }: OpenLinkButtonProps) => {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      className={`flex items-center justify-center p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow hover:scale-110  ${className}`}
      aria-label="Open link in new tab"
      tabIndex={0}
      onClick={(e) => e.stopPropagation()} // Prevent click-through
    >
      <ExternalLink className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    </Link>
  )
}

export default OpenLinkButton
