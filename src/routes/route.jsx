import React from 'react';
import {Navigate} from 'react-router-dom';

const AuthMiddleware = (props) => {
    if(!localStorage.getItem('token')) {
        return (
            <Navigate to = {{ pathname: '/', state: { from: props.location} }} />
        );
    }
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default AuthMiddleware;