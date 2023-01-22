import {useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

import axios from 'axios'

const GrpCard = (props) => {

  const grpname=props.data
  const navigate=useNavigate()

    const enter=async()=>{
        console.log(grpname)
        //navigate('./NewMessage',{state:{fromuser:from,touser:user}})
    }

  return (
    <div>
        <div className="messageCard" >
            <p>{grpname}</p>
            
            <button onClick={enter}> Enter group </button>
            <hr/>
        </div>
    </div>
  )
}

export default GrpCard