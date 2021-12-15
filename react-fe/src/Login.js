import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    useQuery,
    useMutation,
    gql,
} from "@apollo/client";

const LOGIN_MUTATIOAN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token,
        email,
        name
    }
}`;




export const Login = () => {
    // debugger;
    const [state, setState] = useState({email: '', password: ''})
    const navigation = useNavigate();

    const [loginFn, { data, loading, error }] = useMutation(LOGIN_MUTATIOAN);

    

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(token) {
            navigation("/home", { replace: true });
        }
    }, [data])
    
    

    const loginHandler = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            loginFn({
              variables: {
                ...state
              }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const inputHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }


    if (!loading && data) {
        console.log('data', data.login.token);
        sessionStorage.setItem('token', data.login.token);
    }
    // debugger;
    if (error) {
        return <h1>Error Occured: </h1>
    }
    return (<div>
        <div style={{width: 400, height: 'auto', padding: 20, margin: '0 auto'}}>
            <div>
                <input type="text" placeholder="usernmae" name="email" onChange={inputHandler} />
            </div>
            <div>
                <input type="text" placeholder="usernmae" name="password" onChange={inputHandler} />
            </div>
            <div>
                <button onClick={loginHandler}>Login</button>
            </div>
        </div>
    </div>)
};

export default Login;