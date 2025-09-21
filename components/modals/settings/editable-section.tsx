"use client"

import { CheckCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"

// Types for the section component
interface EditableSectionProps {
  label: string
  value: string
  pendingValue?: string // for pending email
  onSave?: (newValue: string, setEditing: (editing: boolean) => void) => void
  isPending?: boolean
  showEmailVerification?: boolean
  isEmailVerified?: boolean
  isDisabled?: boolean
  statusMessage?: string
}

// Editable section component
const EditableSection: React.FC<EditableSectionProps> = ({
  label,
  value,
  pendingValue,
  onSave,
  isPending,
  showEmailVerification = false,
  isEmailVerified = false,
  isDisabled = false,
  statusMessage,
}) => {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  // Keep input value in sync with prop value
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleSave = () => {
    if (label.toLowerCase() === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(inputValue)) {
        // Use window.alert for now, or you can use a toast if available
        window.alert("Please enter a valid email address.")
        return
      }
    }
    if (onSave && inputValue !== value) {
      onSave(inputValue, setEditing)
    } else {
      setEditing(false)
    }
  }

  return (
    <div className="py-3 w-full border-b border-neutral-200">
      <span className="block text-xs text-black dark:text-white mb-1">{label}</span>
      {editing ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-2">
          <input
            className="block font-medium text-neutral-900 dark:text-neutral-100 bg-transparent border-b border-green-400 focus:outline-none w-full break-words"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave()
              } else if (e.key === "Escape") {
                setEditing(false)
              }
            }}
            autoFocus
          />
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              className="px-3 py-1 text-xs rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 text-green-700 dark:text-green-200 font-semibold transition-colors"
              disabled={isPending}
              onClick={handleSave}>
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              className="px-3 py-1 text-xs rounded bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-semibold transition-colors"
              onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-2">
          <div className="flex flex-col w-full mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <span className="block font-medium text-neutral-900 dark:text-neutral-100 break-words">
                {value}
              </span>
              {showEmailVerification &&
                (isEmailVerified ? (
                  <span title="Email verified">
                    <CheckCircle size={16} className="text-green-500" />
                  </span>
                ) : (
                  <span title="Email pending verification">
                    <Clock size={16} className="text-orange-500" />
                  </span>
                ))}
            </div>
            {/* Show pending email if present and label is Email */}
            {label.toLowerCase() === "email" && pendingValue && (
              <div className="flex items-center gap-2 mt-1">
                <span className="block text-xs text-orange-600 dark:text-orange-400 font-medium">
                  {pendingValue}
                </span>
                <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                  <Clock size={14} className="inline-block" /> Pending
                  verification
                </span>
              </div>
            )}
          </div>
          {statusMessage && (
            <span className="text-xs italic text-amber-600 dark:text-amber-400 mr-2">
              {statusMessage}
            </span>
          )}
          {onSave && (
            <button
              className={`px-3 py-1 text-xs rounded ${
                isDisabled
                  ? "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed"
                  : "text-white bg-green-400 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-900 dark:text-neutral-100 cursor-pointer"
              } font-semibold transition-colors`}
              onClick={() => !isDisabled && setEditing(true)}
              disabled={isDisabled}>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EditableSection
