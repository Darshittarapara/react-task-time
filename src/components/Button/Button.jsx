import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button disabled={props.disabled} type={props.type} className ={!props.className ? "btn btn-success" : props.className} onClick={props.onClick}>{props.children}</button>
    )
}
export default Button;