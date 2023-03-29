import React, { useState, useEffect } from 'react';
import { Toast, Button } from "react-bootstrap";
import './bootstrap_css/bootstrap.min.css';
import './StyleSheet.css'

function PokeList() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectecPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10000');
      const data = await response.json();
      setPokemon(data.results);
    };

    fetchData();
  }, []);

  const handleClick = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setSelectecPokemon(data);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="body">
        <h6>Made with ❤️ by Patrik</h6> 
      <form style={{display: "flex", justifyContent: "center"}}>
        <input type="text" placeholder="Search Pokemon..." value={searchQuery} onChange={handleSearch} />
      </form>
      <ul>
        {filteredPokemon.map(p => (
          <li key={p.name}>
            <Button variant="btn btn-dark" onClick={() => handleClick(p.url)}>{' '}
              {p.name}
            </Button>
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <Toast onClose={() => setPokemon("pikachu")} style={{position: "fixed", top: "50%", right: "10%", transform: "translateY(-50%)", textAlign: 'right'}}> 
        <Toast.Header>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <strong className="mr-auto">{selectedPokemon.name}</strong>
        </Toast.Header>
        <Toast.Body>
          <h5>Weight: {selectedPokemon.weight}</h5>
          <h5>Height: {selectedPokemon.height}</h5>
          <h5>Abilities: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</h5>
          <h5>Base Experience: {selectedPokemon.base_experience}</h5>
          {selectedPokemon.stats.map((s) => (
    <h5 key={s.stat.name}>
        {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}: {s.base_stat}
    </h5>
))}

        </Toast.Body>
      </Toast>
      
      )}
    </div>
  );
}

export default PokeList;
