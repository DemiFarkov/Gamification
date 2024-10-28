import { useMediaQuery } from "react-responsive"

export const isDesktopOrLaptop = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    return isDesktopOrLaptop
}

export const isBigScreen = () => {
    const isBigScreen = useMediaQuery({
        query: '(min-width: 1824px)'
    })
    return isBigScreen
}

export const isTabletOrMobile = () => {
    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })
    return isTabletOrMobile
}

export const isPortrait = () => {
    const isPortrait = useMediaQuery({
        query: '(orientation: portrait)'
    })
    return isPortrait
}

export const isRetina = () => {
    const isRetina = useMediaQuery({
        query: '(min-resolution: 2dppx)'
    })
    return isRetina
}

export const isMobile = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 1000px)'
    })
    return isMobile
}