import React from "react";

const CrudTableRow = ({el,setDataToEdit,deletData}) => {
    let{name,constellation,id}=el;
    return(
        <tr>
            <td>{el.name}</td>
            <td>{el.constellation}</td>
                <td>
                    <button onClick={()=> setDataToEdit(el)}>Editar</button>
                    <button onClick={()=> deletData(id)}>Eliminar</button>
                </td>
        </tr>
    );
};
export default CrudTableRow;