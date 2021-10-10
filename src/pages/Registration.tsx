import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import RegisterForm from "../components/RegisterForm";

const Registration: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className='h100'>
        <Card>
            <RegisterForm/>
        </Card>

        </Row>
        </Layout>
);
};

export default Registration;