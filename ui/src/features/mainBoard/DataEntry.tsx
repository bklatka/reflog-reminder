import { DayEntry, RangeDayEntry } from "../../types/dayEntries";
import styles from "./styles.module.scss";
import {
    Body1,
    Caption1,
    Caption1Stronger,
    Caption2,
    Caption2Strong,
    Card,
    CardHeader,
    CardPreview
} from "@fluentui/react-components";


import Id1 from '../../assets/bg/1.png';
import Id2 from '../../assets/bg/2.png';
import Id3 from '../../assets/bg/3.png';
import Id4 from '../../assets/bg/4.png';
import Id5 from '../../assets/bg/5.png';
import Id10 from '../../assets/bg/10.jpg';
import Id11 from '../../assets/bg/11.jpg';
import Id12 from '../../assets/bg/12.jpg';
import Id13 from '../../assets/bg/13.jpg';
import Id14 from '../../assets/bg/14.jpg';
import Id15 from '../../assets/bg/15.jpg';
import Id16 from '../../assets/bg/16.jpg';
import Id17 from '../../assets/bg/17.jpg';

import { chooseRandomElementFromArray } from "../../utils/chooseRandomElementFromArray";
import { formatDate, formatTime } from "../../utils/formatDate";



const IDs = [Id1, Id2, Id3, Id4, Id5, Id10, Id11, Id12, Id13, Id14, Id15, Id16, Id17];


export const DataEntry = ({ dayEntry }: { dayEntry: RangeDayEntry }) => {
    const [jiraTicket, description] = parseTitle(dayEntry.description);

    return <Card className={styles.columnCard} orientation="vertical">

        <CardHeader
        header={<Body1><b>{jiraTicket}</b> <br/> {description}</Body1>}
        description={<Caption1>{formatTime(dayEntry.startedFrom)} &gt; {formatTime(dayEntry.finishedAt)}</Caption1>}
        image={<figure className={styles.columnImg}><img
            className={styles.columnImg}
            src={chooseRandomElementFromArray(IDs)}
            alt="App Name Document"
        /></figure>}
    />

    </Card>
}


function parseTitle(title: string): [string, string] {
    const [ticketGroup, ticketId, ...description] = title
        .replaceAll('-', " ")
        .replaceAll("_", " ")
        .split(" ")

    return [`${ticketGroup}-${ticketId}`, description.join(" ")];
}