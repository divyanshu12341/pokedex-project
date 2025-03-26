import { useEffect,useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';
function PokemonList(){
    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [nextUrl,setNextUrl] = useState(' ');
    const [prevUrl,setPrevUrl] = useState(' ');
    const [pokedexURL,setPokedexURL] = useState('https://pokeapi.co/api/v2/pokemon');
   async function downloadPokemons(){
    setIsLoading(true);
    const response = await axios.get(pokedexURL);    
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
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
    },[pokedexURL]);

    return (
        <>
        <div className="pokemon-list-wrapper">

           <h1> Pokemon List:</h1>
           <div className="pokemon-prop">
           <p>Name</p>
           <p>Image</p>
           </div>
            <div className = "pokemon-wrapper">
            {(isLoading)?'Loading...':pokemonList.map((p)=><Pokemon name = {p.name} id = {p.id} image = {p.image} />)}
            </div>
            <div className="controls">
                <button disabled={prevUrl==null} onClick={()=>setPokedexURL(prevUrl)}>Prev</button>
                <button disabled={nextUrl==null} onClick={()=>setPokedexURL(nextUrl)}>Next</button>
            </div>
        </div>
        </>
    )
}
export default PokemonList;
