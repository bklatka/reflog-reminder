import { Body1, Body1Strong, Body1Stronger, Card, CardHeader, Title2, Title3 } from "@fluentui/react-components";
import styles from './styles.module.scss'
import { DayEntry } from "../../types/dayEntries";
import { DataEntry } from "./DataEntry";

export const Column = ({ name, date, data }: { name: string, date: string, data: DayEntry[] }) => {


    return <article className={styles.column}>
        <Title2 className={styles.columnTitle}>{name}</Title2>
        <Body1 className={styles.columnDate}>{date}</Body1>

        {data && data.map(dayEntry => <DataEntry dayEntry={dayEntry} />)}



    </article>
}