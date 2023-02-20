export const getStorageValue = (key: string, defaultValue: unknown) => {
    const saved = localStorage.getItem(key);

    if (saved) {
        try {
            const initial = JSON.parse(saved);

            return initial || defaultValue;
        } catch (error) {
            console.log(error);
        }
    }

    return defaultValue;
};
