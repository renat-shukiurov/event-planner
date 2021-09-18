import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom'
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";

const Navbar:FC = () => {
    const router = useHistory();
    const {logout} = useActions();
    const {isAuth, user} = useTypedSelector(state => state.auth);
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {user.username}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>

                            <Menu.Item
                                onClick={logout}
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