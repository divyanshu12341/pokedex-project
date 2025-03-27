import Pokedex from "../components/Pokedex/Pokedex";
import{Link, Route,Routes} from "react-router-dom";
Link
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

function CustomRoutes(){
    return(
        <Routes>
        <Route path = "/" element = {<Pokedex />} />
        <Route path = "/pokemon/:id" element = {<    PokemonDetails />} />
        </Routes>
    )
}
export default CustomRoutes;