import { listAll, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { storage, app, database } from "../firebaseConfig"
import { useState, useEffect } from "react"
import { ref, getDownloadURL } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"

function Sukurti(){
    const [theImage, setTheImage] = useState(null);
    const auth = getAuth();
    const [data, setData] = useState({
        desc: "",
        nuotraukosUrl: "",
        savininkas: "",
        title: "",
        comments: []
    })
    onAuthStateChanged(auth, (user) => {
        if (user){
            setUserId(user.uid)
        }
        else{
            console.log("hai")
        }
    })

    const [desc, setDesc] = useState("")
    const [title, setTitle] = useState("")
    const [userId, setUserId] = useState("")

    const imLREf = ref(storage, "images/")

    const uploadImg = async () => {
        console.log(desc)
        const db = collection(database, "skelbimai")
        if (theImage === null) return;
        const imgRef = ref(storage, `images/${theImage.name + v4()}`)
        const url = uploadBytes(imgRef, theImage).then(() => {
            console.log("image has been uploaded");
        })
        let items = []
        listAll(imLREf).then(r => {
            r.items.forEach((item) => {
                getDownloadURL(item).then(url => {
                    items.push(url)
                    console.log(url)
                });
            })
        })
        setData({desc: desc, title: title, nuotraukosUrl: items[items.length-1], savininkas: userId, comments: []});
        console.log(data)
        await addDoc(db, data);


    }

    return(
        <div>
        <p>Image:</p><input type="file" 
        onChange={event => setTheImage(event.target.files[0])}/>
        <p>Title:</p><input type="text" placeholder="title" onChange={e => setTitle(e.target.value)} />
        <p>Description:</p><textarea name="idk" id="" cols="30" rows="10" placeholder="description" onChange={e => setDesc(e.target.value)}></textarea>
        <button onClick={uploadImg}>Upload</button>
        </div>
    )
}

export default Sukurti;