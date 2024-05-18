import './App.css';
import '../node_modules/react-vis/dist/style.css';

import { Layout } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Users from './components/pages/Users';
import Dashboard from './components/pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const { Content, Footer } = Layout;

function App() {

  return (
    <Layout style={{ height: "100vh" }}>
      <BrowserRouter>
        <Sidebar/>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<Users/>}/>
              </Routes> 
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MiSalud ©{new Date().getFullYear()} Created by HealthTech
          </Footer>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;