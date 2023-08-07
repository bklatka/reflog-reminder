import { DateGroup, DayEntry } from "../../types/dayEntries";

export function generateDateGroupReport(dateGroup: DateGroup) {
    return Object.entries(dateGroup).reduce((report, [date, dayEntries]) => {
        return `${report}\nDay:${date}${generateDaySummary(dayEntries)}`;
    }, "");
}

export function generateDaySummary(dayData: DayEntry[]): string {
    let lastEntry = "08:00:00";
    return dayData.reduce((report, timeData) => {
        const newReport = `${report}
        ${lastEntry}\t${timeData.time}\t${timeData.checkoutTo}`

        lastEntry = timeData.time;

        return newReport;
    }, "");
}