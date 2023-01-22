
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

  const groupReq=async(e)=>{
    console.log("entered groupReq")
    console.log(e.target.value)
    await axios.post(`http://localhost:4000/user/groupReq/request`,{requestFrom:user, grpName:e.target.value}).then((res)=>{
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
              <button value={value} onClick={groupReq}>Request to join</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;