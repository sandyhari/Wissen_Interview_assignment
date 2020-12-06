import React from 'react'
import './styles.css'


const index = ({props})=> {
    return (
         <button className={props.style}>{props.content}</button>
    )
}

export default index


