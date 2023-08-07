export interface DayEntry {
    time: string;
    checkoutTo: string;
}

export type DateGroup = Record<string, DayEntry[]>

export interface RangeDayEntry {
    startedFrom: Date;
    finishedAt: Date;
    description: string;
}

export type DateGroupRange = Record<string, RangeDayEntry[]>;