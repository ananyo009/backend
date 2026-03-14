import { useContext } from "react";
import { AuthContext } from "../auth.context";

export default function Authuse(){
    const context = useContext(AuthContext)

    return context
}