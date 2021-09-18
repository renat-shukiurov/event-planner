import React, {FC, useEffect, useState} from 'react';
import {Layout, Row, Button, Modal, Divider, Col} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {IEvent} from "../models/IEvent";
import moment, {Moment} from "moment";
import { PlusOutlined } from "@ant-design/icons";

const Event:FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [defaultDate, setDefaultDate] = useState(moment())
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event);
    const {user} = useTypedSelector(state => state.auth);

    useEffect(()=>{
        fetchGuests();
        fetchEvents(user.username);
    },[]);

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setModalVisible(false);
    }

    const openFormWithDate = (date: Moment) => {
        let currentDay = defaultDate.date();
        let selectedDay = date.date();
        if (currentDay !== selectedDay){
            setDefaultDate(date);
            setModalVisible(true);
        }

    }

    return (
        <Layout>
            <Divider/>
            <Row justify="center">
                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                > Add event </Button>
            </Row>
            <Divider/>
            <EventCalendar
                select={openFormWithDate}
                events={events}/>

            <Modal
                title="Add event"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                    defaultDate={defaultDate}
                />
            </Modal>
        </Layout>
    );
};

export default Event;