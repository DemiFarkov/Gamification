import { useSelector } from "react-redux";

export const getIsLoggedUseAuth = () => {
    const token = useSelector((state) => state.auth.token)
    if (token) { console.log("ture") } else { console.log("false") }

    if (token) { return true } else { return false }

}

export const getTokenUseAuth = () => {
    const token = useSelector((state) => state.auth.token)
    return token
}
export const getEmployee_idUseAuth = () => {
    const employee_id = useSelector((state) => state.auth.employee_id
    )
    return employee_id
}