import React from 'react'
import classnames from 'classnames'
import styles from './form.css'

export default function Input({name, type, placeholder, error, onChange, onKeyDown, value}) {
    const className = classnames(styles.input, {
        [styles.error]: !!error
    });


    return (<input name={name}  className={className} type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown}
                   value={value}/>)
}