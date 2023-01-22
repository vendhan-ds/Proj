import {useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Message from"./home/Message.js"
import SearchBar from"./home/Searchbar.js"
import axios from 'axios'

const HomePage = () => {
  const navigate=useNavigate()
  const [messages,setMessage]=useState([])
  const [names,setNames]=useState([])
  const location = useLocation();
  var user=location.state.username
  useEffect(()=>{
    (async()=>{

      await axios.get(`http://localhost:4000/user/${user}`).then((res)=>{
        console.log("fetched")
      //console.log(res.data)
      var pushdata=[]
      res.data.forEach(element => {
        var el={}
        el.from=element.from;
        el.message=element.message;
        el.user=user;
        pushdata.push(el)
      });
      console.log(pushdata)
      setMessage(pushdata)

    })
    console.log("exit 1")
    await axios.get(`http://localhost:4000/user/searchbar/search`).then((res)=>{
        console.log("fetched2")
        console.log(res.data)
        setNames(res.data)})

    console.log("exit 2")
    })()
    
  },[])
  const grpRedirect=async()=>{
    navigate('./GroupHome',{state:{username:user}})
  }

  const newMsg=async()=>{
    console.log("hi")
        navigate('./NewMessage',{state:{fromuser:'',touser:user}})
    }
  //setUser(location.state.username)
  return (
    <div>
      <h1>DASHBOARD</h1>
      <h3>Welcome {user}</h3>
      <hr/>
      <button onClick={grpRedirect}>Groups</button>
      <button onClick={newMsg}>Send a Message</button>
      <SearchBar placeholder="Enter a UserName..." data={names} user={user}/>
      <h2>Messages</h2>
      <ul style={{listStyleType: "none"}}>
        {messages && messages.map((msg,i)=>(
          <li key={i}>
            <Message data={msg}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage