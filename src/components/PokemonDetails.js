import { Toast } from "react-bootstrap";
import '../pages/bootstrap_css/bootstrap.min.css';
import '../pages/Home/StyleSheet.css';

function PokemonDetails(props) {
    
    return (
      <Toast onClose={props.onClose} style={{position: "fixed", top: "50%", right: "3%", transform: "translateY(-50%)", textAlign: 'right'}}> 
        <Toast.Header>
          <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
          <strong className="mr-auto">{props.pokemon.name}</strong>
        </Toast.Header>
        <Toast.Body>
          <h5>Weight: {props.pokemon.weight}</h5>
          <h5>Height: {props.pokemon.height}</h5>
          <h5>Abilities: {props.pokemon.abilities.map(a => a.ability.name).join(', ')}</h5>
          <h5>Base Experience: {props.pokemon.base_experience}</h5>
          {props.pokemon.stats.map((s) => (
            <h5 key={s.stat.name}>
              {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}: {s.base_stat}
            </h5>
          ))}
        </Toast.Body>
      </Toast>
    );
  }

export default PokemonDetails;