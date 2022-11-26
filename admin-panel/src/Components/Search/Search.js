import React, {useState} from 'react';
import '../../Constants/Flex.css'
import './Search.css'
import {FcSearch} from "react-icons/fc"
const Search=({searchInput,setSearchInput, handleKeypress})=> {
    console.log(searchInput)
    const handleSearch=(e)=>{
        setSearchInput(e.target.value)
    }
    return (
        <div className='search-subcontainer' onKeyPress={handleKeypress} >
        <FcSearch className='search-icon' />
        <input
        className='search'
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search by name ..."
        />
        </div>
    )
}
export default Search