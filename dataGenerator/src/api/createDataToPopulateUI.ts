import { extractHistory, sortDateGroup } from "./logic/core";

import * as fs from 'fs';
import * as argvInit from "minimist";
import { startOfWeek, subWeeks } from "date-fns"
import { fi } from "date-fns/locale";

const argv = argvInit(process.argv.slice(2));


const beginningOfTheWeek = argv.afterDate ? new Date(argv.afterDate) : subWeeks(startOfWeek(new Date()), 1);

extractHistory(beginningOfTheWeek).then(dateGroup => {
    const report = JSON.stringify(dateGroup);

    const fileName = generateFileName(beginningOfTheWeek);


    saveDateGroupReportToAFile(`output/app/${fileName}.json`, report)
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

    sortDateGroup(fileContents);


    ensureDirectoryExist("../ui/src/data");
    saveDateGroupReportToAFile("../ui/src/data/combined.json", JSON.stringify(fileContents))
}