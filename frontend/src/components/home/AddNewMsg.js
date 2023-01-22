import React from 'react'
import {useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
const AddNewMsg = () => {
    const location = useLocation();
    console.log(location.state)
    const [message,setMessage]=useState('')
    const [username,setUsername]=useState(location.state.fromuser||'')
    const navigate=useNavigate()

    const sendResponse=async(e)=>{
        e.preventDefault()
        const body={
            user:username,
            message:{from:location.state.touser,
            //email:email,
            message:message}
        }
        try{
            await axios.post("http://localhost:4000/user/newmessage",body).then((res)=>{
                if(res.data=='1')console.log("sent successfully")
                else console.log("unsuccessful")
            })
        }
        catch(e){
            console.log("entered catch")
            console.log(e.message)
        }
        alert("submitted")

    }
    return (
        <div>
            <h1>Draft Message </h1>
      <div className="inputItems">
                        <div className="InputField">
                            <input type = "text" value={username}  onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                        </div>
                        <div className="InputField">
                            <input type = "text" onChange={(e)=>setMessage(e.target.value)} placeholder="Enter Message"/>
                        </div>
                    </div>
                    <div className="SubmitOrChangeField">
                        <button className="SubmitButton" onClick={sendResponse}>Send Message</button>
                           
                    </div>
        </div>
    )
}

export default AddNewMsg