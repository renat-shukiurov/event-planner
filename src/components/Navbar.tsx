import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom'
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypeSelector";

const Navbar:FC = () => {
    const router = useHistory()
    const {isAuth} = useTypedSelector(state => state.auth);
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            Olha
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>

                            <Menu.Item
                                onClick={() => console.log("Logout")}
                                key={1}
                            >
                                Log out
                            </Menu.Item>

                        </Menu>
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>

                        <Menu.Item
                        onClick={() => router.push(RouteNames.LOGIN)}
                        key={1}
                        >
                        Sign in
                        </Menu.Item>

                    </Menu>
                }



            </Row>

        </Layout.Header>
    );
};

export default Navbar;