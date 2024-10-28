import { useEffect } from "react";
export const useClickOutside = (ref, callback) => {
    const handleClick = (e) => {
        // console.log(ref.current)
        // console.log(e.target)

        if (!ref.current.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    })
}