import { useParams } from "react-router-dom"
 
function Skelbimas(){
    const { id } = useParams()

    return(
        <h1>Retards {id}</h1>
    )
}

export default Skelbimas