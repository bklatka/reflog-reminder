import { extractHistory } from "./core";

import * as fs from 'fs';
import * as argvInit from "minimist";
const argv = argvInit(process.argv.slice(2));
import { startOfWeek, subWeeks } from "date-fns"
import { generateDateGroupReport } from "./reportGenerator";


const beginningOfTheWeek = argv.afterDate ? new Date(argv.afterDate) : subWeeks(startOfWeek(new Date()), 1);

extractHistory(beginningOfTheWeek).then(dateGroup => {
    const report = generateDateGroupReport(dateGroup);

    const fileName = generateFileName(beginningOfTheWeek);

    console.log('writing to file', fileName);
    console.log('data', report);

    saveDateGroupReportToAFile(fileName, report)
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
    ensureDirectoryExist("../output");
    fs.writeFileSync(`output/${fileName}.txt`, report)
}