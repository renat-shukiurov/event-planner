import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import {BACKEND_URL} from "../../../api";

export const AuthActionCreators = {
    setUser: (user:IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));

            try {
                const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                    "email" : username,
                    "password": password,
                });
                let user = {
                    username: response.data.name,
                    email: response.data.email,
                };

                dispatch(AuthActionCreators.setUser(user));
                localStorage.setItem('token', response.data.token);
                dispatch(AuthActionCreators.setIsLoading(false));
                dispatch(AuthActionCreators.setIsAuth(true));
            }
            catch (e:any) {
                let messages = e.response.data.messages;
                dispatch(AuthActionCreators.setError(messages.join("\r\n")));
                dispatch(AuthActionCreators.setIsLoading(false));
                dispatch(AuthActionCreators.setIsAuth(false));

            }

        }
        catch (e) {
            dispatch(AuthActionCreators.setError("Wrong password or email"));
        }
    },
    register: (username: string, email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/registration`, {
                "email" : email,
                "name" : username,
                "password": password,
            })
            localStorage.setItem('token', response.data.token);
            let user = {
                username: response.data.name,
                email: response.data.email,
                };

            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setIsAuth(true));
        }
        catch (e:any) {
            let message;
            if (e.response.data.message){
                message = e.response.data.message
            }
            if (e.response.data.messages){
                message = e.response.data.messages.join("\r\n");
            }
            if (message){
                dispatch(AuthActionCreators.setError(message));
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('token');
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false));
        }
        catch (e) {
            console.log("Something went wrong", e)
        }
    },
    checkJWT: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try {
            const response = await axios.get(`${BACKEND_URL}/auth/user`, {headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }});

            let user = {
                username: response.data.name,
                email: response.data.email,
            };

            dispatch(AuthActionCreators.setUser(user));
            localStorage.setItem('token', response.data.token);

            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setIsLoading(false));
        }
        catch (e:any) {
            localStorage.removeItem('token');
            dispatch(AuthActionCreators.setIsAuth(false));
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },
}