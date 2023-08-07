export interface DayEntry {
    time: string;
    checkoutTo: string;
}

export type DateGroup = Record<string, DayEntry[]>