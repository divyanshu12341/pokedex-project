import { Link } from "react-router-dom";
function Pokemon({name,image,id}){
    return(
        <>
        <div>
            <Link to={`/pokemon/${id}`}>
            <h1>{name}</h1>
            </Link>
        </div>
        <div>
        <Link to={`/pokemon/${id}`}>
            <img src={image} alt="" />
        </Link>
        </div>
        </>
    )
}
export default Pokemon;