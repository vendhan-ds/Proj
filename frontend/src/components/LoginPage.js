import {useState} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
const LoginPage = () => {
  //const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const navigate=useNavigate()
  const sendResponse=async (e)=>{
        e.preventDefault()
        const body={
            username:username,
            //email:email,
            password:password
        }
        //console.log(body)
        try{
             await axios.post("http://localhost:4000/login",body).then((res)=>{
                console.log(res.data)
                if(res.data=='1'){
                    navigate('../Home',{state:{username:username}})
                }
                else {
                    console.log("retry")
                    navigate('/.')
                }
            })
            
            /* let token = resp.data.token
            window.localStorage.setItem('token','bearer '+token)
            navigate('../user') */
        }catch(e){
            alert("Enter Valid user credentials")
        }
        
    } 
  return (
    <div>
        <h1>LOGIN </h1>
      <div className="inputItems">
                        <div className="InputField">
                            <input onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                        </div>
                        {/* <div className="InputField">
                            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                        </div> */}
                        <div className="InputField">
                            <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="SubmitOrChangeField">
                        <button className="SubmitButton" onClick={sendResponse}>Login</button>
                        <p>Don't have an account?<Link to="/Register"><span>Sign up</span></Link></p>    
                    </div>

    </div>
  )
}

export default LoginPage