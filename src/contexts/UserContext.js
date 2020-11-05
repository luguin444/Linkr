import React, {createContext, useState} from 'react'

const UserContext = createContext();
export default UserContext;

export function UserProvider (props) {
  
         let userAlreadyLogged = JSON.parse(localStorage.getItem("@user"));

         const isEmpty = !userAlreadyLogged
         if(isEmpty) {
            userAlreadyLogged = {};
         }

         const [userDataObject , setUserDataObject] = useState(userAlreadyLogged);

    return (
        <UserContext.Provider value = {{userDataObject, setUserDataObject}}>
            {props.children}
        </UserContext.Provider>
    );
}