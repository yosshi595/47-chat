import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthService";
import firebase from "./../config/firebase";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // contextのuser情報を取得してくる
  const user = useContext(AuthContext);

  // Googleアカウントでログイン認証を実装したい
  const GoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {
        alert("認証に失敗しました");
      });
  };

  // userに値が入っていたら / へリダイレクト Redirectを使う
  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={GoogleLogin}>Google認証</button>
    </>
  );
};

export default Login;
