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

import Bg from '../../assets/bg/cool-background.png';
import Bg1 from '../../assets/bg/cool-background-1.png';
import Bg2 from '../../assets/bg/cool-background-2.png';
import Bg3 from '../../assets/bg/cool-background-3.png';
import Bg4 from '../../assets/bg/cool-background-4.png';
import Bg5 from '../../assets/bg/cool-background-5.png';
import Bg6 from '../../assets/bg/cool-background-6.png';
import Bg7 from '../../assets/bg/cool-background-7.png';
import Bg8 from '../../assets/bg/cool-background-8.png';
import Bg9 from '../../assets/bg/cool-background-9.png';
import Id1 from '../../assets/bg/1.png';
import Id2 from '../../assets/bg/2.png';
import Id3 from '../../assets/bg/3.png';
import Id4 from '../../assets/bg/4.png';
import Id5 from '../../assets/bg/5.png';
import { chooseRandomElementFromArray } from "../../utils/chooseRandomElementFromArray";
import { formatDate, formatTime } from "../../utils/formatDate";


const Bgs = [Bg, Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9]

const IDs = [Id1, Id2, Id3, Id4, Id5];


export const DataEntry = ({ dayEntry }: { dayEntry: RangeDayEntry }) => {
    console.log(dayEntry);

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