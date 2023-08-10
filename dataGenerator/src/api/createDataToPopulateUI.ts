import { extractHistory, sortDateGroup } from "./logic/core";

import * as fs from 'fs';
import * as argvInit from "minimist";
import { startOfWeek, subWeeks, setHours, setMinutes } from "date-fns"

import { DateGroup, DateGroupRange, RangeDayEntry } from "../types/dayEntries";
import { th } from "date-fns/locale";

const argv = argvInit(process.argv.slice(2));


const beginningOfTheWeek = argv.afterDate ? new Date(argv.afterDate) : subWeeks(startOfWeek(new Date()), 1);

extractHistory(beginningOfTheWeek, true).then(dateGroup => {
    const report = JSON.stringify(dateGroupToRangeDayEntry(dateGroup), null, 2);

    const fileName = generateFileName(beginningOfTheWeek);

    console.log('Generating file name for this week...');


    saveDateGroupReportToAFile(`output/app/${fileName}.json`, report)
    console.log('Grouping all files into single file...');
    combineDataEntries();
})


function generateFileName(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function ensureDirectoryExist(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function saveDateGroupReportToAFile(fileName: string, report: string) {
    ensureDirectoryExist("output/app");
    fs.writeFileSync(fileName, report)
}

function combineDataEntries() {
    const list = fs.readdirSync("output/app");

    const fileContents = list.map(dataFile => {

        const jsonFile = fs.readFileSync(`output/app/${dataFile}`).toString();
        return JSON.parse(jsonFile);
    }).reduce((common, file) => ({ ...common, ...file }), {});

    // sortDateGroup(fileContents);


    ensureDirectoryExist("../ui/src/data");
    saveDateGroupReportToAFile("../ui/src/data/combined.json", JSON.stringify(fileContents, null, 2))
}


const START_WORK_TIME = [8, 0];
const END_WORK_TIME = [16, 0];
export function dateGroupToRangeDayEntry(dateGroup: DateGroup): DateGroupRange {
    return Object.entries(dateGroup).map(([day, dayEntries]) => {
        const rangeEntries: RangeDayEntry[] = []

        dayEntries.forEach((entry, idx) => {
            if (idx + 1 >= dayEntries.length) {
                rangeEntries.push({
                    startedFrom: getDateFromTimeOfADay(day, entry.time),
                    finishedAt: setHoursAndMinutes(new Date(day), END_WORK_TIME[0], END_WORK_TIME[1]),
                    description: entry.checkoutTo,
                });
                return;
            }

            rangeEntries.push({
                startedFrom: getDateFromTimeOfADay(day, entry.time),
                finishedAt: getDateFromTimeOfADay(day, dayEntries[idx + 1].time),
                description: entry.checkoutTo,
            });
        });

        return [day, rangeEntries];
    }).reduce((acc, [day, rangeEntries]) =>
        ({ ...acc, [day as string]: rangeEntries})
        , {})

}

function setHoursAndMinutes(date: Date, hours: number, minutes: number) {
    return setMinutes(setHours(date, hours), minutes);
}

function getDateFromTimeOfADay(dayString: string, timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(":");

    const theDay = new Date(dayString);

    return setHoursAndMinutes(theDay, parseInt(hours, 10), parseInt(minutes, 10));
}