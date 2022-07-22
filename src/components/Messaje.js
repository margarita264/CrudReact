import React from 'react';

const Messaje =({msg,bgColor})=>{
    let styles ={
        padding:"1rem",
        marginBottom:"1rem",
        texAlign:"center",
        color:"#fff",
        fontWeight:"bold",
        backgroundColor: bgColor,
    }; 

    return(
        <div style={styles}>
            <h2>{msg}</h2>
        </div>
    )
}

export default Messaje;