import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user:IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))

            // server response time imitation
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUsers = response.data.find(user => user.username === username && user.password === password)
                if (mockUsers){
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUsers.username);
                    dispatch(AuthActionCreators.setUser(mockUsers));
                    dispatch(AuthActionCreators.setIsAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Wrong login or password'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)

        }
        catch (e) {
            dispatch(AuthActionCreators.setError("Something went wrong"))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('auth');
            localStorage.removeItem('username');
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false));
        }
        catch (e) {
            console.log("Something went wrong", e)
        }
    }
}