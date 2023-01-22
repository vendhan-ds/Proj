import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
const RegisterPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const navigate=useNavigate()
  const sendResponse=async (e)=>{
        e.preventDefault()
        const body={
            username:username,
            email:email,
            password:password
        }
        try{
            console.log("clicked register button")
            console.log(body)
            
            //await axios.get("http://localhost:4000/test")
            await axios.post("http://localhost:4000/register1",body).then((res)=>{
              console.log(res.data)
              var resp=res.data;
              console.log("clicked register button X2")
            if(resp==1){
              navigate('../Login')
              /* return <Navigate to='/Login'  /> */}
            else {
              console.log("retry")
              navigate('../Register')
              /* return <Navigate to='/Register'  /> */
            }
            })
             
            
            /* let token = resp.data.token
            window.localStorage.setItem('token','bearer '+token)
            navigate('../user') */
        }catch(e){
          console.log(e.message)
            alert("Enter Valid user credentials")
        }
        
    } 
  return (
    <div>
      <h1>REGISTER</h1>
      <div className="inputItems">
                        <div className="InputField">
                            <input onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                        </div>
                        <div className="InputField">
                            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                        </div>
                        <div className="InputField">
                            <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="SubmitOrChangeField">
                        <button className="SubmitButton" onClick={sendResponse}>Register</button>
                           
                    </div>

    </div>
  )
}

export default RegisterPage