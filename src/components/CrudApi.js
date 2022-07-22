import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
//el crud temática de los caballeros del sodiaco
//los datos se manda llamar de una variable inicial
const CrudApi = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);//controla si hace actulización o insersión
  //a las funciones siguientes la va a moficar los componentes hijos
  //y como lo se hará esto? mediante las props

  let api =helpHttp();
  let url="http://localhost:5000/santos";

  useEffect(()=>{
    api.get(url).then((res)=>{
      //console.log(res);
      if(!res.err){
        setDb(res)
      }else{
        setDb(null)
      }
    });
  },[])
  
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
   let isDelete=window.confirm(`¿Estás seguro de eliminar el registro con el id'${id}'?`);
   if(isDelete){
    let newData=db.filter((el)=>el.id!==id);
    setDb(newData);
   }else{
    return;
   }
  };
  return (
    <div>
      <h2>CRUD APPI</h2>
      <article className="grid-1-2">
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
      </article>
      
    </div>
  );
}

export default CrudApi;