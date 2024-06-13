import React from "react";
import { Layout, Menu } from "antd"
import { AreaChartOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout;

function handleLogout(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

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
                <Menu.Item key="3" onClick={handleLogout} style={{position: "fixed", bottom: "0"}}>
                    <LogoutOutlined />
                    <span>Cerrar Sesión</span>
                    <Link to="/login" />
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
  
export default Sidebar;