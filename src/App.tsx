import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import './App.css'
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "./store/reducers/auth/action-creators";

const App:FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AuthActionCreators.checkJWT());

    }, [])

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
};

export default App;