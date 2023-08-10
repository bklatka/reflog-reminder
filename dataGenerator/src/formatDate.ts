import { format} from "date-fns";


export function formatDateForData(date: Date): string {
    return format(new Date(date), "yyyy-MM-dd")
}

export function formatTime(date: Date): string {
    return format(new Date(date), "HH:mm")
}