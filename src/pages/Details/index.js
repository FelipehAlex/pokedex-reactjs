import "./details.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState([]);
  const [pokeJapaName, setPokeJapaName] = useState([]);
  const [pokeStatus, setPokeStatus] = useState([])
  const [pokeImg, setPokeImg] = useState()

  useEffect(() => {
    async function loadPokemon() {
      return await new Promise(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setPokemon(data);
            setPokeImg(data.sprites.other.dream_world.front_default)
            setPokeStatus(data.stats)
          });
      });
    }

    async function loadPokeJapaName() {
      return await new Promise(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setPokeJapaName(data.names[0].name);
          });
      });
    }
    loadPokeJapaName();

    loadPokemon();
  }, [id]);
  
  return (
    <div className="body">
      <main>
        <section className="pokemon_names">
          <h1 className="slideInLeft">{pokemon.name}</h1>
          <h2 className="slideInRight">{pokeJapaName}</h2>
        </section>

        <section className="pokemon_status">
          <img
            className="slideInDown"
            src={pokeImg}
            alt={pokeJapaName}
          />
        </section>

        <article className="pokemon__status__statistics fadeIn">
          <section>
            <h3>Estatísticas</h3>

            {pokeStatus.map((value, i) => {
              return (
                <ol>
                  <li key={i}>
                    {value.stat.name}
                    <strong>{value.base_stat}</strong>
                  </li>
                </ol>
              );
            })}
          </section>
          <Link className="btn__secondary" to="/">Voltar</Link>
        </article>
      </main>
    </div>
  );
}

export default Details;
