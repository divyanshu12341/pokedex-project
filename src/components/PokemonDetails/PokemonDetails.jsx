import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';
function PokemonDetails(){
    const {id} = useParams();
    console.log(id);
    const [pokemon,setPokemon] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    async function downloadPokemon(){        
        setIsLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name:response.data.name,
            id:response.data.id,
            image:response.data.sprites['front_default'],
        })
        setIsLoading(false);
    }
    useEffect(()=>{
        downloadPokemon();
    },[]);

    return(
        
        <div className="pokemon-details-wrapper">
            {isLoading ? (
                <p>Loading...</p>
            ) : pokemon ? (
                <>
                    <div className="pokemon-details-heading">
                        <p>Name</p>
                        <p>Image</p>
                    </div>
                    <div className="pokemon-details-prop">
                        <h1 className="pokemon-details-name">{pokemon.name}</h1>
                        <img src={pokemon.image} alt="Pokemon image" className="pokemon-details-image"/>
                    </div>
                </>
            ) : (
                <p>Pokemon not found</p>
            )}
        </div>
        
    )
}
export default PokemonDetails;
