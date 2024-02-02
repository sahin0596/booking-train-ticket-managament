import { createContext, useEffect, useReducer } from "react";
import TicketService from "../services/api";

// const jwt = require('jsonwebtoken');

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: sessionStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case 'UPDATE_TOKEN':
        return {
            ...state,
            token:action.payload.token
        }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
//   if(state.token == 'null'){
//     token = await TicketService.authenticateUser(user.email,user.password);
//     state.token = token;
//     sessionStorage.setItem('token', token);
//     }   

// const secretKey = '1adf0a4782f6e5674a79747fe58ea851b7581658d3715b12f4e0b12e999f307e';

useEffect(() => {
    console.log("Current user:", state.user);
    console.log("Current token:", state.token);
  
    localStorage.setItem('user', JSON.stringify(state.user));
  
    const authenticateUserIfNeeded = async () => {
      if (!state.token) {
        try {
          console.log("Authenticating user...");
          const tokenObject = await TicketService.authenticateUser(state.user.email, state.user.password);
        //   console.log(tokenObject);
          const token = tokenObject.accessToken;
  
          if (token) {
            console.log("Authentication successful. Received token:", token);
            sessionStorage.setItem('token', token);
            dispatch({ type: 'UPDATE_TOKEN', payload: { token } });
          } else {
            console.log("Authentication failed. No token received.");
          }
        } catch (error) {
          // Handle authentication failure if needed
          console.error("Error authenticating user:", error);
        }
      } else {
        console.log("Token already present. Using existing token:", state.token);
        sessionStorage.setItem('token', state.token);
      }
    };
  
    authenticateUserIfNeeded();
  }, [state.user, state.token, dispatch]);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
