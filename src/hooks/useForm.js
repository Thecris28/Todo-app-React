import { useState } from "react"


export const useForm = (initiaState= {}) => {

    const [input , setInput] = useState(initiaState)

    const handleInput = ({target}) => {
        const {name, value} = target
        setInput({
            ...input,
            [name]: value
        })
    }

    const reset = () => {
        setInput(initiaState)
    }

  return {
    input,
    handleInput,
    reset
  }
}
