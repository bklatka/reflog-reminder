const reportHistory = require("./core").extractHistory;
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { startOfWeek, subWeeks, format } = require('date-fns');


const beginningOfTheWeek = argv.afterDate ? new Date(argv.afterDate) : subWeeks(startOfWeek(new Date()), 1);

reportHistory(beginningOfTheWeek).then(dayDatas => {
    const singleText = dayDatas.reduce((report, [date, dayReport]) => {
        return `${report}\nDay:${date}${dayReport}`;
    }, "");

    const fileName = `${beginningOfTheWeek.getFullYear()}-${beginningOfTheWeek.getMonth() + 1}-${beginningOfTheWeek.getDate()}`;


    ensureDirectoryExist("../output");

    console.log('writing to file', fileName);
    console.log('data', singleText);

    fs.writeFileSync(`output/${fileName}.txt`, singleText)
})



function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday

    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return new Date(d.setDate(diff));
}

function ensureDirectoryExist(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}