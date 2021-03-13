const Messages = ({ user, message }) => {
    return (
        <li>{user} : {message}
            <button>削除</button></li>
    )
}

export default Messages