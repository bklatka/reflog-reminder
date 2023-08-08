import styles from './styles.module.scss';
import { Column } from "./column";
import { Divider } from "@fluentui/react-components";
import { startOfWeek, endOfWeek, isWithinInterval, addDays } from 'date-fns'
import data from '../../data/combined.json';
import { pickBy } from "lodash";
import { DateGroupRange, DayEntry, RangeDayEntry } from "../../types/dayEntries";
import { formatDate } from "../../utils/formatDate";

const CustomDivider = () => {
    return <Divider vertical appearance={"strong"}/>
}
export const MainBoard = ({ selectedWeek }: { selectedWeek: Date }) => {

    const currentWeek: [string, RangeDayEntry[]][] = getWeekRange(selectedWeek);
    const beginningOfWeek = startOfWeek(selectedWeek, { weekStartsOn: 1 });

    return <section className={styles.mainBoard}>
        <Column name={"Monday"} data={currentWeek[0]?.[1]} date={formatDate(beginningOfWeek)}/>
        <CustomDivider/>
        <Column name={"Tuesday"} data={currentWeek[1]?.[1]} date={formatDate(addDays(beginningOfWeek, 1))}/>
        <CustomDivider/>
        <Column name={"Wednesday"} data={currentWeek[2]?.[1]} date={formatDate(addDays(beginningOfWeek, 2))}/>
        <CustomDivider/>
        <Column name={"Thursday"} data={currentWeek[3]?.[1]} date={formatDate(addDays(beginningOfWeek, 3))}/>
        <CustomDivider/>
        <Column name={"Friday"} data={currentWeek[4]?.[1]} date={formatDate(addDays(beginningOfWeek, 4))}/>
        <CustomDivider/>
        <Column name={"Saturday"} data={currentWeek[5]?.[1]} date={formatDate(addDays(beginningOfWeek, 5))}/>
        <CustomDivider/>
        <Column name={"Sunday"} data={currentWeek[6]?.[1]} date={formatDate(addDays(beginningOfWeek, 6))}/>
    </section>
}

function getWeekRange(currentDate: Date): [string, RangeDayEntry[]][] {

    const beginningOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endingOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });


    return Object.entries(data as unknown as DateGroupRange)
        .filter(([day]) => {
            return isWithinInterval(new Date(day), { start: beginningOfWeek, end: endingOfWeek });
        })
        .sort((a, b) => {
            return new Date(a[0]).getTime() - new Date(b[0]).getTime();
        })


}