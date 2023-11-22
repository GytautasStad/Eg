import { useState } from "react"
import { app, database } from "../firebaseConfig"
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = getAuth();

    function handleSignIn(){
        console.log("hi", email, password)
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password).then(response => console.log(response))
        })
        .catch(er => console.log(er))

    }
    return(
        <>
        <a href="/skelbimai">Skelbimai</a>
            <input type="text" placeholder="gytautas@gmail.com" onChange={event => setEmail(event.target.value)}/>
            <input type="text" placeholder="pasword123" onChange={event => setPassword(event.target.value)}/>
            <button onClick={handleSignIn}>Login</button>
        </>
    )
}

export default Login;