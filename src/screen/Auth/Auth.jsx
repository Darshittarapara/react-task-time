import React, { useState } from 'react';
import AuthPage from './AuthPage';
const SIGNUP_API = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaeqczJdfOTzbkKnUEdFHkH8KL_AblXuw";
const LOGIN_API = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaeqczJdfOTzbkKnUEdFHkH8KL_AblXuw";
const Auth = () => {
    const [isLogInPage, setIsLogInPage] = useState(true);

    const authPageHandler = (value) => {
        setIsLogInPage(value)
    }
    return (
    <>
        <AuthPage 
        isLogInPage={isLogInPage} 
        url = {isLogInPage ? LOGIN_API : SIGNUP_API} 
        onRedirectPage = {authPageHandler} 
        />
    </>
)
};
export default Auth;