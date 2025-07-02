import { useEffect, useRef, useState } from 'react'

function useThrottle<T>(value: T, delay = 500): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastExecuted = useRef(Date.now())

    useEffect(() => {
        const handler = setTimeout(() => {
            const now = Date.now()
            if (now - lastExecuted.current >= delay) {
                setThrottledValue(value)
                lastExecuted.current = now
            }
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return throttledValue
}

export default useThrottle
