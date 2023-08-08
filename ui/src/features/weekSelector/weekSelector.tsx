import { Body1, Body1Stronger, Button, Title1, Title2, Title3 } from "@fluentui/react-components";
import { ArrowLeft16Regular, ArrowRight16Regular } from "@fluentui/react-icons";
import { formatDate } from "../../utils/formatDate";
import { endOfWeek, startOfWeek } from "date-fns";
import styles from '../mainBoard/styles.module.scss'

interface WeekSelectorProps {
    currentWeek: Date;
    onNextWeek: () => void;
    onPrevWeek: () => void;
}

export const WeekSelector = ({ currentWeek, onNextWeek, onPrevWeek }: WeekSelectorProps ) => {

    const beginningOfWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const endingOfWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });

    return <nav className={styles.weekSelector}>
        <Button onClick={onPrevWeek} icon={<ArrowLeft16Regular />} />
        <Title3>{formatDate(beginningOfWeek)} to {formatDate(endingOfWeek)}</Title3>
        <Button onClick={onNextWeek} icon={<ArrowRight16Regular />} />
    </nav>
}