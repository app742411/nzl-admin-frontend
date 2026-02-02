const FORCE_UTC = import.meta.env.VITE_FORCE_UTC === "true";

/**
 * Returns Date object in UTC or Local based on flag
 */
export const getDate = (dateString) => {
    if (!dateString) return null;

    // If already has timezone info, Date handles it
    if (FORCE_UTC) {
        return new Date(`${dateString}Z`);
    }

    return new Date(dateString);
};

/**
 * Format date for display
 */
export const formatDateTime = (dateString) => {
    const date = getDate(dateString);
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: FORCE_UTC ? "UTC" : undefined,
    }).format(date);
};

/**
 * Get timestamp (ms) safely
 */
export const getTime = (dateString) => {
    const date = getDate(dateString);
    return date ? date.getTime() : 0;
};

/**
 * For debugging / UI
 */
export const getTimezoneLabel = () => {
    return FORCE_UTC ? "UTC" : Intl.DateTimeFormat().resolvedOptions().timeZone;
};
