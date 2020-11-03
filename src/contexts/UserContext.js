import React, {createContext, useState} from 'react'

const UserContext = createContext();
export default UserContext;

export function UserProvider (props) {

    const [userDataObject , setUserDataObject] = useState({});

    console.log(userDataObject);

    return (
        <UserContext.Provider value = {{userDataObject, setUserDataObject}}>
            {props.children}
        </UserContext.Provider>
    );
}