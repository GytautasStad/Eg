import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { app, database } from "../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import "../index.css"
import { Link } from "react-router-dom"

function Skelbimai(){
    const [username, setUsername] = useState("")
    const auth = getAuth()
    const [skelbimai, setSkelbimai] = useState({})

    onAuthStateChanged(auth, (user) => {
        if (user){
            setUsername(user.uid)
        }
        else{
            console.log("hai")

        }
    })


    useEffect(() => {
    const db = collection(database, "skelbimai")
        
    async function gautiSkelbimus(){
        const data = await getDocs(db);
        console.log(data.docs.map(item => {return { ...item._document.data.value.mapValue }}))
        setSkelbimai(data.docs.map(item => {return { ...item._document.data.value.mapValue }}))
    }
    


        gautiSkelbimus();
    }, [])

    //console.log("skelbimai", skelbimai)
    if (username !== ""){
    return(
        <div>
        <h1>Hi {username}</h1>
        <Link to={"/createAd"}><button>Kurti skelbima</button></Link>
        <div className="skelbimai">
            {Object.keys(skelbimai).map(value => {
                    //console.log(typeof skelbimai[value].fields.nuotraukosUrl.stringValue);
                    Object.keys(skelbimai[value]).map(fields => {
                        //console.log(skelbimai[value][fields]);
                    })
                    
                    return <div className="skelbimas"><p>Poster: {skelbimai[value].fields.savininkas.stringValue}</p>
                    <img src={skelbimai[value].fields.nuotraukosUrl.stringValue} alt="Nauseda the Glorious" />
                    <h1>{skelbimai[value].fields.title.stringValue}</h1>
                    <p>{skelbimai[value].fields.desc.stringValue}</p>
                    <hr />
                    </div>

            })}
        </div>
        </div>
    )
    }
    else{
        return (
            <h1>Tu privalai prisijungti noredamas matyti, bei ikelti skelbimus</h1>
        )
    }
}

export default Skelbimai