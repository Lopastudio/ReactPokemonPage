import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "react-bootstrap";
import '../pages/bootstrap_css/bootstrap.min.css';
import '../pages/Home/StyleSheet.css';

function PokemonDetailsNewPage(props) {
  const { pokemonid } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonid}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error(error));
  }, [pokemonid]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toast style={{top: "80%", right: "50%", textAlign: 'center'}}> 
        <Toast.Header>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <strong className="mr-auto">{pokemon.name}</strong>
        </Toast.Header>
        <Toast.Body>
          <h5>Weight: {pokemon.weight}</h5>
          <h5>Height: {pokemon.height}</h5>
          <h5>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</h5>
          <h5>Base Experience: {pokemon.base_experience}</h5>
          {pokemon.stats.map((s) => (
            <h5 key={s.stat.name}>
              {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}: {s.base_stat}
            </h5>
          ))}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default PokemonDetailsNewPage;
