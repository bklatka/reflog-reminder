const execSync = require('child_process').execSync;




const output = execSync('cd ../js-clients && git log --walk-reflogs --date=iso', { encoding: 'utf-8' });  // the default is 'buffer'

const [_, ...commits] = output.split("Reflog:");


const dateGroup = {};

const NOT_BEFORE = "2023-06-01"

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

    return  date.getTime() - new Date(NOT_BEFORE).getTime() >= 0;
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

Object.entries(dateGroup).sort((a,b) => {
    return new Date(b[0]) - new Date(a[0]);
}).map(([date, dayData]) => {
    let lastEntry = "08:00:00";

    dayData.sort((a,b) => {
        const aTime = Number(a.time.split(":").join(''));
        const bTime = Number(b.time.split(":").join(''));
        return aTime - bTime;
    })

    const daySummary = dayData.reduce((report, timeData) => {
        const newReport = `${report}
        from\t${lastEntry} to\t${timeData.time}\t${timeData.checkoutTo}`

        lastEntry = timeData.time;

        return newReport;
    }, "");

    console.log('\n');
    console.log(`Day: ${date}${daySummary}`);
});


// console.log(`Found ${filtered.length} checkouts`);



