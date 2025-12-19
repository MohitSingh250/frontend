import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);


const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const { token, refreshToken } = res.data;

  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);

  const me = await api.get('/auth/me');
  setUser(me.data);
  navigate('/problems');
};

const signup = async (username, email, password) => {
  const res = await api.post('/auth/signup', { username, email, password });
  const { token, refreshToken } = res.data;

  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);

  const me = await api.get('/auth/me');
  setUser(me.data);
  navigate('/problems');
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setUser(null);
  navigate('/');
};



  const googleLogin = async (googleToken) => {
  const res = await api.post('/auth/google', { token: googleToken });
  const token = res.data.token;
  localStorage.setItem('token', token);
  const me = await api.get('/auth/me');
  setUser(me.data);
  navigate('/problems');
};

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, googleLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}