import { useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);

            if (stored && stored !== "undefined") {
                return JSON.parse(stored);
            }

            return initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
