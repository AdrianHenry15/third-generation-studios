import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// ========================
// Types
// ========================
interface ConfirmModalProps {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

// ========================
// Component
// ========================
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    // ------------------------
    // Refs
    // ------------------------
    const confirmBtnRef = useRef<HTMLButtonElement | null>(null);
    const titleId = "confirm-modal-title";

    // ------------------------
    // Effects (mount/unmount)
    // ------------------------
    useEffect(() => {
        // Focus confirm button when modal opens
        confirmBtnRef.current?.focus();
        // Close on Escape
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", onKey);
        // Prevent background scroll while open
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onCancel]);

    // ------------------------
    // Render (portal + animation)
    // ------------------------
    const modal = (
        <AnimatePresence>
            <motion.div
                key="overlay"
                className="fixed inset-0 z-[10000] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Overlay - click outside to cancel */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onCancel} />
                {/* Dialog */}
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    className="relative z-[10001] w-full max-w-sm"
                    initial={{ y: 16, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 12, opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                    {/* Card */}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
                        {/* Decorative top ring */}
                        <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-500" />
                        {/* Content */}
                        <div className="p-5 sm:p-6">
                            {/* Icon/header row */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30 text-red-400">
                                    {/* Exclamation icon (simple) */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                        <path d="M11 7h2v7h-2zM11 16h2v2h-2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 id={titleId} className="text-base font-semibold text-white">
                                        {title}
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-400">This action cannot be undone.</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    className="px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800/60 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
                                    onClick={onCancel}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    ref={confirmBtnRef}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 active:bg-red-600 transition-colors shadow-[0_6px_24px_-6px_rgba(220,38,38,0.45)]"
                                    onClick={onConfirm}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    // ------------------------
    // Portal mount
    // ------------------------
    return typeof document !== "undefined" ? ReactDOM.createPortal(modal, document.body) : null;
};

export default ConfirmModal;
