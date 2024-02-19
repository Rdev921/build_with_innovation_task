import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react";

const Protected = ({children}) => {
const {isAuth} = useContext(AuthContext);
if(!isAuth){
    return <Navigate to={'/'}></Navigate>
}
return children
 
}
export default Protected