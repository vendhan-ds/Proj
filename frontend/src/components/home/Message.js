import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'

const Message = (props) => {
    const{from,user,message}=props.data
    const location = useLocation();
    const navigate=useNavigate()

    const reply=async()=>{
        console.log(from,user)
        navigate('./NewMessage',{state:{fromuser:from,touser:user}})
    }
  return (
    <div >
        <div className="messageCard" >
            <b>From :</b>{from}
            <br/>
            <p>{message}</p>
            
            <button onClick={reply}> Send Reply </button>
            <hr/>
        </div>
    </div>
  )
}

export default Message