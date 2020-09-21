import React, { useState } from "react";

function Practice(){
const [arry,setarry]= useState("")
//데이터값이 있으면 입력값을 받아야하기때문에  기본값은 공백으로
const [subData,setSubData]= useState(data)
//


const SherchFilter = () =>{
    const filter = data.filter((a)=>a.name.indexof(arry)>-1)
    setSubData(filter)
};
    

    return(
        <input className = "form-control-plaintext searchIcon"
        placeholder="검색어를입력하세요"
        onChange={(e) => setarry(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            SherchFilter();
          }
        }}

    )
};
export default Practice;
