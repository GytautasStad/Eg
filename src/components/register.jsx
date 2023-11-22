import { useState } from "react"
import { app, database } from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"

function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState({
        elpastas: "",
        slaptazodis: "",
        vartotojovardas: ""
    })
    const auth = getAuth(app);
    const db = collection(database, "vartotojai")

    async function handleSignUp(){
        let err = false;
        console.log("hi", username, email, password)
        setData({elpastas: email, slaptazodis: password, vartotojovardas: username});
        await createUserWithEmailAndPassword(auth, email, password).then(response => console.log(response, data)).catch(eror => {err = true
        console.log(eror)})
        console.group("err", err)
        if (err === true){
            return;
        }
        addDoc(db, data).then(res => console.log(res)).catch(er => console.log("retard", er))

    }
    return(
        <>
            <input type="text" placeholder="gytautas123" onChange={event => setUsername(event.target.value)} />
            <input type="text" placeholder="gytautas@gmail.com" onChange={event => setEmail(event.target.value)}/>
            <input type="text" placeholder="pasword123" onChange={event => setPassword(event.target.value)}/>
            <button onClick={handleSignUp}>Login</button>
        </>
    )
}

export default Register;