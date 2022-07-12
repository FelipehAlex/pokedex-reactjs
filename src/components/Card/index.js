
import '../Search/poke-list.css';
import { Link } from 'react-router-dom';


function Card({ pokemon }) {
  return (

    <Link to="/details" className="pokemon">

      <section className="pokemon-status">
        <h2>{pokemon.name}</h2>

        <ul>
          {pokemon.types.map((res, i) => (
            <li key={i}>{res.type.name}</li>
          ))}
        </ul>
      </section>
  
      <section className="pokemon-image">
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      </section>
  
    </Link>
  
  );
}

export default Card;
