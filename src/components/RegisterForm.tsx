import React, {FC, useState} from 'react';

import {Button, Form, Input} from 'antd'
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";

const RegisterForm:FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register} = useActions()
    const submitRegister = () => {
        register(username,email,password);
    }
    return (
        <Form
            onFinish={submitRegister}
            className="auth-form"
        >
            <Form.Item
                label="Name"
                name="username"
                rules={[rules.required('Please input your name!')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[rules.required('Please input your email!')]}
            >
                <Input value={email} onChange={e => setEmail(e.target.value)}/>
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
                    Register
                </Button>
            </Form.Item>

            {error && <div className="error-field">{error}</div>}
        </Form>
    );
};

export default RegisterForm;