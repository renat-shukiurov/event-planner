import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";
import {BACKEND_URL} from "../../../api";

export const EventActionCreators = {
    setGuests: (payload: IUser[]):SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]):SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data));
        }
        catch (e) {
            console.log(e)
        }
    },
    fetchEvents: () => async (dispatch: AppDispatch) => {
        try{
            const response = await UserService.getEvents();
            dispatch(EventActionCreators.setEvents(response.data));
        }catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            axios.post(`${BACKEND_URL}/users/event`,
                {
                    guestEmail: event.guest,
                    date: event.date,
                    description: event.description
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then( async ()=> {
                    const eventsResponse = await UserService.getEvents();
                    dispatch(EventActionCreators.setEvents(eventsResponse.data));
                })
                .catch((e) => console.log(e));
        }
        catch (e) {
            console.log(e)
        }
    },
}