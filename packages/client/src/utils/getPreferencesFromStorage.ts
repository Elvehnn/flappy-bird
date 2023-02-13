import { getStorageValue } from "@/utils/getStorageValue";

export type AppPreferences = Record<number, Record<string, unknown>>;

export const getPreferencesFromStorage = (userId: number): string | null => {
    return getStorageValue(`${userId}_theme`, null);
};
