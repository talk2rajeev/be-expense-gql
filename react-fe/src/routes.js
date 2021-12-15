import React, {useState} from 'react';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import {
    useQuery,
    useMutation,
    gql,
} from "@apollo/client";
import Login from './Login'
import Home from './Home'



const NotFound = () => <div>Page Not Found</div>;


const RoutesComp = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route  path="/home" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};


export default RoutesComp;


// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const [loginFn, { data, loading, error }] = useMutation(LOGIN_MUTATIOAN);
    
//     console.log('isTokenExpired: ', AuthClient.isTokenExpired());

//     const login = () => {
//         loginFn({
//           variables: {
//             email: 'rajeev@mail.com',
//             password: 'admin',
//           }
//         })
//     }

//     const isLoggedIn = () => {
//         //const auth = new Auth();
//         return Auth.isLoggedIn() && !Auth.isTokenExpired();
//     };
//     return (
//         <Route
//             {...rest}
//             render={(props) => (isLoggedIn() ? <Component {...props} /> : <Redirect to={RouteEnum.login} />)}
//         />
//     );
// }



