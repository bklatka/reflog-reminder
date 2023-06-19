const execSync = require('child_process').execSync;
const argv = require('minimist')(process.argv.slice(2));
const monthChooser = require('./selectMonth');


/**
* Arguments
 * --all: Shows all history
 * --afterDate 2023-04-28: Shows history after specific date
* */

init();

async function init(afterDate = argv.afterDate, shouldShowAll = argv.all) {
    let selectedMonth;
    if (!afterDate && !shouldShowAll) {
        selectedMonth = await monthChooser.selectMonth();
    }

    const output = extractReflog();

    const NOT_BEFORE = afterDate ?? `2023-${selectedMonth}-01`
    const NOT_AFTER = `2023-${selectedMonth + 1}-01`

    const checkoutsByDate = groupReflogCheckoutsByDate(output, {
        dateFrom: shouldShowAll ? null : NOT_BEFORE ,
        dateTo: (shouldShowAll || afterDate) ? null : NOT_AFTER,
    });


    Object.entries(checkoutsByDate).sort((a,b) => {
        // sort by day
        return new Date(b[0]) - new Date(a[0]);
    }).map(([date, dayData]) => {
        sortDayEntries(dayData);

        const daySummary = generateDaySummary(dayData);

        console.log(`Day: ${date}${daySummary}`);
    });
}


function sortDayEntries(dayData) {
    dayData.sort((a,b) => {
        const aTime = Number(a.time.split(":").join(''));
        const bTime = Number(b.time.split(":").join(''));
        return aTime - bTime;
    })
}

function generateDaySummary(dayData) {
    let lastEntry = "08:00:00";
    return dayData.reduce((report, timeData) => {
        const newReport = `${report}
        ${lastEntry}\t${timeData.time}\t${timeData.checkoutTo}`

        lastEntry = timeData.time;

        return newReport;
    }, "");
}

function groupReflogCheckoutsByDate(reflogOutput, options) {
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

        return  date.getTime() - new Date(dateFrom).getTime() >= 0 && date.getTime() - new Date(dateTo) <= 0;
    })
        .forEach(data => {
            const targetCheckout = data.message.split(" to ")[1];

            const dayOfMessage = data.date[0]

            /* Create date property if doesnt exist */
            if (!dateGroup[dayOfMessage]) {
                dateGroup[dayOfMessage] = [];
            }

            dateGroup[dayOfMessage].push({ time: data.date[1], checkoutTo: targetCheckout })
        })

    return dateGroup;
}

function extractReflog() {
    return execSync('cd ../js-clients && git log --walk-reflogs --date=iso', { encoding: 'utf-8' });  // the default is 'buffer'
}
