import { createContext,useState } from "react";

export const  UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [edit,setEdit] = useState("")
    const [username, setUsername] = useState("")
    const [checkProduct,setcheckProduct] = useState("")
    return <UserContext.Provider value={{edit,setEdit,username,setUsername,checkProduct,setcheckProduct}}>{children}</UserContext.Provider>
}

