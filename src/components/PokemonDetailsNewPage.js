import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "react-bootstrap";
import '../pages/bootstrap_css/bootstrap.min.css';
import '../pages/Home/StyleSheet.css';
import Modal from './Modal.js';

function PokemonDetailsNewPage(props) {
  const { pokemonid } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonid}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error(error));
  }, [pokemonid]);

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toast style={{ top: "80%", right: "50%", textAlign: "center" }}>
        <Toast.Header>
          <img
            class="resizeable-img"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <strong className="mr-auto">{pokemon.name}</strong>
          <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        </Toast.Header>
        <Toast.Body>
          <h5>Weight: {pokemon.weight}</h5>
          <h5>Height: {pokemon.height}</h5>
          <h5>
            Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </h5>
          <h5>Base Experience: {pokemon.base_experience}</h5>
          {pokemon.stats.map((s) => (
            <h5 key={s.stat.name}>
              {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}:{" "}
              {s.base_stat}
            </h5>
          ))}
        </Toast.Body>
      </Toast>
      {modalIsOpen && (
        <Modal onClick={handleModalClose}>
          <h1>Modal Title</h1>
          <p>Modal Content</p>
        </Modal>
      )}
    </div>
  );
}

export default PokemonDetailsNewPage;

