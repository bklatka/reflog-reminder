import format from 'date-fns/format'

export function formatDate(date: Date): string {

    return format(new Date(date), "dd-MM-yyyy")
}

export function formatTime(date: Date): string {
    return format(new Date(date), "HH:mm")
}