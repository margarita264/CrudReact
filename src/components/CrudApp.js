import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
//el crud temática de los caballeros del sodiaco
//los datos se manda llamar de una variable inicial
const initialDb=[
    {
        id:1,
        name:"Seiya",
        constellation:"Pegaso",
    },
    {
        id:2,
        name:"Shiryu",
        constellation:"Gragón",
    },
    {
        id:3,
        name:"Hyoga",
        constellation:"Cisne",
    },
    {
        id:4,
        name:"Shun",
        constellation:"Cisne",
    },
    {
        id:5,
        name:"lkki",
        constellation:"Fenix",
    },
]

const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  
  return (
    <div>
      <h2>CRUD APP</h2>
      <CrudForm/>
      <CrudTable data={db}/>
    </div>
  );
}

export default CrudApp;