import { useSelector } from "react-redux";

export const useAuth = () => {

    const isLogget = useSelector((state) => state.auth.isLogged)
    return isLogget
}