
import './search.css';
import './poke-list.css';
import search from '../../assets/icons/search.svg';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';
import { getAllPokemons ,getPokemon } from '../../services/pokemons';


function Search() {

    const [ searchPoke, setSearchPoke ] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

    useEffect(() => {

        async function fetchData() {
            let response = await getAllPokemons(initialUrl);
            console.log(response);
            setNextUrl(response.next);
            setPreviousUrl(response.previous);
            let pokemon = await loadingPokemon(response.results);
            console.log(pokemon);
            setLoading(false);
        }
        fetchData();

    }, []);


    const next = async () => {
        setLoading(true);
        let data = await getAllPokemons(nextUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!previousUrl) return;
        setLoading(true);
        let data = await getAllPokemons(previousUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        setLoading(false);
    }

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(
            data.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon.url);
                return pokemonRecord;
            })
        );

        setPokemonData(_pokemonData);
    }

    return(
        <div className='host'>
            <div className='main'>
                <form>
                    <input 
                        type="text" 
                        placeholder="Bucar Pokemon..." 
                        onChange={(e) => setSearchPoke(e.target.value)} 
                        />
                    <img src={search} alt="Bucar Pokemon" />
                </form>
            </div>

            <div className='listagem'>
                                
                {!loading ? pokemonData?.filter((pokemon) => {
                    if (searchPoke === "") {
                        return pokemon
                    } else if (pokemon.name.toLowerCase().includes(searchPoke.toLocaleLowerCase())) {
                        return pokemon
                    }
                    
                }).map(( pokemon, i ) => {
                    return (
                        <Card key={i} pokemon={pokemon}/>    
                    );
                }) : <h1 style={{color: "#fff"}}>Carregando...</h1>}

            </div>
        </div>    
    );
}

export default Search;
