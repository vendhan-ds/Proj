/* import React,{useState,useEffect} from 'react'
import axios from 'axios' 

const Searchbar = () => {
    const [searchInput, setSearchInput] = useState("");
    var names=[];
    useEffect(() => {
        //console.log("entered searchbar")
        (async()=>{
        await axios.get(`http://localhost:4000/user/searchbar`).then((res)=>{
        console.log("fetched2")
        console.log(res.data)
        names=res.data
      //setSearchInput(res.data)
        });
      
        })()


    },[])
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        names.filter((country) => {
        return country.username.match(searchInput);
    });
}
    
    
  return (
    <div>
        <input
   type="text"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />
        <table>

    {names.map((name, i) => {
  <tr key={i}>
    <td>{name.username}</td>
  </tr>

})}
</table>
    </div>
  )
}

export default Searchbar */
import React, { useState } from "react";
//import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

function SearchBar({ placeholder, data,user }) {
  console.log(data);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
    /*var names=[];
    useEffect(() => {
        //console.log("entered searchbar")
        (async()=>{
        await axios.get(`http://localhost:4000/user/searchbar`).then((res)=>{
        console.log("fetched2")
        console.log(res.data)
        names=res.data
      //setSearchInput(res.data)
        });
      
        })()


    },[]) */

  const friendReq=async(e)=>{
    console.log("entered friendReq")
    console.log(e.target.value)
    await axios.post(`http://localhost:4000/user/friendReq/follow`,{inviteFrom:user, inviteTo:e.target.value}).then((res)=>{
      console.log(res.data)
      console.log("follow request processed")
    })

  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.includes(searchWord);
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  

  return (
    <div className="search" style={{display: 'flex', float:'right' /* justifyContent:'flex-end' */}}>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div>
              <a className="dataItem" /* onclick='friendReq()' */   href='#' target="_blank">
                <p>{value} </p>  
              </a>
              <button value={value} onClick={friendReq}>follow</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;