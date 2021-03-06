import { useState } from 'react'
import firebase from './../config/firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(( {user} ) => {
                user.updateProfile({
                    displayName: name
                })
            })
            .catch((error) => {
            });
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email' 
                        type='email' 
                        id='email' 
                        placeholder='Email'
                        onChange={e => { setEmail(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        name='password' 
                        type='password' 
                        id='password' 
                        placeholder='Password'
                        onChange={e => { setPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor='name'>name</label>
                    <input 
                        name='name' 
                        type='text' 
                        id='name' 
                        placeholder='name'
                        onChange={e => { setName(e.target.value) }}
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </>
    )
}

export default SignUp
