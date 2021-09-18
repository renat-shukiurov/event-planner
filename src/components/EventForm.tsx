import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from 'antd'
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import moment, {Moment} from "moment";
import {disableDate, formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypeSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void,
    defaultDate: Moment,
}
const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: props.defaultDate ? formatDate(props.defaultDate.toDate()) : '',
        description: '',
        guest: '',
    } as IEvent);

    const [form] = Form.useForm()

    const formInitial = {
        description: '',
        date: props.defaultDate,
        guest: '',
    }

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date){
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitEvent = () => {
        props.submit({...event, author: user.username})
    }

    useEffect(() => {
        selectDate(props.defaultDate);
        form.setFieldsValue(formInitial);
    }, [form, props.defaultDate])

    return (
        <Form
            form={form}
            onFinish={submitEvent}
            initialValues={{date: props.defaultDate}}
        >
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Can't create an event in the past")]}>
                <DatePicker
                    onChange={(date) => selectDate(date)}
                    disabledDate={disableDate}
                />
            </Form.Item>
            <Form.Item
                label="Event guest"
                name="guest"
                rules={[rules.required()]}>
                <Select onChange={(guest:string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    );
};

export default EventForm;