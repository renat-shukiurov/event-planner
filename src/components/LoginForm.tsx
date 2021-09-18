import React, {FC, useState} from 'react';

import {Button, Form, Input} from 'antd'
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";

const LoginForm:FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()
    const submitLogin = () => {
        login(username,password);
    }
    return (
        <Form
            onFinish={submitLogin}
        >
            {error && <div style={{color: "red"}}>{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 10, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;