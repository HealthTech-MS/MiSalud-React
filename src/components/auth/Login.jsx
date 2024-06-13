import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Spin, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.css';
import logo from '../assets/misalud_transparent.png';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://ms-auth-seven.vercel.app/api/v1/auth/login', { phoneNumber, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response.data);
      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        navigate('/dashboard');
      } else {
        setError('Número de teléfono o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="header-image">
            <img src={logo} alt="Header" />
          </div>
          <div className="input-group">
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Número de Teléfono"
              required
            />
          </div>
          <div className="input-group">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              required
            />
          </div>
          {error && <Alert message={error} type="error" showIcon />}
          <Button type="primary" htmlType="submit" className="login-button" disabled={loading}>
            Iniciar Sesión
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
