import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../pages/bootstrap_css/bootstrap.min.css";
import "../pages/Home/StyleSheet.css";
import "../pages/Home/index.js";
import "../pages/HoverMenu.css";
import "../pages/PokemonList.css";

function PokemonList(props) {
  const [likedPokemon, setLikedPokemon] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is not authenticated");
      return;
    }

    fetch("http://localhost:3050/get-liked-pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get liked Pokemon");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Liked Pokemon retrieved:", data);
        setLikedPokemon(data.liked);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLike = (pokemon) => {
    console.log("pokemon.id:", pokemon.id); // add this line
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is not authenticated");
      return;
    }

    const returnState = true; // add this line

    fetch("http://localhost:3050/like-pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ pokemonId: pokemon.id, returnState }), // modify this line
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to like Pokemon");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Pokemon liked!");
        const updatedLikedPokemon = data.liked || [];
        setLikedPokemon(updatedLikedPokemon);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {props.pokemon.map((p) => (
        <div
          key={p.id}
          style={{ margin: "10px", textAlign: "center", position: "relative" }}
        >
          <Link to={`/id/${p.id}`}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                p.url.split("/").slice(-2, -1)[0]
              }.png`}
              alt={p.name}
            />
            <h5>{p.name}</h5>
          </Link>
          <button className="like-btn" onClick={() => handleLike(p)}>
            {likedPokemon.find((lp) => lp.pokemon_id === p.id)
              ? "Unlike"
              : "Like"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
