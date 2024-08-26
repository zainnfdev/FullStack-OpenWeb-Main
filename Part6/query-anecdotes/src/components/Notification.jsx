import { useContext, useReducer } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
 
  const message = useContext(NotificationContext)[0]
  const visibility = useContext(NotificationContext)[2]

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    visibility &&
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
