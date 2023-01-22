import {useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Group from"./group/GrpCard.js"
import SearchBar from"./group/Searchbar.js"
import axios from 'axios'

const GroupHome = () => {

  const [groups,setGroup]=useState([])
  const [names,setNames]=useState("")
  const navigate=useNavigate()
  const location = useLocation();
  var user=location.state.username

  useEffect(()=>{
    (async()=>{

      /* await axios.get(`http://localhost:4000/user/group/${user}`).then((res)=>{
        console.log("fetched")
        console.log(res.data)
        setGroup(res.data)
      }) */
    console.log("exit 1")
    await axios.get(`http://localhost:4000/group/searchbar/${user}`).then((res)=>{
        console.log("fetched2")
        console.log(res.data)
        setNames(res.data.searchdata)
        setGroup(res.data.userGrps)})

    console.log("exit 2")
    })()
    
  },[])

  const newGrp=async()=>{
      //console.log("hi")
      navigate('./AddNewGroup',{state:{username:user}})
    }

  return (
    <div>
      <h1>GROUPDASH</h1>
      <h3>welcome {user}</h3>
      <hr/>
      <button onClick={newGrp}>+Group</button>
      <SearchBar placeholder="Enter a Group Name..." data={names} user={user}/>
      <h2>Groups</h2>
      <ul style={{listStyleType: "none"}}>
        {groups && groups.map((msg,i)=>(
          <li key={i}>
            <Group data={msg}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GroupHome