function Pokemon({name,image}){
    return(
        <>
        <div>
            <h1>{name}</h1>
        </div>
        <div>
            <img src={image} alt="" />
        </div>
        </>
    )
}
export default Pokemon;