import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Messaje from "./Messaje";
//el crud temática de los caballeros del sodiaco
//los datos se manda llamar de una variable inicial
const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);//controla si hace actulización o insersión
  //a las funciones siguientes la va a moficar los componentes hijos
  //y como lo se hará esto? mediante las props
  const[error, setError]=useState(null);
  const[loading,setLoading]=useState(false);

  let api =helpHttp();
  let url="http://localhost:5000/santos";

  useEffect(()=>{
    setLoading(true);
    api.get(url).then((res)=>{
      //console.log(res);
      if(!res.err){
        setDb(res)
        setError(null)
      }else{
        setDb(null)
        setError(res)
      }
    });
    setLoading(false);
  },[])
  
  const createData = (data) => {
    data.id=Date.now();//genera un Id 
    //console.log(data);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  const deletData = (id) => {
   let isDelete=window.confirm(`¿Estás seguro de eliminar el registro con el id'${id}'?`);
   let endpoint=`${url}/${id}`; 

   let options = {
    headers: { "content-type": "application/json" },
  };
   api.del(endpoint,options).then(res =>{
    if (!res.err) {
      let newData=db.filter((el)=>el.id!==id);
      setDb(newData);
    } else {
      setError(res);
    }
   })
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
        {loading&&<Loader/>}
        {error&&<Messaje msg={`Error${error.status}:${error.statusText}`} bgColor="#dc3545"/>}
        {db&&(<CrudTable data={db}
          setDataToEdit={setDataToEdit}
          deletData={deletData}
        />
        )}
      </article>
      
    </div>
  );
}

export default CrudApi;