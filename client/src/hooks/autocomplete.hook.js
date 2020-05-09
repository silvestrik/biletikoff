//НЕ НУЖЕН

// import { useState, useCallback } from 'react'
// import axios from 'axios'

// export const useAutocomplete = url => {     

//     const request = useCallback( async url => {
//         setLoading(true)
//         try {  
//             const response = await axios(url)
//             const data = response.data
//             setLoading(false)
//             return data
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//             setError(error)
//         }
//     }, []) 
    
//     const [ loading, setLoading ] = useState(false)
//     const [ error, setError ] = useState(null)
//     const  clearError = useCallback( () => setError(null), []) 
//     return {request, loading, error, clearError }

// }    






// useEffect(() => {
//     const fetchData = async () => {
//         setError(false)
//         setLoading(true)
//         try {
//             const result = axios(url)
//             setData(result)
//         } catch (error) {
//             setError(error)
//         }
//         setLoading(false)    
//     }
//     fetchData()
// }, [url])

// return { data, loading, error }