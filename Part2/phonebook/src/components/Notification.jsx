const Notification = ({message,messageStyle}) => {
    /*const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }*/
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