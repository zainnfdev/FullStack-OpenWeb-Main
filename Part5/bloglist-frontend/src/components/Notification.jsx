const Notification = ({ message,messageStyle }) => {
  if( message === null ){
    return null
  }
  return (
    <div id='notification' style={messageStyle}>
      { message }
    </div>
  )
}
export default Notification