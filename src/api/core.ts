import { selectMonth } from "./selectMonth";
import { DateGroup, DayEntry } from "../types/dayEntries";

const execSync = require('child_process').execSync;
require('dotenv').config();



export async function extractHistory(afterDate?: Date, shouldShowAll?: boolean): Promise<DateGroup> {
    let selectedMonth;
    if (!afterDate && !shouldShowAll) {
        selectedMonth = await selectMonth();
    }

    const output = extractReflog();

    const NOT_BEFORE = afterDate ?? `2023-${selectedMonth}-01`
    const NOT_AFTER = `2023-${selectedMonth + 1}-01`

    const checkoutsByDate = groupReflogCheckoutsByDate(output, {
        dateFrom: shouldShowAll ? null : NOT_BEFORE ,
        dateTo: (shouldShowAll || afterDate) ? null : NOT_AFTER,
    });


    return sortDateGroups(checkoutsByDate)
}


function sortDateGroups(dateGroups: DateGroup): DateGroup {
    return Object.entries(dateGroups).sort((a,b) => {
        // sort by day
        return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    }).map(([date, dayData]): [string, DayEntry[]] => {
        // sort inside each day
        sortDayEntries(dayData);

        return [date, dayData];
    }).reduce((acc, [date, dayEntries]) => ({ ...acc, [date]: dayEntries }), {});
}



function sortDayEntries(dayData: DayEntry[]) {
    dayData.sort((a,b) => {
        const aTime = Number(a.time.split(":").join(''));
        const bTime = Number(b.time.split(":").join(''));
        return aTime - bTime;
    })
}



function groupReflogCheckoutsByDate(reflogOutput, options): DateGroup {
    const { dateFrom, dateTo } = options;
    const dateGroup = {};

    const [_, ...commits] = reflogOutput.split("Reflog:");
    commits.map(commitData => {
        const [id, message, author, date, _, commitMessage] = commitData.split('\n')

        const dateOfReflog = id.match(/\{(.+)\}/g)[0].slice(1, -1)



        return {
            id, message, date: dateOfReflog.split(' '), commitMessage
        }
    }).filter((data, i) => {
        const { message } = data;

        return (message.toString()).includes("checkout") && !message.includes("rebase (start)");
    }).filter((data) => {
        const date = new Date(data.date[0]);

        if (!dateFrom && !dateTo) {
            return true;
        }

        if (!dateTo) {
            return date.getTime() - new Date(dateFrom).getTime() >= 0;
        }

        return  date.getTime() - new Date(dateFrom).getTime() >= 0 && date.getTime() - new Date(dateTo).getTime() <= 0;
    })
        .forEach(data => {
            const targetCheckout = data.message.split(" to ")[1];

            const dayOfMessage = data.date[0]

            /* Create date property if it doesn't exist */
            if (!dateGroup[dayOfMessage]) {
                dateGroup[dayOfMessage] = [];
            }

            dateGroup[dayOfMessage].push({ time: data.date[1], checkoutTo: targetCheckout })
        })

    return dateGroup;
}



function extractReflog() {
    return execSync(`cd ${process.env.PROJECT_PATH} && git log --walk-reflogs --date=iso`, { encoding: 'utf-8' });  // the default is 'buffer'
}