import React, { Component } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=80&offset=80";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonlist: [],
      filterInput: '',
    }
  }

  fetchPokemons() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({
        pokemonlist: data.results
      })
      );
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  getIdFromUrl(url) {
    return url.split("/")[6];
  }

  handleTextInput(event) {
    this.setState({
      filterInput: event.target.value
    });
    //OnChange
    //input nås genom event.target.value.
  }


  render() {
    const pokemons = this.state.pokemonlist
      .slice()
      .filter(pokemon =>
        this.state.filterInput === '' ? pokemon : pokemon.name.includes(this.state.filterInput))
      //om sökrutan är tom så laddas pokemon, om söktext matas in så körs includes().
      //alt. startsWith().
      .map((pokemon, i) => (
        <ul key={i} className="pokemons">
          <li>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getIdFromUrl(pokemon.url)}.png`} alt="a collection of pokemons" />
          </li>
          <li>{pokemon.name}</li>
        </ul>
      ));


    return (
      <div>
        <h1>Pokedex</h1>
        <input
          type="text"
          placeholder="Search"
          value={this.state.filterInput}
          onChange={this.handleTextInput.bind(this)}
        />
        <div>{pokemons}</div>
      </div>
    );
  }
}

export default App;
