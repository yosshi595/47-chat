import { AuthContext } from "../AuthService";
import { useState, useContext } from "react";
import firebase from "./../config/firebase";

const UserEdit = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");

    const user = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(icon);
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(({ user }) => {
        //         // Create a root reference
        //         var storageRef = firebase.storage().ref();
        //         // Create a reference to 'mountains.jpg'
        //         var mountainsRef = storageRef.child(icon[0].name);
        //         var file = icon[0];
        //         mountainsRef.put(file).then(function (snapshot) {
        //             console.log("Uploaded a blob or file!");
        //             snapshot.ref.getDownloadURL().then((downloadURL) => {
        //                 console.log(downloadURL);
        //                 user.updateProfile({
        //                     displayName: name,
        //                     photoURL: downloadURL,
        //                 });
        //             });
        //         });
        //     })
        //     .catch((error) => { });



        user.updateProfile({
            displayName: name,
            // photoURL: URL
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });

    };

    return (
        <>
            <h2>ユーザー情報編集</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">name</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="icon">icon</label>
                    <input
                        name="icon"
                        type="file"
                        id="icon"
                        placeholder="icon"
                        onChange={(e) => {
                            setIcon(e.target.files);
                        }}
                    />
                </div>
                <button type="submit">変更</button>
            </form>
        </>
    );
};

export default UserEdit;