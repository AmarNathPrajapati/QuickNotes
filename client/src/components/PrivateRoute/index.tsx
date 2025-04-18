import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { ReactElement } from "react";


const PrivateRoute = ({children} : {children:ReactElement}) =>{
    const {user} = useAppSelector(state => state.auth);
    if(!user){
        <Navigate to = '/' replace/>
    }
    return children;
}
export default PrivateRoute;