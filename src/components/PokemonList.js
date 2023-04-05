import { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../pages/bootstrap_css/bootstrap.min.css';
import '../pages/Home/StyleSheet.css';
import '../pages/HoverMenu.css';

function PokemonList(props) {
  const [showToast, setShowToast] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handlePokemonHover = (event, url) => {
    setSelectedPokemon(url);
    setHoverPosition({ x: event.clientX, y: event.clientY });
    setShowToast(true);
  };

  const handlePokemonLeave = () => {
    setShowToast(false);
  };

  return (
    <>
      <ul>
        {props.pokemon.map((p) => (
          <li key={p.name}>
            <div className="button"
              onMouseEnter={(e) => handlePokemonHover(e, p.url)}
              onMouseLeave={handlePokemonLeave}
            >
              <Link to={`/id/${p.url.split('/').slice(-2, -1)[0]}`}>
                <Button variant="btn btn-dark">{p.name}</Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Toast
        show={showToast && selectedPokemon}
        onClose={handlePokemonLeave}
        style={{
          position: 'absolute',
          left: hoverPosition.x + 50,
          top: hoverPosition.y - 50,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Selected Pokemon</strong>
        </Toast.Header>
        <Toast.Body>{selectedPokemon}</Toast.Body>
      </Toast>
    </>
  );
}

export default PokemonList;
