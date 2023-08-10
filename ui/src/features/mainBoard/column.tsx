import { Body1, Caption1, Card, CardHeader, Divider, Title2 } from "@fluentui/react-components";
import styles from './styles.module.scss'
import { RangeDayEntry } from "../../types/dayEntries";
import { DataEntry } from "./DataEntry";
import { parseTitle } from "../../utils/parseTitle";
import { formatDuration } from 'date-fns'
import format from "date-fns/format";

export const Column = ({ name, date, data }: { name: string, date: string, data: RangeDayEntry[] }) => {

    const summary = summarizeData(data);

    return <article className={styles.column}>
        <Title2 className={styles.columnTitle}>{name}</Title2>
        <Body1 className={styles.columnDate}>{date}</Body1>

        {data && data.map(dayEntry => <DataEntry dayEntry={dayEntry} />)}

        <p>Summary:</p>
        {summary.map(([jiraId, time]) => {
            return <Card orientation="vertical">
                <CardHeader
                    header={<Body1><b>{jiraId}</b></Body1>}
                    description={<Caption1>Time spent: {millisecondsToHHMM(time)}</Caption1>}
                    />
            </Card>
        })}

    </article>
}

function millisecondsToHHMM(milliseconds: number) {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));

    return format(new Date().setHours(hours, minutes), 'HH:mm');
}

function summarizeData(data: RangeDayEntry[] = []): [string, number][] {
    const objData: Record<string, number> = {};

    data.forEach(rangeEntry => {
        const [jiraId] = parseTitle(rangeEntry.description);
        if (!objData[jiraId]) {
            objData[jiraId] = calculateTime(rangeEntry);
        } else {
            objData[jiraId] = objData[jiraId] + calculateTime(rangeEntry);
        }


    })

    return Object.entries(objData);

}

function calculateTime(entry: RangeDayEntry): number {

    const time1 = new Date(entry.finishedAt).getTime();
    const time2 = new Date(entry.startedFrom).getTime();

    if (time1 > time2) {
        return time1 - time2;
    }

    return  time2 - time1;
}