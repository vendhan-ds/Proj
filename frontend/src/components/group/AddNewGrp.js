import React from 'react'
import {useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
const AddNewGrp = () => {
  const location = useLocation();
  var admin=location.state.username;
  const [name,setName]=useState()
  const [regdate,setRegdate]=useState("")
  const [budget,setBudget]=useState("")
  const [loc,setLoc]=useState("")
  const [members,setMembers]=useState([])

  const sendResponse=async(e)=>{
        e.preventDefault()
        const body={
            admin:admin,
            name:name,
            regisDate:regdate,
            location:loc,
            budget:budget,
            members:admin
        }
        try{
            await axios.post("http://localhost:4000/group/newmessage",body).then((res)=>{
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
      <h1>Create new group </h1>
      <div className="inputItems">
                        <div className="InputField">
                            <input type = "text" value={admin} placeholder="Admin"/>
                        </div>
                        <div className="InputField">
                            <input type = "text"   onChange={(e)=>setName(e.target.value)} placeholder="Group name"/>
                        </div>
                        <div className="InputField">
                            <input type = "text" onChange={(e)=>setRegdate(e.target.value)} placeholder="Enter Registration date"/>
                        </div>
                        <div className="InputField">
                            <input type = "text" onChange={(e)=>setBudget(e.target.value)} placeholder="Enter Budget date"/>
                        </div>
                        <div className="InputField">
                            <input type = "text" onChange={(e)=>setLoc(e.target.value)} placeholder="Enter Location"/>
                        </div>
                        {/* <div className="InputField">
                            <input type = "text" onChange={(e)=>setMembers(e.target.value)} placeholder="Enter Registration date"/>
                        </div> */}
                    </div>
                    <div className="SubmitOrChangeField">
                        <button className="SubmitButton" onClick={sendResponse}>Add</button>
                           
                    </div>
    </div>
  )
}

export default AddNewGrp