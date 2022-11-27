import { Input } from 'baseui/input';
import React, { useContext, useState } from 'react';
import Card from '../../components/UI/Card';
import './AuthPage.css';
import Button from '../../components/Button/Button';
import { sentUserData } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
const AuthItem = (props) => {
    const { onLogIn } = useContext(authContext);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigator = useNavigate()

    const handlerSubmit = async (event) => {
        event.preventDefault();
        console.log("this is run")
        const userData = {
            displayName: userName,
            email: userEmail,
            password: userPassword,
            returnSecureToken: true
        }
        const response = await sentUserData(props?.url, userData);
        console.log(response);

        if (response.idToken) {
            localStorage.setItem("user", JSON.stringify({
                displayName: response.displayName,
                userToken: response.idToken,
                email: response.email,
                userId: response.localId
            }));
            onLogIn(true);
            navigator("/");
        }
        //CYfJa5G5JMhTYL4fpsXt9LphmHD3
        //0RHbyalv3FN5EiqJbEZRbBR1WN32
        //"0RHbyalv3FN5EiqJbEZRbBR1WN32"

    }
    return (
        <Card>
            <h2>{props.isLogInPage ? "Log In" : "Sign Up"}</h2>
            <form onSubmit={(e) => handlerSubmit(e)}>
                {!props.isLogInPage && <div className='mb-2'>
                    <label htmlFor='name'>Name</label>
                    <Input
                        type='text'
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        name="userName"
                        placeholder='Enter your name'
                    />
                </div>}

                <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <Input
                        type='email'
                        name="userEmail"
                        id='email'
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='password'>Password</label>
                    <Input
                        id='password'
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        type='password'
                        name="userPassword"
                        placeholder='password'
                    />
                </div>
                <div className='mb-3'>
                    {props.isLogInPage ? <Button type='submit' disabled={userEmail === "" || userPassword.trim().length < 6 ? true : false}>Log In</Button> :
                        <Button type='submit' disabled={userName === "" || userEmail === "" || userPassword.trim().length < 6 ? true : false}>Sign up</Button>}
                    {props.isLogInPage ? <p className='link-text' onClick={() => props.onRedirectPage(false)}>New register</p>
                        : <p onClick={() => props.onRedirectPage(true)} className='link-text'>Already register</p>}
                </div>

            </form>




        </Card>
    )
};
export default AuthItem;