const argv = require('minimist')(process.argv.slice(2));

const reportHistory = require("./src/core").extractHistory;

/**
* Arguments
 * --all: Shows all history
 * --afterDate 2023-04-28: Shows history after specific date
* */

reportHistory(argv.afterDate, argv.all).then(dayData => {
    dayData.forEach(([date, dayReport]) => {
        console.log(`Day: ${date}${dayReport}`);
    })
});
