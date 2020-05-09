import { useCallback } from "react"
import { useAlert } from 'react-alert'

export const useMessage = () => {
    const alert = useAlert()
    //что бы react не входит в рекурсию
    return useCallback(text => {
        if(text) {            
            alert.show(text)
        }
    }, [alert])  
}