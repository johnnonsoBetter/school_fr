import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');
  const client = localStorage.getItem('client');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    client,
    userInfo, //: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, expiresAt, client, uid, rememberDevice }) => {

    
      localStorage.setItem('token', token);
      localStorage.setItem(
        'userInfo',
        JSON.stringify(userInfo)
      );
      localStorage.setItem('expiresAt', expiresAt);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);
   

    setAuthState({
      token,
      userInfo,
      expiresAt,
      client,
      uid,
    });
  };

  const logUserOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return (
      new Date().getTime() / 1000 < authState.expiresAt
    );
  };

 

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logUserOut,
        isAuthenticated,
        
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };