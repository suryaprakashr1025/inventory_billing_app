import { createContext,useState } from "react";

export const  UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [edit,setEdit] = useState("")
    return <UserContext.Provider value={{edit,setEdit}}>{children}</UserContext.Provider>
}