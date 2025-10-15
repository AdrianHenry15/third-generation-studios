import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDuration(duration?: number) {
    if (!duration && duration !== 0) return "--:--";

    // convert milliseconds if the number is too large
    let seconds = duration;
    if (duration > 3600) {
        seconds = Math.floor(duration / 1000);
    }
    const totalSec = Math.floor(seconds);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}
