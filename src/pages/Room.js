import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthService";
import Messages from "../components/Messages";
import firebase from "./../config/firebase";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  // ここでuserの情報を扱えるようにcontextを使って書く
  const user = useContext(AuthContext);
  console.log(user);

  // firebase.firestore().collection("message").doc("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    firebase.firestore().collection("message").add({
      message: value,
      user: user.displayName,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("message")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          // return doc.data();
          return {
            message: doc.data().message,
            user: doc.data().user,
            id: doc.id,
          };
        });
        setMessages(messages);
      });
  }, []);
  return (
    <>
      <h2>Miyamoto</h2>
      <ul>
        {messages.map((message) => {
          return (
            // <li>{message.user} : {message.message}</li>
            <Messages
              key={message.id}
              user={message.user}
              message={message.message}
              id={message.id}
            />
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="submit">送信</button>
      </form>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        ログアウト
      </button>
    </>
  );
};

export default Room;
