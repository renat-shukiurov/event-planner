import {EventAction, EventActionEnum, EventState} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

const initialState: EventState = {
    guests: [] as IUser[],
    events: [] as IEvent[],
}

export default function EventReducer(state = initialState, action:EventAction): EventState{
    switch (action.type) {
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
        case EventActionEnum.SET_GUESTS:
            return {...state, guests: action.payload}
        default:
            return state;
    }
}