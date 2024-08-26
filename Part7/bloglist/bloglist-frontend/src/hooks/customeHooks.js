import { useState } from 'react'

const useValue = (type) => {
  const [value,setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,value,onChange,reset
  }
}

export default useValue