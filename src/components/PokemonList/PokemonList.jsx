import { useEffect,useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'
function PokemonList(){
    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
   async function downloadPokemons(){
    const response = await axios.get(POKEDEX_URL);
    const pokemonResults =response.data.results;
    const pokemonPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
    const pokemonData = await axios.all(pokemonPromise);
    console.log(pokemonData);
    const res = pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data;
        return {
            name:pokemon.name,
            id:pokemon.id,
            image:pokemon.sprites['front_default']
        }
    });
    console.log(res);
    setPokemonList(res);
setIsLoading(false);
   }
    
    useEffect(()=>{
        downloadPokemons();
    },[]);

    return (
        <>
        <div className="pokemon-list-wrapper">
            Pokemon List:{(isLoading)?'Loading...':pokemonList.map((p)=><Pokemon name = {p.name} id = {p.id} image = {p.image} />)}
        </div>
        </>
    )
}
export default PokemonList;