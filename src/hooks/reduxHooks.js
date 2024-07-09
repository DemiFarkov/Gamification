import { useSelector } from "react-redux";



export const getTokenUseAuth = () => {
    const token = useSelector((state) => state.auth.token)
    return token
}
export const getIsLoggetAuth = () => {
    const isLogged = useSelector((state) => state.auth.isLogged
    )
    return isLogged
}
export const getGroupsAuth = () => {
    const groups = useSelector((state) => state.auth.groups
    )
    return groups
}
export const getEmployee_idUseAuth = () => {
    const employee_id = useSelector((state) => state.auth.employee_id
    )
    return employee_id
}