import format from 'date-fns/format'

export function formatDate(date: Date): string {
    return format(date, "yyyy-MM-dd")
}