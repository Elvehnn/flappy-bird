export type AppPreferences = Record<number, Record<string, unknown>>;

export const getPreferencesFromStorage = (userId: number) => {
    return localStorage.getItem(`${userId}_theme`);
};
