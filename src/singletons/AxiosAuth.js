import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://ms-auth-seven.vercel.app/api/v1',
});

export default authInstance;