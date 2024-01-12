import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUserDetails } from '../services/api';
import '../styles/login.css';
import loginImg from '../assets/login.png';
import userIcon from '../assets/user.png';


import { useContext } from 'react';//for auth
import { AuthContext } from '../context/AuthContext';//for auth

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)//for auth

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({type:'LOGIN_START'})//for auth

    try {
      const userData = await getAllUserDetails();

      const user = userData.find((u) => u.email === credentials.email);

      if (user && user.password === credentials.password) {
        // Successful login, redirect to Home
        // console.log(user)
        dispatch({type:'LOGIN_SUCCESS',payload:user})//for auth
        navigate('/home');
        
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
      dispatch({type:'LOGIN_FAILURE', payload:error.message})
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login_container flex justify-content-between">
                <div className="login_img">
                  <img src={loginImg} alt="login_img" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={userIcon} alt="userIcon" />
                  </div>
                  <h2>Login</h2>
                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                    </FormGroup>
                    <Button className="btn auth_btn" type="submit">
                      Login
                    </Button>
                  </Form>
                  {error && <p className="error-message">{error}</p>}
                  <p>
                    Don't have an account? <Link to="/register">Create</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
