import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthService'
import Messages from '../components/Messages'
import firebase from './../config/firebase'

const Room = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    // ここでuserの情報を扱えるようにcontextを使って書く
    const user = useContext(AuthContext)
    
    const handleSubmit = e => {
        e.preventDefault()
        firebase.firestore().collection('message').add({
            message: value,
            user: user.displayName
        })
    }

    useEffect(() => {
        firebase.firestore().collection('message').onSnapshot(snapshot => {
            const messages = snapshot.docs.map(doc => {
                return doc.data()
            })
            setMessages(messages)
        })
    },[])
    return (
        <>
            <h2>Room</h2>
            <ul>

                {
                    messages.map(message => {
                        return (
                            // <li>{message.user} : {message.message}</li>
                            <Messages user={message.user} message={message.message} />
                        )
                    })
                }
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setValue(e.target.value)}></input>
                <button type="submit">送信</button>
            </form>
            <button onClick={() => {firebase.auth().signOut()}}>ログアウト</button>
        </>
    )
}

export default Room