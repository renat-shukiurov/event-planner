import moment, {Moment} from "moment";

const formatZero = (val: number, add: number = 0) => {
    let value = val;
    return value < 10 ? `0${value + add}` : value + add;
}

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = formatZero(date.getMonth(), 1);
    const day = formatZero(date.getDate());

    return `${year}.${month}.${day}`;
}

export const disableDate = (date: Moment) => {
    return date.isBefore(moment().add(-1, 'days'))
}