import firebase from '../config/firebase'


const Messages = ({ user, message, id }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        firebase.firestore().collection("message").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
    return (
        <li>{user} : {message}
            <button onClick={(handleDelete)}>削除</button></li>
    )
}

export default Messages