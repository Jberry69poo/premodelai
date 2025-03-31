
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  )
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      if (!isInitialized) {
        setIsInitialized(true)
      }
    }
    
    // Check on mount
    checkIfMobile()
    
    // Add event listener with debounce
    let resizeTimer: number | null = null
    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer)
      }
      resizeTimer = window.setTimeout(checkIfMobile, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimer) {
        window.clearTimeout(resizeTimer)
      }
    }
  }, [isInitialized])

  return isMobile
}
