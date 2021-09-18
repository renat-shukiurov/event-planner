import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import moment, {Moment} from "moment";
import {disableDate, formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
    select: (date: Moment) => void;
}
const EventCalendar:FC<EventCalendarProps> = (props) => {

    const dateCellRender = (value : Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <ul className="events">
                {currentDayEvents.map( (ev, index) =>
                    <li key={index}>
                        <Badge status='success' text={''} />
                        <span>{ev.description}</span>
                        <span className='event-info'>(A: <b>{ev.author}</b>, G: <b>{ev.guest}</b>)</span>
                    </li>
                )}
            </ul>

        );
    }

    const selectDate = (date:Moment) => {
        props.select(date)
    }



    return (
        <Calendar
            dateCellRender={dateCellRender}
            disabledDate={disableDate}
            fullscreen={true}
            onSelect={selectDate}
            style={{padding: "0 100px"}}

        />
            
    );
};

export default EventCalendar;