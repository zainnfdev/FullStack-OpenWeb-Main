/* eslint-disable react/prop-types */
const Notification = ({message,messageStyle}) => {
    if (message === null){
        return null; 
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification; 