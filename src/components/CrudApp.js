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
  const [dataToEdit, setDataToEdit] = useState(null);//controla si hace actulización o insersión
  //a las funciones siguientes la va a moficar los componentes hijos
  //y como lo se hará esto? mediante las props
  const createData = (data) => {
    data.id=Date.now();//genera un Id 
    //console.log(data);
    setDb([...db,data]);//traae lo que viene en la variable db y lo pone 
    //en nuestra base de datos falsa
  };

  const updateData = (data) => {
    let newData =db.map((el) => (el.id === data.id?data:el));
    setDb(newData);
  };

  const deletData = (id) => {
   
  };
  return (
    <div>
      <h2>CRUD APP</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CrudTable data={db}
        setDataToEdit={setDataToEdit}
        deletData={deletData}
      />
    </div>
  );
}

export default CrudApp;