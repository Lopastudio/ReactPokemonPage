import React, { useState, useEffect } from 'react';
import '../bootstrap_css/bootstrap.min.css';
import './StyleSheet.css'
import Header from "../../components/header.js";
import SearchBox from "../../components/SearchBox.js";
import PokemonList from "../../components/PokemonList.js";
import PokemonDetails from "../../components/PokemonDetails.js";

function PokeList() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectecPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //Loading pokemons from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?&limit=1000');
      const data = await response.json();
      setPokemon(data.results);
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

  //filtering pokemons based on search query
  const filteredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className="body">
      <Header />
      <SearchBox value={searchQuery} onChange={handleSearch} />
{selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setPokemon(null)} />
      )}
      <PokemonList pokemon={filteredPokemon} onPokemonClick={handlePokemonClick} />
      
    </div>
    
  );
}









export default PokeList;
