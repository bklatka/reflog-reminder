

export function chooseRandomElementFromArray<T = unknown>(array: Array<T>): T | undefined {
    if (!Array.isArray(array) || array.length === 0) {
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}