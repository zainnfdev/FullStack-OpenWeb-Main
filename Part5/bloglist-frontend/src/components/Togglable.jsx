import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {

  const [ visibility,setVisibility ] = useState(false)

  const hideWhenVisibility = { display : visibility ? 'none' : '' }
  const showWhenVisibility = { display : visibility ? '' : 'none' }

  const toggaleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div style={hideWhenVisibility}>
        <button id='toggalbe-button' onClick={toggaleVisibility}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisibility}>
        {props.children}
        <button onClick={toggaleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLable : PropTypes.string.isRequired
}

export default Togglable