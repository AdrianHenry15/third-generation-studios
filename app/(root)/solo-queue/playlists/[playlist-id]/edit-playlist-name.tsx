import { Check, Loader2, X } from "lucide-react";
import React from "react";

interface IEditPlaylistNameProps {
    titleInputRef: React.RefObject<HTMLInputElement>;
    titleDraft: string;
    setTitleDraft: React.Dispatch<React.SetStateAction<string>>;
    renaming: boolean;
    onTitleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    saveTitle: () => Promise<void>;
    cancelEdit: () => void;
    Loader2: React.ComponentType<{ className?: string }>;
    Check: React.ComponentType<{ className?: string }>;
    X: React.ComponentType<{ className?: string }>;
}

const EditPlaylistName = (props: IEditPlaylistNameProps) => {
    const { titleInputRef, titleDraft, setTitleDraft, renaming, onTitleKeyDown, saveTitle, cancelEdit } = props;
    return (
        <div className="flex flex-col items-center gap-2">
            <input
                ref={titleInputRef}
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={onTitleKeyDown}
                disabled={renaming}
                className="bg-transparent text-3xl sm:text-5xl font-extrabold text-white leading-tight border-b border-transparent focus:border-neutral-600 focus:outline-none transition-colors"
            />
            <div className="flex items-start w-full gap-2">
                <button
                    type="button"
                    onClick={saveTitle}
                    disabled={renaming}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-green-600/90 hover:bg-green-600 text-white disabled:opacity-60"
                    aria-label="Save playlist name"
                    title="Save"
                >
                    {renaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </button>
                <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={renaming}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                    aria-label="Cancel renaming"
                    title="Cancel"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default EditPlaylistName;
