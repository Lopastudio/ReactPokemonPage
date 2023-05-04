import React, { useState, useEffect } from 'react';
import '../bootstrap_css/bootstrap.min.css';
import './StyleSheet.css'
import Header from "../../components/header.js";
import SearchBox from "../../components/SearchBox.js";
import PokemonList from "../../components/PokemonList.js";
import PokemonDetails from "../../components/PokemonDetails.js";
import Spinner from "../../components/Spinner.js";

function PokeList() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectecPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenerationIndex, setSelectedGenerationIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  //helper function to get the generation based on pokemon id
  const getGeneration = (id) => {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    return 8;
  };
  //Loading pokemons from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading spinner
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?&limit=1000');
      const data = await response.json();
      const pokemonWithGeneration = data.results.map((p, index) => ({
        id: parseInt(p.url.split('/').slice(-2, -1)),
        ...p,
        generation: getGeneration(index + 1)
      }));
      
      setPokemon(pokemonWithGeneration);
      setLoading(false); // stop loading spinner
    };

    fetchData();
  }, []);

  //handling search query
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //handling Pokemon button clicks
  const handlePokemonClick = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setSelectecPokemon(data);
  };

  //filtering pokemons based on search query and generation
  const filteredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase())
      && (p.generation === getGeneration(selectedGenerationIndex) || selectedGenerationIndex === 0);
  });



  //helper function to group the pokemon by generation
  const groupByGeneration = (pokemon) => {
    const generations = {};
    pokemon.forEach(p => {
      if (!generations[p.generation]) {
        generations[p.generation] = [];
      }
      generations[p.generation].push(p);
    });
    return generations;
  }

  const generations = groupByGeneration(filteredPokemon);

  return (
    <div id="center" className="body">
      {loading ? <Spinner /> : null} {/* show spinner when loading */}
      <Header />
      <SearchBox value={searchQuery} onChange={handleSearch} />
      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setPokemon(null)} />
      )}
      <br />
      {Object.entries(generations).map(([generation, pokemonList]) => (
        <div key={generation}>
          <h2>{generation === "0" ? "All generations" : `Generation ${generation}`}</h2>
          <PokemonList pokemon={pokemonList} onPokemonClick={handlePokemonClick} />
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
   //do not comment those br´s. I dont have any normal ideas how to push those elements up so.. thats the result :)))
}



export default PokeList;
