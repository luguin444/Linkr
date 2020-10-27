import React, {createContext, useState} from 'react'

const UserContext = createContext();
export default UserContext;


export function UserProvider (props) {


    return (
        <UserContext.Provider value = {{nome: "testecontext"}}>
            {props.children}
        </UserContext.Provider>
    );
}