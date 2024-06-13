import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';

const { Content, Footer } = Layout;

const PrivateLayout = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          {children}
        </Content>
        
        <Footer style={{ textAlign: 'center' }}>
          MiSalud ©{new Date().getFullYear()} Created by HealthTech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
