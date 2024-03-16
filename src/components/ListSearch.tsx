import React, {ChangeEvent, FC, useEffect, useState} from "react";
import { useNavigate,useLocation, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import {LIST_SEARCH_PARAM_KEY} from "../constant/index"
const {Search}=Input;

const ListSearch:FC=()=>{
    const nav=useNavigate();
    const {pathname}=useLocation();
    const [value,setValue]=useState('');
    const [searchParams]=useSearchParams();
    useEffect(()=>{
        const curVal=searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        setValue(curVal)
    },[searchParams]);
    function handleSearch(value:string){
        nav({
            pathname,
            search:`${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }
    function handleChange(event:ChangeEvent<HTMLInputElement>){
        setValue(event.target.value);
    }
    return <Search placeholder="输入关键词" value={value} onChange={handleChange} allowClear onSearch={handleSearch} style={{width:'200px'}} />
}
export default ListSearch;