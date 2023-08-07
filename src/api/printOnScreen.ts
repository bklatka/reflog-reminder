const argv = require('minimist')(process.argv.slice(2));

import { extractHistory} from "./logic/core";


/**
* Arguments
 * --all: Shows all history
 * --afterDate 2023-04-28: Shows history after specific date
* */

extractHistory(argv.afterDate, argv.all).then(dayData => {
    Object.entries(dayData).forEach(([date, dayReport]) => {
        console.log(`Day: ${date}${dayReport}`);
    })
});
