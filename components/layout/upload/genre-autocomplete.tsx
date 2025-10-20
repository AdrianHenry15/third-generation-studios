import { Input } from "@/components/ui/input";
import { trackGenres } from "@/lib/constants";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function GenreAutocomplete({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
    const [query, setQuery] = useState(value || "");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const ref = useRef<HTMLDivElement>(null);

    // keep query synced when external value changes
    useEffect(() => setQuery(value || ""), [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Show all genres by default, filter only when user types
    const filtered = useMemo(() => {
        if (!query.trim()) return [...trackGenres].sort(); // show all genres alphabetically
        return trackGenres.filter((g) => g.toLowerCase().includes(query.toLowerCase())).slice(0, 12);
    }, [query]);

    const selectItem = useCallback(
        (val: string) => {
            setQuery(val);
            onChange(val);
            setOpen(false);
            setActiveIndex(-1);
        },
        [onChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[activeIndex]) selectItem(filtered[activeIndex]);
            else setOpen(false);
        } else if (e.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
        }
    };

    return (
        <div className="relative" ref={ref}>
            <Input
                id={id}
                value={query}
                placeholder="Genre"
                autoComplete="off"
                onChange={(e) => {
                    setQuery(e.target.value);
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm"
            />

            {open && (
                <ul
                    role="listbox"
                    aria-labelledby={id}
                    className="absolute z-50 mt-1 w-full rounded-md bg-popover border border-border shadow-md max-h-48 overflow-auto"
                >
                    {filtered.length === 0 ? (
                        <li className="px-3 py-2 text-sm text-muted-foreground">No genres found</li>
                    ) : (
                        filtered.map((g, idx) => (
                            <li
                                key={g}
                                role="option"
                                aria-selected={idx === activeIndex}
                                onMouseDown={(e) => {
                                    e.preventDefault(); // prevent blur
                                    selectItem(g);
                                }}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`px-3 py-2 cursor-pointer text-sm ${
                                    idx === activeIndex ? "bg-primary/30 text-primary-foreground" : "hover:bg-muted"
                                }`}
                            >
                                {g}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
