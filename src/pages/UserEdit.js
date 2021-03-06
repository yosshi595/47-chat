import { AuthContext } from "../AuthService";
import { useState, useContext } from "react";
import firebase from "./../config/firebase";

const UserEdit = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const user = useContext(AuthContext);
    console.log(user)
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");


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



        

        // if (name == "") {
        //     setName(user.displayName);
        //     console.log(user.displayName);
        // }
        const saveName = name === "" ? user.displayName:name
        console.log(saveName)

        if (icon[0]) {
            var storageRef = firebase.storage().ref();
            //         // Create a reference to 'mountains.jpg'    
            var mountainsRef = storageRef.child(icon[0].name);
            var file = icon[0];
            mountainsRef.put(file).then(function (snapshot) {
                console.log("Uploaded a blob or file!");
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                    user.updateProfile({
                        displayName: saveName,
                        photoURL: downloadURL,
                    });
                });
            });
        } else {
            user.updateProfile({
                displayName: saveName,
            }).then(function () {
                // Update successful.
            }).catch(function (error) {
                // An error happened.
            });
        }

    };

    return (
        <>
            <h2>????????????????????????</h2>
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
                <button type="submit">??????</button>
            </form>
        </>
    );
};

export default UserEdit;