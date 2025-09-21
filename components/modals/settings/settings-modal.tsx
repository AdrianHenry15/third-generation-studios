"use client"

import { useState, useCallback, memo } from "react"
import { SettingsIcon, CoinsIcon, X } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { createPortal } from "react-dom"

// Lazy load tab components for better performance
const GeneralSettingsTab = dynamic(() => import("./general"), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
    </div>
  ),
})

const MyPlanSettingsTab = dynamic(() => import("./my-plan"), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      <div className="h-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
    </div>
  ),
})

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  selectedTab: "general" | "plan"
  setSelectedTab: (tab: "general" | "plan") => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  selectedTab,
  setSelectedTab,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Memoize sidebar handlers
  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  // Memoize tab handlers
  const selectGeneralTab = useCallback(() => {
    setSelectedTab("general")
    setSidebarOpen(false)
  }, [setSelectedTab])

  const selectPlanTab = useCallback(() => {
    setSelectedTab("plan")
    setSidebarOpen(false)
  }, [setSelectedTab])

  // Memoize backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  if (!open) return null
  const modalContent = (
    <div
      style={{ zIndex: 1000 }}
      className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-black/40 rounded-lg"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title">
      <div
        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl flex w-full max-w-[90vw] sm:max-w-lg md:max-w-3xl min-h-[650px] relative mx-2 sm:mx-4 md:mx-0"
        onMouseDown={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 z-10 p-1 rounded-lg transition-colors duration-200 
                     focus:outline-none "
          aria-label="Close settings modal">
          <X size={22} />
        </button>

        {/* Sidebar toggle for mobile */}
        <button
          className="md:hidden absolute top-4 left-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 z-10 p-1 rounded-lg transition-colors duration-200
                     "
          aria-label="Open settings navigation"
          onClick={openSidebar}>
          <SettingsIcon size={22} />
        </button>
        {/* Sidebar overlay for mobile, slides in from the left INSIDE the modal */}
        {sidebarOpen && (
          <>
            <div
              className="absolute inset-0 bg-black/30 z-30 md:hidden"
              onClick={closeSidebar}
            />
            <nav
              className={`absolute top-0 left-0 h-full w-56 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-4 shadow-2xl z-40 transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
              onClick={(e) => e.stopPropagation()}
              role="navigation"
              aria-label="Settings navigation">
              <button
                className="self-end mb-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-lg transition-colors duration-200
                           "
                aria-label="Close sidebar"
                onClick={closeSidebar}>
                <X size={22} />
              </button>
              <h2
                id="settings-modal-title"
                className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100 mb-4">
                Settings
              </h2>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  selectedTab === "general"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
                onClick={selectGeneralTab}
                aria-pressed={selectedTab === "general"}>
                <SettingsIcon size={16} aria-hidden="true" /> General
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  selectedTab === "plan"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
                onClick={selectPlanTab}
                aria-pressed={selectedTab === "plan"}>
                <CoinsIcon size={16} aria-hidden="true" /> My Plan
              </button>
            </nav>
          </>
        )}
        {/* Sidebar for desktop */}
        <nav
          className="hidden md:flex w-48 border-r border-neutral-200 dark:border-neutral-800 p-4 flex-col gap-4"
          role="navigation"
          aria-label="Settings navigation">
          <h2 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white">
            Settings
          </h2>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200 
                       focus:outline-none  ${
                         selectedTab === "general"
                           ? "bg-green-400 text-white dark:bg-green-950 dark:text-white"
                           : "text-slate-800 dark:text-slate-200"
                       }`}
            onClick={selectGeneralTab}
            aria-pressed={selectedTab === "general"}>
            <SettingsIcon size={16} aria-hidden="true" /> General
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200
                        ${
                         selectedTab === "plan"
                           ? "bg-green-400 text-white dark:bg-green-950 dark:text-white"
                           : "text-slate-800 dark:text-slate-200"
                       }`}
            onClick={selectPlanTab}
            aria-pressed={selectedTab === "plan"}>
            <CoinsIcon size={16} aria-hidden="true" /> My Plan
          </button>
        </nav>
        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selectedTab === "general" && <GeneralSettingsTab />}
          {selectedTab === "plan" && <MyPlanSettingsTab />}
        </div>
        {/* Footer with Done button */}
        <div className="absolute bottom-0 right-0 w-full flex justify-end p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-b-lg">
          {selectedTab === "plan" && (
            <Link className="mr-2" href="/pricing">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-white border-[1px] border-gray-400 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-neutral-100 font-semibold rounded-lg transition-colors duration-200
                           focus:outline-none ">
                Manage Plan
              </button>
            </Link>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 text-white bg-green-400 hover:bg-green-500 shadow-lg border-1 border-neutral-200 dark:bg-green-800 dark:hover:bg-green-900 dark:text-neutral-100 font-semibold rounded-lg transition-colors duration-200
                       focus:outline-none ">
            Done
          </button>
        </div>
      </div>
    </div>
  )
  return createPortal(modalContent, document.body);
}

export default memo(SettingsModal)
