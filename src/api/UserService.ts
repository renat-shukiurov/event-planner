import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {BACKEND_URL} from "./index";

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>>{
        return axios.get<IUser[]>(`${BACKEND_URL}/users/guests`, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }

    static async getEvents(): Promise<AxiosResponse<IEvent[]>>{
        return axios.get<IEvent[]>(`${BACKEND_URL}/users/event`, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }
}