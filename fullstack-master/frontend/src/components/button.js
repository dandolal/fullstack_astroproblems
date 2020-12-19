import React from 'react'
import classnames from 'classnames'
import styles from './form.css'

export default function Button({name, type, placeholder, error, onClick, value, message, className}) {


    return (<button name={name}  className={className} type={type}  onClick={onClick}
                   value={value}>{message}</button>)
}