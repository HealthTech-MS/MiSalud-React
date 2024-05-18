import React from "react";
import { Layout, Menu } from "antd"
import { AreaChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
    return (
        <Sider>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <AreaChartOutlined/>
                    <span>Dashboard</span>
                    <Link to="/dashboard" />
                </Menu.Item>
                <Menu.Item key="2">
                    <TeamOutlined/>
                    <span>Usuarios</span>
                    <Link to="/users" />
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
  
export default Sidebar;