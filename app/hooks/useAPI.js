import {useState, useEffect} from 'react'

const useAPI = (apiFunc)=>{

    const [data, setData] = useState([])
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const request = async ()=>{

        setIsLoading(true)
        setHasError(false)

        const response = await apiFunc()


        if(!response.ok)
        {
            setHasError(true)
            setIsLoading(false)
            return
        }else{
            setHasError(false)
            setIsLoading(false)
        }

        setData(response.data)

    }

    return {data, hasError, isLoading, request}
    

}

export default useAPI